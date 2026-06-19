'use client'
import Link from 'next/link'
import type { PlanResult } from './ConfiguratorWizard'

interface Props {
  plan: PlanResult
  isEnterprise: boolean
  hasItaResidency: boolean
  contact: { name: string; email: string; whatsapp: string }
  onBack: () => void
}

export default function ResultCard({ plan, isEnterprise, hasItaResidency, contact, onBack }: Props) {

  if (isEnterprise) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f2ec', display: 'flex', flexDirection: 'column' }}>
        <div style={{ borderBottom: '1px solid #e6dfd2', background: 'rgba(245,242,236,0.9)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ maxWidth: 760, margin: '0 auto', padding: '16px clamp(18px,4vw,32px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#1d2b3a' }}>societa-dubai.it</span>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.04em', color: '#9a8a72', textTransform: 'uppercase' as const }}>by PB TAX</span>
            </div>
            <Link href="/" style={{ fontSize: 14, fontWeight: 500, color: '#8a93a0', textDecoration: 'none' }}>Esci ✕</Link>
          </div>
        </div>

        <div style={{ flex: 1, maxWidth: 760, margin: '0 auto', padding: 'clamp(32px,5vw,56px) clamp(18px,4vw,32px) 80px', width: '100%' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#8a93a0', marginBottom: 8 }}>Il tuo piano personalizzato</div>
          <div style={{ background: '#1d2b3a', color: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 18px 40px -26px rgba(29,43,58,.5)' }}>
            <div style={{ padding: 'clamp(26px,4vw,40px)' }}>
              <span style={{ display: 'inline-block', background: '#a9885e', color: '#fff', fontSize: 13, fontWeight: 700, padding: '6px 14px', borderRadius: 999, letterSpacing: '.04em', marginBottom: 18 }}>Piano ENTERPRISE</span>
              <h2 style={{ fontSize: 'clamp(26px,4vw,36px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 14px', lineHeight: 1.15 }}>Piano su misura per la tua società</h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.6, color: '#c8d0d9', margin: '0 0 30px', maxWidth: 520 }}>Con oltre 500 transazioni mensili, costruiamo insieme un piano personalizzato sulle reali esigenze della tua attività.</p>
              <div style={{ background: '#fff', borderRadius: 16, padding: 'clamp(22px,3vw,30px)' }}>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
                  <div style={{ fontSize: 14, color: '#5b6570', lineHeight: 1.55 }}>
                    Il tuo account manager ti contatterà entro 24 ore per costruire insieme il piano ideale.
                  </div>
                  {contact.name && <div style={{ fontSize: 14, color: '#3a4550' }}><strong>Contatto:</strong> {contact.name} · {contact.email}</div>}
                </div>
                <Link href="https://wa.me/971585025012" target="_blank" style={{ display: 'block', width: '100%', marginTop: 18, background: '#1d2b3a', color: '#fff', fontSize: 16, fontWeight: 700, padding: 16, borderRadius: 12, textDecoration: 'none', textAlign: 'center' as const, boxSizing: 'border-box' as const }}>
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
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#1d2b3a' }}>societa-dubai.it</span>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.04em', color: '#9a8a72', textTransform: 'uppercase' as const }}>by PB TAX</span>
          </div>
          <Link href="/" style={{ fontSize: 14, fontWeight: 500, color: '#8a93a0', textDecoration: 'none' }}>Esci ✕</Link>
        </div>
      </div>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(32px,5vw,56px) clamp(18px,4vw,32px) 80px', width: '100%' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#8a93a0', marginBottom: 8 }}>Il tuo piano personalizzato</div>
        <div style={{ background: '#fff', border: '1px solid #e6dfd2', borderRadius: 20, overflow: 'hidden', boxShadow: '0 18px 40px -26px rgba(29,43,58,.4)' }}>

          {/* Header */}
          <div style={{ padding: 'clamp(26px,4vw,38px)', borderBottom: '1px solid #ece5d8' }}>
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap', background: '#1d2b3a', color: '#fff', fontSize: 13, fontWeight: 700, padding: '6px 14px', borderRadius: 999, letterSpacing: '.04em', marginBottom: 18 }}>
              Piano {plan.key}
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, flexWrap: 'wrap' as const }}>
              <span style={{ fontSize: 'clamp(44px,7vw,60px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>{plan.price}</span>
              <span style={{ fontSize: 20, fontWeight: 600, color: '#5b6570' }}>AED / mese</span>
            </div>
            <div style={{ fontSize: 14, color: '#8a93a0', marginTop: 4 }}>IVA 5% inclusa</div>
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

            {/* Bilancio annuale add-on */}
            <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px dashed #ddd4c4' }}>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '.08em', color: '#8a93a0', marginBottom: 16 }}>Servizi una tantum selezionati</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, background: '#faf8f3', border: '1px solid #ece5d8', borderRadius: 12, padding: '15px 18px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 600, color: '#3a4550' }}>
                  <span style={{ color: '#a9885e', fontWeight: 700 }}>+</span>Bilancio annuale
                </span>
                <span style={{ textAlign: 'right' as const, whiteSpace: 'nowrap' as const }}>
                  <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>2.500 AED</span>
                  <span style={{ display: 'block', fontSize: 12, color: '#8a93a0', fontWeight: 500 }}>una tantum / anno</span>
                </span>
              </div>
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

            {/* CTAs */}
            <button
              onClick={async () => {
                try {
                  const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan: plan.key, contact }) })
                  const data = await res.json()
                  if (data.redirect_url) window.location.href = data.redirect_url
                  else window.open('https://wa.me/971585025012', '_blank')
                } catch {
                  window.open('https://wa.me/971585025012', '_blank')
                }
              }}
              style={{ width: '100%', marginTop: 28, background: '#1d2b3a', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 17, fontWeight: 700, padding: 17, borderRadius: 13, boxShadow: '0 6px 18px rgba(29,43,58,.24)', font: 'inherit' }}
            >
              Attiva il tuo piano →
            </button>
            <Link
              href="https://wa.me/971585025012"
              target="_blank"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, width: '100%', marginTop: 12, background: '#fff', color: '#1d8a4e', border: '1.5px solid #d6ddd6', fontSize: 15, fontWeight: 600, padding: 14, borderRadius: 13, textDecoration: 'none' }}
            >
              <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#25d366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>✆</span>
              Hai domande? Scrivici su WhatsApp
            </Link>

            <p style={{ fontSize: 12.5, color: '#9a8a72', textAlign: 'center' as const, marginTop: 14, lineHeight: 1.5 }}>
              I prezzi sono orientativi. Il preventivo definitivo sarà confermato da PB TAX.
            </p>
          </div>
        </div>

        <button onClick={onBack} style={{ marginTop: 20, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#8a93a0', font: 'inherit' }}>← Torna al configuratore</button>
      </main>
    </div>
  )
}
