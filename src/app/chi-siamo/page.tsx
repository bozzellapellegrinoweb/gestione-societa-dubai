import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi siamo — PB TAX International',
  description: 'PB TAX International Tax Consultants FZCO. Avv. Pellegrino Bozzella, fondatore di InDubai.it. 450+ aziende italiane gestite a Dubai dal 2019.',
}

const stats = [
  { n: '450+', label: 'Aziende gestite' },
  { n: '5+', label: 'Anni a Dubai' },
  { n: '100%', label: 'In italiano' },
  { n: '48h', label: 'Tempo di attivazione' },
]

const strengths = [
  { title: '450+ aziende gestite', desc: 'Società Free Zone, Mainland e Offshore di imprenditori italiani negli Emirati.' },
  { title: 'Due sistemi fiscali, un unico team', desc: 'Gestiamo la compliance UAE e monitoriamo gli impatti fiscali italiani (CFC, quadro RW, IVAFE).' },
  { title: 'Partner ufficiale Free Zone', desc: 'Rapporti diretti con IFZA, DMCC, RAKEZ, Meydan e altre autorità di registrazione.' },
  { title: 'Corporate Tax & VAT UAE', desc: 'Specializzati nella normativa fiscale emiratina dal 2023. Corporate Tax Return, VAT Filing, AML compliance.' },
]

const companyData = [
  ['Ragione sociale', 'PB TAX International Tax Consultants FZCO'],
  ['TRN (VAT)', '105333005400001'],
  ['Sede operativa', 'Platinum Tower Unit 2503, JLT, Dubai, UAE'],
  ['Sito principale', 'InDubai.it'],
]

export default function ChiSiamoPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(40px,5vw,64px) clamp(18px,4vw,40px) 80px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,56px)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#a9885e', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>PB TAX International</div>
          <h1 style={{ fontSize: 'clamp(30px,4vw,46px)', fontWeight: 800, letterSpacing: '-0.025em', margin: '0 0 14px' }}>Il team di PB TAX International</h1>
          <p style={{ fontSize: 17, color: '#5b6570', margin: '0 auto', maxWidth: 600 }}>Dal 2019 al fianco degli imprenditori italiani negli Emirati Arabi Uniti. 450+ società gestite. Un team che parla la tua lingua.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 16, marginBottom: 'clamp(36px,5vw,56px)' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: '#fff', border: '1px solid #e6dfd2', borderRadius: 16, padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#1d2b3a', letterSpacing: '-0.02em' }}>{s.n}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#8a93a0', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Founder + Strengths */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 28, marginBottom: 'clamp(36px,5vw,56px)' }}>

          {/* Founder card */}
          <div style={{ background: '#fff', border: '1px solid #e6dfd2', borderRadius: 20, padding: 'clamp(24px,3vw,36px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#a9885e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20 }}>PB</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#1d2b3a' }}>Avv. Pellegrino Bozzella</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#a9885e' }}>Fondatore & CEO · PB TAX International</div>
              </div>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: '#5b6570', margin: '0 0 16px' }}>
              Avvocato italiano con specializzazione in diritto societario UAE e fiscalità internazionale. Residente a Dubai dal 2019, ha fondato PB TAX International per rispondere a una necessità concreta: gli imprenditori italiani a Dubai hanno bisogno di un professionista che capisca entrambi i sistemi fiscali.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: '#5b6570', margin: 0 }}>
              Opera dalla Platinum Tower al JLT (Jumeirah Lake Towers), il cuore business di Dubai. Fondatore anche di <a href="https://www.indubai.it" target="_blank" rel="noopener noreferrer" style={{ color: '#a9885e', fontWeight: 600, textDecoration: 'none' }}>InDubai.it</a>, la principale risorsa italiana per chi vuole fare impresa negli Emirati.
            </p>
          </div>

          {/* Strengths */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {strengths.map(item => (
              <div key={item.title} style={{ background: '#fff', border: '1px solid #e6dfd2', borderRadius: 14, padding: '20px 22px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, width: 8, height: 8, borderRadius: 2, background: '#a9885e', transform: 'rotate(45deg)', marginTop: 7, display: 'inline-block' }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1d2b3a', marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 14, color: '#5b6570', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lo studio madre */}
        <div style={{ background: '#faf8f3', border: '1px solid #e6dfd2', borderRadius: 20, padding: 'clamp(24px,3vw,36px)', marginBottom: 'clamp(36px,5vw,56px)' }}>
          <h2 style={{ fontSize: 'clamp(22px,2.6vw,28px)', fontWeight: 800, margin: '0 0 14px', color: '#1d2b3a' }}>PB TAX — lo studio madre</h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: '#5b6570', margin: '0 0 16px' }}>
            PB TAX International Tax Consultants FZCO è lo studio professionale fondato da Avv. Pellegrino Bozzella a Dubai. Sotto questo studio nascono tutti i progetti del gruppo: la gestione contabile digitale delle società UAE e <strong style={{ color: '#1d2b3a' }}>InDubai.it</strong> come hub informativo per gli imprenditori italiani negli Emirati.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: '#5b6570', margin: 0 }}>
            Ogni servizio nasce dall&apos;esperienza diretta sul campo: anni di lavoro fianco a fianco con consulenti fiscali e imprenditori italiani che hanno scelto Dubai come base operativa.
          </p>
        </div>

        {/* Dati aziendali */}
        <div style={{ background: '#fff', border: '1px solid #e6dfd2', borderRadius: 20, padding: 'clamp(24px,3vw,36px)', marginBottom: 'clamp(36px,5vw,56px)' }}>
          <h2 style={{ fontSize: 'clamp(22px,2.6vw,28px)', fontWeight: 800, margin: '0 0 20px', color: '#1d2b3a' }}>Dati aziendali</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20 }}>
            {companyData.map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#8a93a0', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>{k}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1d2b3a' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#1d2b3a', borderRadius: 20, padding: 'clamp(30px,4vw,48px)', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: '#fff', margin: '0 0 10px' }}>Pronto a lavorare con noi?</h2>
          <p style={{ fontSize: 16, color: '#9aa6b3', margin: '0 0 24px' }}>Configura il tuo piano in 3 minuti o scrivici direttamente su WhatsApp.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/configuratore" style={{ background: '#a9885e', color: '#fff', fontSize: 16, fontWeight: 700, padding: '14px 28px', borderRadius: 12, textDecoration: 'none' }}>
              Vai al configuratore →
            </Link>
            <Link href="https://wa.me/971585971575" target="_blank" style={{ background: 'transparent', color: '#fff', fontSize: 16, fontWeight: 600, padding: '14px 28px', borderRadius: 12, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.2)' }}>
              Scrivici su WhatsApp
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
