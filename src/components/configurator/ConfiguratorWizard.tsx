'use client'
import { useState } from 'react'
import Link from 'next/link'
import ResultCard from './ResultCard'

type Option = { title: string; desc?: string; price?: string; icon?: string }
type Step = { q: string; sub: string; cols?: number; tip?: boolean; alert?: boolean; options: Option[] }

const STEPS: Step[] = [
  {
    q: 'Che tipo di società hai negli Emirati?', sub: 'Scegli la forma giuridica della tua azienda.', cols: 2,
    options: [
      { icon: 'freezone', title: 'Free Zone', desc: 'IFZA, DMCC, RAKEZ o altra' },
      { icon: 'mainland', title: 'Mainland', desc: 'LLC o Branch' },
      { icon: 'offshore', title: 'Offshore', desc: 'RAK ICC, JAFZA' },
      { icon: 'unsure', title: 'Non sono sicuro', desc: 'Ti aiutiamo a capirlo noi' },
    ],
  },
  {
    q: 'In quale zona è registrata?', sub: "Indica la free zone o l'emirato.", cols: 2,
    options: [
      { title: 'IFZA', desc: 'International Free Zone Authority' },
      { title: 'DMCC', desc: 'Dubai Multi Commodities Centre' },
      { title: 'RAKEZ', desc: 'Ras Al Khaimah Economic Zone' },
      { title: 'Altra / Mainland', desc: 'Specifica più avanti' },
    ],
  },
  {
    q: 'Quante transazioni contabili stimi al mese?', sub: 'Da qui dipende il piano consigliato.', cols: 2, tip: true,
    options: [
      { title: 'Fino a 25', desc: 'Piano BASIC', price: '500 AED/mese' },
      { title: 'Fino a 50', desc: 'Piano ENTRY LEVEL', price: '800 AED/mese' },
      { title: 'Fino a 100', desc: 'Piano PRO', price: '1.200 AED/mese' },
      { title: 'Fino a 150', desc: 'Piano SILVER', price: '1.500 AED/mese' },
      { title: 'Fino a 300', desc: 'Piano GOLD', price: '1.800 AED/mese' },
      { title: 'Fino a 500', desc: 'Piano PLATINUM', price: '2.000 AED/mese' },
      { title: 'Oltre 500', desc: 'Piano DIAMOND', price: 'su misura' },
    ],
  },
  {
    q: 'Hai dipendenti con visto sponsorizzato?', sub: 'Gestiti dalla tua società negli Emirati.', cols: 2,
    options: [
      { title: 'Nessuno', desc: 'Solo socio/amministratore' },
      { title: 'Da 1 a 3', desc: 'Piccolo team' },
      { title: 'Da 4 a 10', desc: 'Team strutturato' },
      { title: 'Oltre 10', desc: 'Organizzazione ampia' },
    ],
  },
  {
    q: 'Il fatturato annuo supera 375.000 AED?', sub: 'È la soglia di registrazione VAT obbligatoria.', cols: 3,
    options: [
      { title: 'Sì', desc: 'Soglia superata' },
      { title: 'No', desc: 'Sotto soglia' },
      { title: 'Non ancora', desc: 'In crescita' },
    ],
  },
  {
    q: 'Vuoi includere la gestione del libro paga?', sub: 'Buste paga e WPS per i tuoi dipendenti.', cols: 2,
    options: [
      { title: 'Sì, gestitelo voi', desc: 'Payroll + WPS inclusi' },
      { title: 'No, non mi serve', desc: 'Non ho dipendenti' },
    ],
  },
  {
    q: 'Qual è la tua situazione con il Fisco italiano?', sub: 'Serve per gestire correttamente la compliance.', cols: 2, alert: true,
    options: [
      { title: 'Residente in Italia', desc: 'Vivo e risiedo in Italia' },
      { title: 'Iscritto AIRE', desc: 'Residenza estera registrata' },
      { title: 'In transizione', desc: 'Sto trasferendo la residenza' },
      { title: 'Non lo so con certezza', desc: 'Verifichiamo insieme' },
    ],
  },
  {
    q: 'Dove risiedi fiscalmente oggi?', sub: 'La residenza fiscale effettiva, non quella anagrafica.', cols: 2,
    options: [
      { title: 'Italia', desc: 'Residenza fiscale italiana' },
      { title: 'Emirati Arabi', desc: 'Residenza fiscale UAE' },
      { title: 'Altro paese', desc: 'Specifica più avanti' },
      { title: 'Non sono sicuro', desc: 'Ti aiutiamo a capirlo' },
    ],
  },
  {
    q: 'Da quanto è operativa la tua società?', sub: 'Per impostare correttamente la contabilità storica.', cols: 2,
    options: [
      { title: 'In apertura', desc: 'Non ancora attiva' },
      { title: 'Meno di 1 anno', desc: 'Primo esercizio' },
      { title: 'Da 1 a 3 anni', desc: 'Avviata' },
      { title: 'Oltre 3 anni', desc: 'Consolidata' },
    ],
  },
]

const TOTAL_STEPS = STEPS.length

const PLAN_KEYS = ['BASIC', 'ENTRY_LEVEL', 'PRO', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND']
const PLAN_LABELS = ['Basic', 'Entry Level', 'Pro', 'Silver', 'Gold', 'Platinum', 'Diamond']
const PLAN_SUBTITLES = ['Tax Management & Compliance', 'Tax & VAT Management', 'Full Accounting & Tax', 'Advanced Accounting & Advisory', 'Premium Accounting & CFO Support', 'Corporate Full Service', 'Custom Solution']
const PLAN_PRICES = ['500', '800', '1.200', '1.500', '1.800', '2.000', '']
const PLAN_FEATURES: Record<string, string[]> = {
  BASIC: ['Contabilità fino a 25 transazioni/mese', 'Corporate Tax Return annuale', 'Comunicazione 100% in italiano', 'Report trimestrale'],
  ENTRY_LEVEL: ['Contabilità fino a 50 transazioni/mese', 'Corporate Tax Return annuale', 'Dichiarazione VAT inclusa', 'Consulenza Italia-UAE'],
  PRO: ['Contabilità fino a 100 transazioni/mese', 'Corporate Tax Return annuale', 'Account manager dedicato', 'Reportistica mensile'],
  SILVER: ['Contabilità fino a 150 transazioni/mese', 'Corporate Tax Return annuale', 'Gestione visti inclusa', 'Account manager dedicato'],
  GOLD: ['Contabilità fino a 300 transazioni/mese', 'Corporate Tax + VAT Return', 'Gestione visti inclusa', 'Budget & forecasting trimestrale'],
  PLATINUM: ['Contabilità fino a 500 transazioni/mese', 'Corporate Tax + VAT Return', 'Gestione visti inclusa', 'Consulenza Italia-UAE prioritaria'],
  DIAMOND: ['Contabilità oltre 500 transazioni', 'Corporate Tax + VAT Return', 'CFO on-demand incluso', 'Supporto dedicato H24'],
}

export type PlanResult = { key: string; label: string; subtitle: string; price: string; features: string[] }

function getPlan(step3ans: number): PlanResult {
  const idx = Math.min(step3ans, PLAN_KEYS.length - 1)
  const key = PLAN_KEYS[idx]
  return { key, label: PLAN_LABELS[idx], subtitle: PLAN_SUBTITLES[idx], price: PLAN_PRICES[idx], features: PLAN_FEATURES[key] }
}

function Icon({ name }: { name: string }) {
  const p = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none' as const, stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (name === 'freezone') return <svg {...p}><rect x="3.5" y="9" width="5" height="11" rx="0.6"/><rect x="9.5" y="4" width="5.5" height="16" rx="0.6"/><rect x="16" y="12" width="4.5" height="8" rx="0.6"/><line x1="3" y1="20.5" x2="21" y2="20.5"/></svg>
  if (name === 'mainland') return <svg {...p}><rect x="5.5" y="4" width="11" height="16" rx="0.8"/><line x1="9" y1="8" x2="13" y2="8"/><line x1="9" y1="11.5" x2="13" y2="11.5"/><rect x="9.5" y="15.5" width="3" height="4.5"/><line x1="3.5" y1="20.5" x2="18.5" y2="20.5"/></svg>
  if (name === 'offshore') return <svg {...p}><circle cx="12" cy="12" r="8.5"/><ellipse cx="12" cy="12" rx="3.6" ry="8.5"/><line x1="3.6" y1="9.5" x2="20.4" y2="9.5"/><line x1="3.6" y1="14.5" x2="20.4" y2="14.5"/></svg>
  if (name === 'unsure') return <svg {...p}><circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.4a2.4 2.4 0 1 1 3.2 2.3c-.9.4-1.3 1-1.3 1.9v.4"/><circle cx="11.5" cy="16.4" r="0.4" fill="currentColor" stroke="none"/></svg>
  return null
}

export default function ConfiguratorWizard() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [tipOpen, setTipOpen] = useState(false)
  const [done, setDone] = useState(false)

  const sdef = STEPS[step - 1]
  const pct = Math.round((step / TOTAL_STEPS) * 100)
  const ans = answers[step]
  const canNext = ans !== undefined

  function pick(i: number) { setAnswers(prev => ({ ...prev, [step]: i })) }

  function goNext() {
    if (step >= TOTAL_STEPS) { setDone(true); return }
    setStep(s => s + 1)
    setTipOpen(false)
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }

  function goBack() {
    if (step <= 1) return
    setStep(s => s - 1)
    setTipOpen(false)
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }

  const plan = getPlan(answers[3] ?? 2)
  const isDiamond = answers[3] === 6
  const hasItaResidency = answers[7] === 0 || answers[7] === 2

  if (done) {
    return <ResultCard plan={plan} isDiamond={isDiamond} hasItaResidency={hasItaResidency} onBack={() => setDone(false)} />
  }

  const gridCols = sdef.cols === 1 ? '1fr' : sdef.cols === 3 ? 'repeat(auto-fit,minmax(160px,1fr))' : 'repeat(auto-fit,minmax(260px,1fr))'

  return (
    <div style={{ minHeight: '100vh', background: '#f5f2ec', display: 'flex', flexDirection: 'column' }}>

      {/* Top bar */}
      <div style={{ borderBottom: '1px solid #e6dfd2', background: 'rgba(245,242,236,0.9)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '16px clamp(18px,4vw,32px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' as const }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#1d2b3a' }}>societa-dubai.it</span>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.04em', color: '#9a8a72', textTransform: 'uppercase' as const }}>by PB TAX</span>
          </div>
          <Link href="/" style={{ fontSize: 14, fontWeight: 500, color: '#8a93a0', textDecoration: 'none' }}>Esci ✕</Link>
        </div>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 clamp(18px,4vw,32px) 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, fontWeight: 600, color: '#8a93a0', marginBottom: 8 }}>
            <span>Passo {step} di {TOTAL_STEPS}</span><span>{pct}% completato</span>
          </div>
          <div style={{ height: 6, background: '#e6dfd2', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#1d2b3a', borderRadius: 999, transition: 'width .35s ease', width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 'clamp(28px,5vw,56px) clamp(18px,4vw,32px)' }}>
        <div style={{ width: '100%', maxWidth: 760 }}>

          <h2 style={{ fontSize: 'clamp(24px,3.2vw,34px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 10px' }}>{sdef.q}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(24px,3vw,34px)', flexWrap: 'wrap' as const }}>
            <p style={{ fontSize: 16, color: '#5b6570', margin: 0 }}>{sdef.sub}</p>
            {sdef.tip && (
              <button onClick={() => setTipOpen(!tipOpen)} style={{ width: 22, height: 22, borderRadius: '50%', border: '1.5px solid #c2a677', background: '#efe7d8', color: '#7a6234', fontSize: 12, fontWeight: 700, cursor: 'pointer', lineHeight: 1 }}>i</button>
            )}
          </div>

          {tipOpen && (
            <div style={{ background: '#fbf9f3', border: '1px solid #e3d6bd', borderRadius: 12, padding: '16px 18px', marginBottom: 22, fontSize: 14.5, lineHeight: 1.55, color: '#5b6570' }}>
              Una <strong>transazione</strong> è ogni movimento contabile registrato: una fattura emessa, una spesa, un incasso o un pagamento. Conta il numero medio mensile — ti aiutiamo noi a stimarlo se non sei sicuro.
            </div>
          )}

          <div style={{ display: 'grid', gap: 14, gridTemplateColumns: gridCols }}>
            {sdef.options.map((o, i) => {
              const sel = ans === i
              return (
                <button key={i} onClick={() => pick(i)} style={{ display: 'flex', gap: 14, alignItems: 'center', textAlign: 'left', padding: '18px', border: sel ? '1.5px solid #1d2b3a' : '1.5px solid #e6dfd2', borderRadius: 14, background: sel ? '#fbfaf7' : '#fff', cursor: 'pointer', width: '100%', boxShadow: sel ? '0 0 0 3px rgba(29,43,58,.10)' : 'none', transition: 'all .15s ease', font: 'inherit' }}>
                  {o.icon && (
                    <span style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 11, background: '#f3eee4', border: '1px solid #e8e0d1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d2b3a' }}>
                      <Icon name={o.icon} />
                    </span>
                  )}
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 16, fontWeight: 700, color: '#1d2b3a' }}>{o.title}</span>
                    {o.desc && <span style={{ display: 'block', fontSize: 13.5, color: '#7b838e', marginTop: 3, lineHeight: 1.4 }}>{o.desc}</span>}
                  </span>
                  {o.price && (
                    <span style={{ flexShrink: 0, background: '#efe7d8', color: '#7a6234', fontSize: 13, fontWeight: 700, padding: '5px 11px', borderRadius: 999, whiteSpace: 'nowrap' as const }}>{o.price}</span>
                  )}
                  {sel && (
                    <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: '#1d2b3a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>✓</span>
                  )}
                </button>
              )
            })}
          </div>

          {sdef.alert && (
            <div style={{ display: 'flex', gap: 14, background: '#fdf2d6', border: '1px solid #ecc95f', borderRadius: 14, padding: '18px 20px', marginTop: 22 }}>
              <span style={{ flexShrink: 0, color: '#b8860b', marginTop: 1 }}>⚠</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#7a5e12', marginBottom: 4 }}>Attenzione</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.55, color: '#876418' }}>La tua residenza fiscale italiana può generare obblighi di dichiarazione sulla società UAE (CFC, quadro RW). Ti aiutiamo a gestirlo correttamente.</div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 'clamp(28px,4vw,40px)' }}>
            {step > 1 && (
              <button onClick={goBack} style={{ background: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, padding: '14px 18px', borderRadius: 11, border: '1.5px solid #d8cfbf', color: '#5b6570', font: 'inherit' }}>
                ← Indietro
              </button>
            )}
            <button onClick={goNext} disabled={!canNext} style={{ marginLeft: 'auto', background: '#1d2b3a', color: '#fff', border: 'none', cursor: canNext ? 'pointer' : 'not-allowed', fontSize: 16, fontWeight: 600, padding: '15px 28px', borderRadius: 11, boxShadow: '0 4px 14px rgba(29,43,58,.2)', font: 'inherit', opacity: canNext ? 1 : 0.45 }}>
              {step >= TOTAL_STEPS ? 'Vedi il tuo piano →' : 'Avanti →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
