'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { PlanResult } from './ConfiguratorWizard'

interface Props {
  plan: PlanResult
  isDiamond: boolean
  hasItaResidency: boolean
  answers?: Record<number, number>
  onBack: () => void
}

export default function ResultCard({ plan, isDiamond, hasItaResidency, answers, onBack }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCheckout() {
    setLoading(true)
    setError('')
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'begin_checkout', {
        currency: 'AED',
        value: plan.price ? parseInt(plan.price.replace('.', '')) : 0,
        items: [{ item_name: `Piano ${plan.label}`, price: plan.price ? parseInt(plan.price.replace('.', '')) : 0 }],
      })
    }
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: plan.key, answers: answers ?? {} }),
      })
      const data = await res.json()
      if (data.payment_url) {
        window.location.href = data.payment_url
      } else if (data.error) {
        setError(data.error)
      } else {
        window.open('https://wa.me/971585971575', '_blank')
      }
    } catch {
      setError('Errore di connessione. Riprova o contattaci su WhatsApp.')
    }
    setLoading(false)
  }

  if (isDiamond) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f2ec', display: 'flex', flexDirection: 'column' }}>
        <div style={{ borderBottom: '1px solid #e6dfd2', background: 'rgba(245,242,236,0.9)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ maxWidth: 760, margin: '0 auto', padding: '16px clamp(18px,4vw,32px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#1d2b3a' }}>PB TAX International</span>
            </div>
            <Link href="/" style={{ fontSize: 14, fontWeight: 500, color: '#8a93a0', textDecoration: 'none' }}>Esci ✕</Link>
          </div>
        </div>

        <div style={{ flex: 1, maxWidth: 760, margin: '0 auto', padding: 'clamp(32px,5vw,56px) clamp(18px,4vw,32px) 80px', width: '100%' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#8a93a0', marginBottom: 8 }}>Il tuo piano personalizzato</div>
          <div style={{ background: '#1d2b3a', color: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 18px 40px -26px rgba(29,43,58,.5)' }}>
            <div style={{ padding: 'clamp(26px,4vw,40px)' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18 }}>
                <span style={{ display: 'inline-block', background: '#a9885e', color: '#fff', fontSize: 13, fontWeight: 700, padding: '6px 14px', borderRadius: 999, letterSpacing: '.04em' }}>Piano Diamond</span>
                <span style={{ fontSize: 12, color: '#9aa6b3' }}>Custom Solution</span>
              </div>
              <h2 style={{ fontSize: 'clamp(26px,4vw,36px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 14px', lineHeight: 1.15 }}>Piano su misura per la tua società</h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.6, color: '#c8d0d9', margin: '0 0 30px', maxWidth: 520 }}>Con oltre 500 transazioni mensili, costruiamo insieme un piano personalizzato sulle reali esigenze della tua attività.</p>
              <div style={{ background: '#fff', borderRadius: 16, padding: 'clamp(22px,3vw,30px)' }}>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#e8f3ec', color: '#2f8a5b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 15, color: '#3a4550', lineHeight: 1.45 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 14, color: '#5b6570', lineHeight: 1.55, marginTop: 20, paddingTop: 18, borderTop: '1px dashed #e6dfd2' }}>
                  Un membro del team ti scriverà entro 48h per fissare una <strong>video call di onboarding</strong> e definire insieme il piano su misura.
                </div>
                <Link href="https://wa.me/971585971575" target="_blank" style={{ display: 'block', width: '100%', marginTop: 18, background: '#1d2b3a', color: '#fff', fontSize: 16, fontWeight: 700, padding: 16, borderRadius: 12, textDecoration: 'none', textAlign: 'center' as const, boxSizing: 'border-box' as const }}>
                  Scrivici su WhatsApp →
                </Link>
              </div>
            </div>
          </div>
          <button onClick={onBack} style={{ marginTop: 20, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#8a93a0', font: 'inherit' }}>← Torna al configuratore</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f2ec', display: 'flex', flexDirection: 'column' }}>
      <div style={{ borderBottom: '1px solid #e6dfd2', background: 'rgba(245,242,236,0.9)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '16px clamp(18px,4vw,32px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#1d2b3a' }}>PB TAX International</span>
          <Link href="/" style={{ fontSize: 14, fontWeight: 500, color: '#8a93a0', textDecoration: 'none' }}>Esci ✕</Link>
        </div>
      </div>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(32px,5vw,56px) clamp(18px,4vw,32px) 80px', width: '100%' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#8a93a0', marginBottom: 8 }}>Il tuo piano personalizzato</div>
        <div style={{ background: '#fff', border: '1px solid #e6dfd2', borderRadius: 20, overflow: 'hidden', boxShadow: '0 18px 40px -26px rgba(29,43,58,.4)' }}>

          {/* Header */}
          <div style={{ padding: 'clamp(26px,4vw,38px)', borderBottom: '1px solid #ece5d8' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18 }}>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap', background: '#1d2b3a', color: '#fff', fontSize: 13, fontWeight: 700, padding: '6px 14px', borderRadius: 999, letterSpacing: '.04em' }}>
                Piano {plan.label}
              </span>
              <span style={{ fontSize: 13, color: '#8a93a0', fontWeight: 500 }}>{plan.subtitle}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, flexWrap: 'wrap' as const }}>
              <span style={{ fontSize: 'clamp(44px,7vw,60px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>{plan.price}</span>
              <span style={{ fontSize: 20, fontWeight: 600, color: '#5b6570' }}>AED / mese</span>
            </div>
            <div style={{ fontSize: 14, color: '#8a93a0', marginTop: 4 }}>IVA 5% inclusa · Abbonamento mensile · Cancelli quando vuoi</div>
          </div>

          {/* Included */}
          <div style={{ padding: 'clamp(26px,4vw,38px)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '.08em', color: '#8a93a0', marginBottom: 18 }}>Cosa è incluso</div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
              {plan.features.map(f => (
                <div key={f} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#e8f3ec', color: '#2f8a5b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 15.5, color: '#3a4550', lineHeight: 1.45, paddingTop: 1 }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Italy residency alert */}
            {hasItaResidency && (
              <div style={{ display: 'flex', gap: 14, background: '#fdf2d6', border: '1px solid #ecc95f', borderRadius: 14, padding: '18px 20px', marginTop: 24 }}>
                <span style={{ flexShrink: 0, color: '#b8860b', marginTop: 1 }}>⚠</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#7a5e12', marginBottom: 4 }}>Nota sulla tua situazione</div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.55, color: '#876418' }}>Hai indicato residenza fiscale in Italia: includeremo il supporto su CFC e quadro RW. Ne parliamo all&apos;attivazione.</div>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 12, padding: '14px 18px', marginTop: 20, fontSize: 14, color: '#991b1b' }}>
                {error}
              </div>
            )}

            {/* Messaggio pre-acquisto */}
            <div style={{ fontSize: 14.5, color: '#1d6b3a', textAlign: 'center' as const, marginTop: 26, lineHeight: 1.55, background: '#e8f3ec', border: '1px solid #b8dcc8', borderRadius: 12, padding: '16px 20px' }}>
              Acquista il pacchetto e <strong>entro 48h organizzeremo una call di onboarding</strong>. Nessun vincolo.
            </div>

            {/* CTA: Acquista */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              style={{ width: '100%', marginTop: 16, background: '#1d2b3a', color: '#fff', border: 'none', cursor: loading ? 'wait' : 'pointer', fontSize: 17, fontWeight: 700, padding: 17, borderRadius: 13, boxShadow: '0 6px 18px rgba(29,43,58,.24)', font: 'inherit', opacity: loading ? 0.7 : 1, transition: 'opacity .2s' }}
            >
              {loading ? 'Generazione link di pagamento...' : `Abbonati al Piano ${plan.label} →`}
            </button>

            <div style={{ fontSize: 12.5, color: '#8a93a0', textAlign: 'center' as const, marginTop: 12, lineHeight: 1.5 }}>
              Abbonamento sicuro tramite MAMO Pay · Addebito mensile automatico · Cancelli quando vuoi
            </div>

            <Link
              href="https://wa.me/971585971575"
              target="_blank"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, width: '100%', marginTop: 14, background: '#fff', color: '#1d8a4e', border: '1.5px solid #d6ddd6', fontSize: 15, fontWeight: 600, padding: 14, borderRadius: 13, textDecoration: 'none' }}
            >
              <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#25d366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>✆</span>
              Hai domande? Scrivici su WhatsApp
            </Link>

          </div>
        </div>

        <button onClick={onBack} style={{ marginTop: 20, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#8a93a0', font: 'inherit' }}>← Torna al configuratore</button>
      </main>
    </div>
  )
}
