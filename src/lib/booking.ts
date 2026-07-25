// Configurazione prenotazioni call e logica di generazione degli slot.
//
// Fuso orario: il business opera a Dubai (Asia/Dubai, UTC+04:00 fisso, nessuna
// ora legale). Per evitare dipendenze da librerie di timezone, gli slot vengono
// costruiti come stringhe ISO con offset esplicito (+04:00), che JS interpreta
// correttamente in UTC. Se un giorno serve un fuso con ora legale, sostituire
// l'offset fisso con una libreria (es. luxon).

export const BOOKING_TIMEZONE = process.env.BOOKING_TIMEZONE || 'Asia/Dubai'
export const BOOKING_UTC_OFFSET = process.env.BOOKING_UTC_OFFSET || '+04:00'

// Prezzo call a pagamento (senza IVA). MAMO Pay aggiunge il 5% di IVA in fase di charge.
const PAID_PRICE_AED = Number(process.env.BOOKING_PAID_PRICE_AED || 300)

export type CallTypeKey = 'free' | 'paid'

export interface CallType {
  key: CallTypeKey
  label: string
  description: string
  durationMin: number
  priceAED: number // 0 = gratuita
}

export const CALL_TYPES: CallType[] = [
  {
    key: 'free',
    label: 'Consulenza conoscitiva',
    description: 'Prima call gratuita per capire la tua situazione e come possiamo aiutarti.',
    durationMin: Number(process.env.BOOKING_FREE_DURATION_MIN || 20),
    priceAED: 0,
  },
  {
    key: 'paid',
    label: 'Consulenza approfondita',
    description: 'Sessione dedicata con un consulente su fiscalità, struttura societaria e compliance UAE.',
    durationMin: Number(process.env.BOOKING_PAID_DURATION_MIN || 45),
    priceAED: PAID_PRICE_AED,
  },
]

export function getCallType(key: string): CallType | undefined {
  return CALL_TYPES.find(c => c.key === key)
}

// Orario di lavoro (in ora di Dubai). 0=Domenica ... 6=Sabato.
export const WORK_DAYS: number[] = (process.env.BOOKING_WORK_DAYS || '1,2,3,4,5')
  .split(',')
  .map(d => Number(d.trim()))
  .filter(d => !Number.isNaN(d))

export const WORK_START_HOUR = Number(process.env.BOOKING_WORK_START || 10) // 10:00
export const WORK_END_HOUR = Number(process.env.BOOKING_WORK_END || 18) // 18:00
// Preavviso minimo (ore) prima che uno slot sia prenotabile.
export const MIN_LEAD_HOURS = Number(process.env.BOOKING_MIN_LEAD_HOURS || 12)
// Granularità di inizio slot in minuti (allineamento).
export const SLOT_STEP_MIN = Number(process.env.BOOKING_SLOT_STEP_MIN || 30)

export interface Slot {
  startISO: string // ISO con offset (es. 2026-07-26T10:00:00+04:00)
  endISO: string
  label: string // es. "10:00"
}

interface Interval {
  start: number // epoch ms
  end: number
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

/** Giorno della settimana (0-6) di una data YYYY-MM-DD in ora di Dubai. */
export function weekdayOf(dateStr: string): number {
  // Mezzogiorno in ora di Dubai per evitare ambiguità ai bordi
  return new Date(`${dateStr}T12:00:00${BOOKING_UTC_OFFSET}`).getDay()
}

/**
 * Genera gli slot disponibili per una data, escludendo:
 *  - orari fuori dai giorni/orari lavorativi
 *  - slot che si sovrappongono a fasce occupate (Google Calendar) o prenotazioni esistenti
 *  - slot nel passato o entro il preavviso minimo
 */
export function generateSlots(params: {
  dateStr: string // YYYY-MM-DD
  durationMin: number
  busy: Interval[] // fasce occupate in epoch ms (Google + DB)
  now: number // epoch ms
}): Slot[] {
  const { dateStr, durationMin, busy, now } = params

  if (!WORK_DAYS.includes(weekdayOf(dateStr))) return []

  const slots: Slot[] = []
  const minStart = now + MIN_LEAD_HOURS * 60 * 60 * 1000

  // Itera dalle WORK_START alle WORK_END con passo SLOT_STEP_MIN.
  for (let h = WORK_START_HOUR; h < WORK_END_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_STEP_MIN) {
      const startISO = `${dateStr}T${pad(h)}:${pad(m)}:00${BOOKING_UTC_OFFSET}`
      const startMs = new Date(startISO).getTime()
      const endMs = startMs + durationMin * 60 * 1000

      // La call deve terminare entro l'orario di chiusura
      const closeISO = `${dateStr}T${pad(WORK_END_HOUR)}:00:00${BOOKING_UTC_OFFSET}`
      if (endMs > new Date(closeISO).getTime()) continue

      // Rispetta preavviso minimo
      if (startMs < minStart) continue

      // Nessuna sovrapposizione con fasce occupate
      const overlaps = busy.some(b => startMs < b.end && endMs > b.start)
      if (overlaps) continue

      const endISO = new Date(endMs).toISOString()
      slots.push({ startISO, endISO, label: `${pad(h)}:${pad(m)}` })
    }
  }

  return slots
}

export function toEpochInterval(startISO: string, endISO: string): Interval {
  return { start: new Date(startISO).getTime(), end: new Date(endISO).getTime() }
}
