// Conferma di una prenotazione: crea l'evento Google Calendar (con Meet),
// aggiorna la riga su Supabase e invia le email a cliente e segreteria.
// Riutilizzato sia dal flusso gratuito (conferma immediata) sia dal webhook
// MAMO Pay (conferma dopo pagamento riuscito).
import type { SupabaseClient } from '@supabase/supabase-js'
import { createCalendarEvent, isGoogleCalendarConfigured } from '@/lib/google-calendar'
import { sendBookingConfirmation, sendBookingNotification } from '@/lib/email'
import { BOOKING_TIMEZONE } from '@/lib/booking'

export interface BookingRow {
  id: string
  call_type: string
  call_label: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  notes: string | null
  start_at: string
  end_at: string
  duration_min: number
  amount_aed: number | null
  status: string
  google_event_id: string | null
  meet_link: string | null
}

/**
 * Conferma la prenotazione. Idempotente: se è già 'confirmed' non fa nulla.
 * Ritorna il meet link (se creato).
 */
export async function confirmBooking(
  supabase: SupabaseClient,
  booking: BookingRow
): Promise<{ meetLink?: string }> {
  if (booking.status === 'confirmed') {
    return { meetLink: booking.meet_link || undefined }
  }

  let meetLink: string | undefined
  let eventId: string | undefined

  // 1) Crea l'evento con Google Meet (se Google è configurato)
  if (isGoogleCalendarConfigured()) {
    try {
      const isPaid = (booking.amount_aed || 0) > 0
      const created = await createCalendarEvent({
        summary: `${booking.call_label} — ${booking.customer_name}`,
        description:
          `Call ${isPaid ? 'a pagamento' : 'gratuita'} con ${booking.customer_name}.\n` +
          `Email: ${booking.customer_email}\n` +
          (booking.customer_phone ? `Telefono: ${booking.customer_phone}\n` : '') +
          (booking.notes ? `\nNote del cliente:\n${booking.notes}\n` : ''),
        startISO: booking.start_at,
        endISO: booking.end_at,
        timeZone: BOOKING_TIMEZONE,
        attendeeEmail: booking.customer_email,
        attendeeName: booking.customer_name,
      })
      meetLink = created.meetLink
      eventId = created.eventId
    } catch (e) {
      console.error('Calendar event creation failed:', e)
      // Non blocchiamo la conferma: la segreteria riceve comunque la notifica
    }
  }

  // 2) Aggiorna la prenotazione
  await supabase
    .from('bookings')
    .update({
      status: 'confirmed',
      google_event_id: eventId || null,
      meet_link: meetLink || null,
    })
    .eq('id', booking.id)

  // 3) Email al cliente e alla segreteria
  const isPaid = (booking.amount_aed || 0) > 0
  try {
    await sendBookingConfirmation({
      to: booking.customer_email,
      customerName: booking.customer_name,
      callLabel: booking.call_label,
      startISO: booking.start_at,
      durationMin: booking.duration_min,
      meetLink,
      isPaid,
      amountAED: booking.amount_aed || 0,
    })
  } catch (e) {
    console.error('Booking confirmation email failed:', e)
  }

  try {
    await sendBookingNotification({
      customerName: booking.customer_name,
      customerEmail: booking.customer_email,
      customerPhone: booking.customer_phone || undefined,
      callLabel: booking.call_label,
      startISO: booking.start_at,
      durationMin: booking.duration_min,
      isPaid,
      amountAED: booking.amount_aed || 0,
      meetLink,
    })
  } catch (e) {
    console.error('Booking notification email failed:', e)
  }

  return { meetLink }
}
