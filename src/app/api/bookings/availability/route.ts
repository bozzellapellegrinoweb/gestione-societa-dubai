import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getCallType, generateSlots, BOOKING_UTC_OFFSET } from '@/lib/booking'
import { getBusyIntervals, isGoogleCalendarConfigured } from '@/lib/google-calendar'

// GET /api/bookings/availability?date=YYYY-MM-DD&type=free|paid
// Ritorna gli slot liberi per la data, escludendo le fasce occupate del
// calendario Google e le prenotazioni già registrate.
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const dateStr = searchParams.get('date')
    const typeKey = searchParams.get('type') || 'free'

    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return NextResponse.json({ error: 'Parametro date non valido (YYYY-MM-DD)' }, { status: 400 })
    }
    const callType = getCallType(typeKey)
    if (!callType) {
      return NextResponse.json({ error: 'Tipo di call non valido' }, { status: 400 })
    }

    // Bordi della giornata in ora di Dubai, convertiti in ISO (UTC) per le query
    const dayStartISO = new Date(`${dateStr}T00:00:00${BOOKING_UTC_OFFSET}`).toISOString()
    const dayEndISO = new Date(`${dateStr}T23:59:59${BOOKING_UTC_OFFSET}`).toISOString()

    const busy: { start: number; end: number }[] = []

    // 1) Fasce occupate da Google Calendar (se configurato)
    if (isGoogleCalendarConfigured()) {
      try {
        const intervals = await getBusyIntervals(dayStartISO, dayEndISO)
        for (const b of intervals) {
          busy.push({ start: new Date(b.start).getTime(), end: new Date(b.end).getTime() })
        }
      } catch (e) {
        console.error('freeBusy error:', e)
        // In caso di errore Google, continuiamo con le sole prenotazioni DB
      }
    }

    // 2) Prenotazioni già registrate (pending o confirmed) nello stesso giorno
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )
      const { data: existing } = await supabase
        .from('bookings')
        .select('start_at,end_at,status')
        .in('status', ['pending', 'confirmed'])
        .gte('start_at', dayStartISO)
        .lte('start_at', dayEndISO)

      for (const b of existing || []) {
        busy.push({ start: new Date(b.start_at).getTime(), end: new Date(b.end_at).getTime() })
      }
    }

    const slots = generateSlots({
      dateStr,
      durationMin: callType.durationMin,
      busy,
      now: Date.now(),
    })

    return NextResponse.json({
      date: dateStr,
      type: callType.key,
      durationMin: callType.durationMin,
      slots: slots.map(s => ({ startISO: s.startISO, endISO: s.endISO, label: s.label })),
    })
  } catch (err) {
    console.error('Availability error:', err)
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 })
  }
}
