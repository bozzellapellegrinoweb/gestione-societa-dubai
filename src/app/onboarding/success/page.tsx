import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Pagamento completato · societa-dubai.it' }

export default function SuccessPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 620, margin: '0 auto', padding: 'clamp(60px,8vw,100px) clamp(18px,4vw,40px) 80px', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#e8f3ec', color: '#2f8a5b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, margin: '0 auto 24px' }}>✓</div>
        <h1 style={{ fontSize: 'clamp(28px,3.6vw,38px)', fontWeight: 800, margin: '0 0 14px', color: '#1d2b3a' }}>Pagamento completato!</h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: '#5b6570', margin: '0 0 12px' }}>
          Grazie per aver scelto PB TAX International. Il tuo piano è stato attivato con successo.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: '#8a93a0', margin: '0 0 36px' }}>
          Riceverai una email di conferma con i dettagli del tuo piano. Il tuo account manager ti contatterà entro 48 ore per avviare l&apos;onboarding.
        </p>

        <div style={{ background: '#faf8f3', border: '1px solid #e6dfd2', borderRadius: 16, padding: '24px', marginBottom: 28, textAlign: 'left' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#a9885e', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 14 }}>Prossimi passi</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { n: '1', text: 'Riceverai una email di conferma con i dettagli del piano' },
              { n: '2', text: 'Il tuo account manager ti contatterà entro 48h' },
              { n: '3', text: 'Ti guideremo nel caricamento dei documenti necessari' },
              { n: '4', text: 'Inizio gestione contabile entro 5 giorni lavorativi' },
            ].map(step => (
              <div key={step.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 8, background: '#1d2b3a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{step.n}</span>
                <span style={{ fontSize: 15, color: '#3a4550', lineHeight: 1.45, paddingTop: 3 }}>{step.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ background: '#1d2b3a', color: '#fff', fontSize: 16, fontWeight: 600, padding: '14px 28px', borderRadius: 12, textDecoration: 'none' }}>
            Torna alla home
          </Link>
          <Link href="https://wa.me/971585025012" target="_blank" style={{ background: '#fff', color: '#1d8a4e', border: '1.5px solid #d6ddd6', fontSize: 16, fontWeight: 600, padding: '14px 28px', borderRadius: 12, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Scrivici su WhatsApp
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
