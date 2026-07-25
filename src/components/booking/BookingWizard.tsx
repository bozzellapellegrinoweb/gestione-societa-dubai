'use client'
import { useState, useCallback, type CSSProperties } from 'react'

interface CallTypeDTO {
  key: string
  label: string
  description: string
  durationMin: number
  priceAED: number
}

interface Slot {
  startISO: string
  endISO: string
  label: string
}

const NAVY = '#1d2b3a'
const GOLD = '#a9885e'
const CREAM = '#f5f2ec'
const BORDER = '#e6dfd2'

function nextDays(count: number): { dateStr: string; weekday: string; day: string; month: string }[] {
  const out: { dateStr: string; weekday: string; day: string; month: string }[] = []
  const base = new Date()
  for (let i = 0; i < count; i++) {
    const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + i)
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    out.push({
      dateStr,
      weekday: new Intl.DateTimeFormat('it-IT', { weekday: 'short' }).format(d),
      day: String(d.getDate()),
      month: new Intl.DateTimeFormat('it-IT', { month: 'short' }).format(d),
    })
  }
  return out
}

export default function BookingWizard({ callTypes }: { callTypes: CallTypeDTO[] }) {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<CallTypeDTO | null>(null)
  const [days] = useState(() => nextDays(21))
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [slots, setSlots] = useState<Slot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState<{ meetLink?: string } | null>(null)

  const loadSlots = useCallback(async (date: string, typeKey: string) => {
    setLoadingSlots(true)
    setSelectedSlot(null)
    setSlots([])
    try {
      const res = await fetch(`/api/bookings/availability?date=${date}&type=${typeKey}`)
      const data = await res.json()
      setSlots(data.slots || [])
    } catch {
      setSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }, [])

  function pickDate(date: string) {
    setSelectedDate(date)
    if (selectedType) loadSlots(date, selectedType.key)
  }

  function pickType(ct: CallTypeDTO) {
    setSelectedType(ct)
    // reset scelte successive per evitare slot obsoleti se si cambia tipo
    setSelectedDate(null)
    setSlots([])
    setSelectedSlot(null)
    setStep(2)
  }

  async function submit() {
    if (!selectedType || !selectedSlot) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedType.key,
          startISO: selectedSlot.startISO,
          endISO: selectedSlot.endISO,
          name: form.name,
          email: form.email,
          phone: form.phone,
          notes: form.notes,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Si è verificato un errore. Riprova.')
        setSubmitting(false)
        return
      }
      if (data.status === 'pending_payment' && data.payment_url) {
        window.location.href = data.payment_url
        return
      }
      setConfirmed({ meetLink: data.meetLink })
    } catch {
      setError('Si è verificato un errore. Riprova.')
      setSubmitting(false)
    }
  }

  const canSubmit = form.name.trim() && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) && selectedSlot

  // --- Schermata di conferma (call gratuita) ---
  if (confirmed) {
    return (
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#e8f3ec', color: '#2f8a5b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, margin: '0 auto 24px' }}>✓</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 12px', color: NAVY }}>Call confermata!</h2>
        <p style={{ fontSize: 16, color: '#5b6570', lineHeight: 1.6, margin: '0 0 24px' }}>
          Ti abbiamo inviato una email con tutti i dettagli e l&apos;invito al calendario.
        </p>
        {confirmed.meetLink && (
          <a href={confirmed.meetLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: '#1d8a4e', color: '#fff', fontSize: 15, fontWeight: 700, padding: '14px 26px', borderRadius: 10, textDecoration: 'none' }}>
            Apri la video call →
          </a>
        )}
      </div>
    )
  }

  return (
    <div>
      {/* Stepper */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
        {[1, 2, 3].map(n => (
          <div key={n} style={{ width: 34, height: 6, borderRadius: 3, background: step >= n ? GOLD : BORDER }} />
        ))}
      </div>

      {/* STEP 1 — tipo di call */}
      {step === 1 && (
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: NAVY, margin: '0 0 6px', textAlign: 'center' }}>Che tipo di call vuoi prenotare?</h2>
          <p style={{ fontSize: 15, color: '#5b6570', textAlign: 'center', margin: '0 0 28px' }}>Scegli l&apos;opzione più adatta a te.</p>
          <div style={{ display: 'grid', gap: 16 }}>
            {callTypes.map(ct => {
              const active = selectedType?.key === ct.key
              return (
                <button
                  key={ct.key}
                  onClick={() => pickType(ct)}
                  style={{ textAlign: 'left', cursor: 'pointer', background: active ? '#faf8f3' : '#fff', border: `1.5px solid ${active ? GOLD : BORDER}`, borderRadius: 14, padding: '20px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}
                >
                  <span>
                    <span style={{ display: 'block', fontSize: 17, fontWeight: 700, color: NAVY, marginBottom: 4 }}>{ct.label}</span>
                    <span style={{ display: 'block', fontSize: 14, color: '#5b6570', lineHeight: 1.5 }}>{ct.description}</span>
                    <span style={{ display: 'inline-block', marginTop: 8, fontSize: 13, color: GOLD, fontWeight: 600 }}>{ct.durationMin} minuti</span>
                  </span>
                  <span style={{ flexShrink: 0, fontSize: 18, fontWeight: 800, color: NAVY, whiteSpace: 'nowrap' }}>
                    {ct.priceAED > 0 ? `${ct.priceAED} AED` : 'Gratis'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* STEP 2 — data e ora */}
      {step === 2 && selectedType && (
        <div>
          <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: GOLD, fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: 0, marginBottom: 16 }}>← Cambia tipo di call</button>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: NAVY, margin: '0 0 6px', textAlign: 'center' }}>Scegli data e ora</h2>
          <p style={{ fontSize: 14, color: '#8a93a0', textAlign: 'center', margin: '0 0 22px' }}>Orari in fuso di Dubai (GST)</p>

          {/* Date */}
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8, marginBottom: 22 }}>
            {days.map(d => {
              const active = selectedDate === d.dateStr
              return (
                <button
                  key={d.dateStr}
                  onClick={() => pickDate(d.dateStr)}
                  style={{ flexShrink: 0, cursor: 'pointer', width: 68, padding: '12px 0', borderRadius: 12, border: `1.5px solid ${active ? GOLD : BORDER}`, background: active ? NAVY : '#fff', color: active ? '#fff' : NAVY, textAlign: 'center' }}
                >
                  <div style={{ fontSize: 12, textTransform: 'capitalize', opacity: 0.8 }}>{d.weekday}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.2 }}>{d.day}</div>
                  <div style={{ fontSize: 12, textTransform: 'capitalize', opacity: 0.8 }}>{d.month}</div>
                </button>
              )
            })}
          </div>

          {/* Slots */}
          {!selectedDate && <p style={{ textAlign: 'center', color: '#8a93a0', fontSize: 14 }}>Seleziona un giorno per vedere gli orari disponibili.</p>}
          {selectedDate && loadingSlots && <p style={{ textAlign: 'center', color: '#8a93a0', fontSize: 14 }}>Carico gli orari…</p>}
          {selectedDate && !loadingSlots && slots.length === 0 && (
            <p style={{ textAlign: 'center', color: '#8a93a0', fontSize: 14 }}>Nessun orario disponibile in questo giorno. Prova un&apos;altra data.</p>
          )}
          {selectedDate && !loadingSlots && slots.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))', gap: 10 }}>
              {slots.map(s => {
                const active = selectedSlot?.startISO === s.startISO
                return (
                  <button
                    key={s.startISO}
                    onClick={() => setSelectedSlot(s)}
                    style={{ cursor: 'pointer', padding: '12px 0', borderRadius: 10, border: `1.5px solid ${active ? GOLD : BORDER}`, background: active ? NAVY : '#fff', color: active ? '#fff' : NAVY, fontSize: 15, fontWeight: 700 }}
                  >
                    {s.label}
                  </button>
                )
              })}
            </div>
          )}

          {selectedSlot && (
            <button onClick={() => setStep(3)} style={{ marginTop: 28, width: '100%', background: NAVY, color: '#fff', fontSize: 16, fontWeight: 700, padding: '15px', borderRadius: 12, border: 'none', cursor: 'pointer' }}>
              Continua →
            </button>
          )}
        </div>
      )}

      {/* STEP 3 — dati e conferma */}
      {step === 3 && selectedType && selectedSlot && (
        <div>
          <button onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: GOLD, fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: 0, marginBottom: 16 }}>← Cambia data e ora</button>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: NAVY, margin: '0 0 20px', textAlign: 'center' }}>I tuoi dati</h2>

          <div style={{ background: CREAM, borderRadius: 12, padding: '16px 18px', marginBottom: 22, fontSize: 14, color: NAVY }}>
            <strong>{selectedType.label}</strong> · {selectedType.durationMin} min · {selectedType.priceAED > 0 ? `${selectedType.priceAED} AED` : 'Gratis'}
            <br />
            <span style={{ color: '#5b6570' }}>
              {new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dubai' }).format(new Date(selectedSlot.startISO))} (Dubai)
            </span>
          </div>

          <div style={{ display: 'grid', gap: 14 }}>
            <input placeholder="Nome e cognome *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
            <input placeholder="Email *" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
            <input placeholder="Telefono / WhatsApp" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
            <textarea placeholder="Note (facoltative): di cosa vuoi parlare?" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          {error && <p style={{ color: '#dc2626', fontSize: 14, margin: '14px 0 0', fontWeight: 600 }}>{error}</p>}

          <button
            disabled={!canSubmit || submitting}
            onClick={submit}
            style={{ marginTop: 22, width: '100%', background: canSubmit && !submitting ? NAVY : '#c7cdd4', color: '#fff', fontSize: 16, fontWeight: 700, padding: '15px', borderRadius: 12, border: 'none', cursor: canSubmit && !submitting ? 'pointer' : 'not-allowed' }}
          >
            {submitting ? 'Attendere…' : selectedType.priceAED > 0 ? `Paga ${selectedType.priceAED} AED e conferma` : 'Conferma prenotazione'}
          </button>
          {selectedType.priceAED > 0 && (
            <p style={{ fontSize: 12, color: '#8a93a0', textAlign: 'center', margin: '12px 0 0' }}>Verrai reindirizzato al pagamento sicuro MAMO Pay.</p>
          )}
        </div>
      )}
    </div>
  )
}

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '13px 16px',
  borderRadius: 10,
  border: `1.5px solid ${BORDER}`,
  fontSize: 15,
  color: NAVY,
  background: '#fff',
  fontFamily: 'inherit',
}
