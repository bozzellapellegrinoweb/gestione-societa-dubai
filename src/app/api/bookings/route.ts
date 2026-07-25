import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getCallType } from '@/lib/booking'
import { getBusyIntervals, isGoogleCalendarConfigured } from '@/lib/google-calendar'
import { createPaymentLink, isMamoConfigured } from '@/lib/mamopay'
import { confirmBooking, type BookingRow } from '@/lib/booking-confirm'

// POST /api/bookings
// Body: { type: 'free'|'paid', startISO, endISO, name, email, phone?, notes? }
// - call gratuita  -> conferma immediata (evento Calendar + email)
// - call a pagamento -> crea link MAMO Pay e ritorna payment_url (conferma via webhook)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, startISO, endISO, name, email, phone, notes } = body as {
      type?: string
      startISO?: string
      endISO?: string
      name?: string
      email?: string
      phone?: string
      notes?: string
    }

    const callType = getCallType(type || '')
    if (!callType) {
      return NextResponse.json({ error: 'Tipo di call non valido' }, { status: 400 })
    }
    if (!startISO || !endISO || !name || !email) {
      return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Email non valida' }, { status: 400 })
    }

    const startMs = new Date(startISO).getTime()
    const endMs = new Date(endISO).getTime()
    if (Number.isNaN(startMs) || Number.isNaN(endMs) || endMs <= startMs) {
      return NextResponse.json({ error: 'Orario non valido' }, { status: 400 })
    }
    if (startMs < Date.now()) {
      return NextResponse.json({ error: 'Lo slot selezionato è nel passato' }, { status: 400 })
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing Supabase env vars')
      return NextResponse.json({ error: 'Servizio non configurato' }, { status: 500 })
    }
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // Ricontrollo disponibilità lato server (anti doppia prenotazione).
    // 1) prenotazioni esistenti che si sovrappongono
    const { data: clashes } = await supabase
      .from('bookings')
      .select('id')
      .in('status', ['pending', 'confirmed'])
      .lt('start_at', new Date(endMs).toISOString())
      .gt('end_at', new Date(startMs).toISOString())

    if (clashes && clashes.length > 0) {
      return NextResponse.json({ error: 'Slot non più disponibile' }, { status: 409 })
    }

    // 2) fasce occupate Google Calendar
    if (isGoogleCalendarConfigured()) {
      try {
        const busy = await getBusyIntervals(new Date(startMs).toISOString(), new Date(endMs).toISOString())
        const overlap = busy.some(
          b => startMs < new Date(b.end).getTime() && endMs > new Date(b.start).getTime()
        )
        if (overlap) {
          return NextResponse.json({ error: 'Slot non più disponibile' }, { status: 409 })
        }
      } catch (e) {
        console.error('freeBusy re-check error:', e)
      }
    }

    const isPaid = callType.priceAED > 0

    // Inserisce la prenotazione (pending)
    const { data: inserted, error: insertErr } = await supabase
      .from('bookings')
      .insert({
        call_type: callType.key,
        call_label: callType.label,
        customer_name: name,
        customer_email: email,
        customer_phone: phone || null,
        notes: notes || null,
        start_at: new Date(startMs).toISOString(),
        end_at: new Date(endMs).toISOString(),
        duration_min: callType.durationMin,
        amount_aed: callType.priceAED,
        status: 'pending',
      })
      .select()
      .single()

    if (insertErr || !inserted) {
      console.error('Booking insert error:', insertErr)
      return NextResponse.json({ error: 'Impossibile creare la prenotazione' }, { status: 500 })
    }

    const booking = inserted as BookingRow

    // --- Call gratuita: conferma subito ---
    if (!isPaid) {
      const { meetLink } = await confirmBooking(supabase, booking)
      return NextResponse.json({ status: 'confirmed', bookingId: booking.id, meetLink })
    }

    // --- Call a pagamento: crea link MAMO Pay ---
    if (!isMamoConfigured()) {
      return NextResponse.json({ error: 'Pagamenti non configurati' }, { status: 500 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://societa-dubai.it'
    try {
      const link = await createPaymentLink({
        title: `${callType.label} — call ${callType.durationMin} min`,
        description: `Prenotazione call del ${new Date(startMs).toISOString()}`,
        amountAED: callType.priceAED,
        returnUrl: `${siteUrl}/prenota/success?booking=${booking.id}`,
        failureReturnUrl: `${siteUrl}/prenota?payment=failed`,
        customData: {
          type: 'booking',
          booking_id: booking.id,
        },
        customerEmail: email,
        customerName: name,
      })

      await supabase.from('bookings').update({ mamopay_link_id: link.id }).eq('id', booking.id)

      return NextResponse.json({ status: 'pending_payment', bookingId: booking.id, payment_url: link.paymentUrl })
    } catch (e) {
      console.error('MAMO link error:', e)
      // Rollback: elimina la prenotazione pending per liberare lo slot
      await supabase.from('bookings').delete().eq('id', booking.id)
      return NextResponse.json({ error: 'Impossibile avviare il pagamento' }, { status: 500 })
    }
  } catch (err) {
    console.error('Booking error:', err)
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 })
  }
}
