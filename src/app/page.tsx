import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'societa-dubai.it — Gestione contabile per società a Dubai in italiano',
  description: 'Contabilità, Corporate Tax UAE, VAT e compliance per società Free Zone e Mainland negli Emirati. 100% in italiano. Powered by PB TAX International.',
}

const trustBadges = ['450+ società gestite', '5 anni a Dubai', 'Consulenti fiscali italiani', 'Pagamento sicuro']

const comeFunziona = [
  { n: '1', title: 'Configura', desc: 'Rispondi a 10 domande sulla tua società. Bastano 3 minuti.' },
  { n: '2', title: 'Scegli il piano', desc: 'Vedi il costo esatto per la tua situazione, senza sorprese.' },
  { n: '3', title: 'Affidati a noi', desc: 'Paga online e siamo operativi in 48 ore.' },
]

type Plan = { name: string; subtitle: string; price: string; features: string[]; cta: string; popular: boolean }
const homePlans: Plan[] = [
  {
    popular: false, name: 'Basic', subtitle: 'Tax Management & Compliance', price: '500',
    features: ['Contabilità fino a 25 transazioni/mese', 'Corporate Tax Return annuale', 'Gruppo WhatsApp operativo', 'Aggiornamenti legali inclusi'],
    cta: 'Scegli Basic',
  },
  {
    popular: true, name: 'Pro', subtitle: 'Full Accounting & Tax', price: '1.200',
    features: ['Contabilità fino a 100 transazioni/mese', 'Corporate Tax Return annuale', 'Account manager dedicato', 'Gruppo WhatsApp operativo', 'Aggiornamenti legali inclusi'],
    cta: 'Scegli Pro',
  },
  {
    popular: false, name: 'Platinum', subtitle: 'Corporate Full Service', price: '2.000',
    features: ['Contabilità fino a 500 transazioni/mese', 'Corporate Tax + VAT Return', 'Gestione visti inclusa', 'Gruppo WhatsApp operativo', 'Aggiornamenti legali inclusi'],
    cta: 'Scegli Platinum',
  },
]

const testimonials = [
  { quote: 'Avere tutta la contabilità della mia società DMCC seguita in italiano ha cambiato tutto. Rispondono sempre.', name: 'Luca Ferraro', role: 'E-commerce · DMCC', initials: 'LF' },
  { quote: 'Mi hanno guidato sulla Corporate Tax senza che dovessi capire nulla di burocrazia emiratina. Professionali e diretti.', name: 'Giulia Bianchi', role: 'Consulenza · IFZA', initials: 'GB' },
  { quote: 'Vivo ancora in Italia e gestiscono loro la mia società a Dubai. Mi hanno spiegato bene anche il quadro RW.', name: 'Marco De Santis', role: 'Trading · RAKEZ', initials: 'MD' },
]

const faqs = [
  { q: 'Cosa si intende per transazione?', a: 'Una transazione è ogni movimento contabile registrato: una fattura emessa, una spesa, un incasso o un pagamento. Il piano si basa sul numero medio mensile di queste operazioni.' },
  { q: 'La Corporate Tax UAE è obbligatoria per la mia società?', a: 'Dal 2023 la Corporate Tax al 9% si applica agli utili sopra una soglia. Anche le società in free zone devono presentare la dichiarazione annuale, pur potendo beneficiare di aliquote agevolate. Ce ne occupiamo noi.' },
  { q: 'Posso restare in Italia e avere la mia società gestita da voi?', a: 'Sì. Molti nostri clienti risiedono in Italia. In questi casi valutiamo insieme gli obblighi italiani (CFC, quadro RW) per tenere tutto in regola su entrambi i fronti.' },
  { q: 'Come funziona il pagamento ricorrente?', a: 'Scegli il piano e attivi un pagamento mensile sicuro con carta. Nessun vincolo: puoi cambiare piano o sospendere quando vuoi, dandoci preavviso.' },
  { q: 'Quando siete operativi dopo il pagamento?', a: "Entro 48 ore dall'attivazione assegniamo il tuo account manager e iniziamo a impostare la contabilità. Da lì sei seguito ogni mese." },
]

export default function HomePage() {
  return (
    <>
      <Navbar />

      <div style={{ minHeight: '100vh' }}>

        {/* ============ HERO ============ */}
        <section style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(40px,7vw,84px) clamp(18px,4vw,40px) clamp(30px,4vw,48px)' }}>
          <div style={{ display: 'flex', gap: 'clamp(32px,5vw,64px)', flexWrap: 'wrap', alignItems: 'center' }}>

            {/* Left: headline */}
            <div style={{ flex: '1 1 440px', minWidth: 300 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#efe7d8', border: '1px solid #e3d6bd', color: '#7a6234', fontSize: 13, fontWeight: 600, padding: '6px 14px', borderRadius: 999, marginBottom: 22 }}>
                Un servizio PB TAX International · Dubai
              </div>
              <h1 style={{ fontSize: 'clamp(34px,5.2vw,56px)', lineHeight: 1.05, letterSpacing: '-0.03em', fontWeight: 800, margin: '0 0 20px' }}>
                La gestione della tua società a Dubai, <span style={{ color: '#a9885e' }}>team italiano.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px,1.6vw,19px)', lineHeight: 1.6, color: '#5b6570', margin: '0 0 30px', maxWidth: 560 }}>
                Contabilità, Corporate Tax UAE, VAT e compliance — tutto gestito da professionisti italiani a Dubai. Scopri il piano giusto per te in 3 minuti.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                <Link href="/configuratore" style={{ background: '#1d2b3a', color: '#fff', fontSize: 16, fontWeight: 600, padding: '16px 26px', borderRadius: 11, boxShadow: '0 4px 14px rgba(29,43,58,.22)', textDecoration: 'none', display: 'inline-block' }}>
                  Calcola il tuo piano →
                </Link>
                <Link href="/pacchetti" style={{ background: 'none', fontSize: 16, fontWeight: 600, color: '#1d2b3a', padding: '16px 8px', textDecoration: 'underline', textDecorationColor: '#cdbfa6', textUnderlineOffset: 4 }}>
                  Vedi i pacchetti
                </Link>
              </div>
            </div>

            {/* Right: pricing card */}
            <div style={{ flex: '1 1 360px', minWidth: 280 }}>
              <div style={{ background: '#fff', border: '1px solid #e6dfd2', borderRadius: 20, padding: 26, boxShadow: '0 18px 40px -22px rgba(29,43,58,.35)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#8a93a0', textTransform: 'uppercase', letterSpacing: '.08em' }}>A partire da</span>
                  <span style={{ background: '#efe7d8', color: '#7a6234', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>PIANO BASIC</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.03em' }}>500</span>
                  <span style={{ fontSize: 18, fontWeight: 600, color: '#5b6570' }}>AED / mese</span>
                </div>
                <div style={{ fontSize: 13, color: '#8a93a0', marginBottom: 20 }}>IVA 5% inclusa · fino a 25 transazioni</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {['Contabilità mensile', 'Corporate Tax Return annuale', 'Comunicazione in italiano'].map(f => (
                    <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 14.5, color: '#3a4550' }}>
                      <span style={{ color: '#2f8a5b', fontWeight: 700 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 12.5, lineHeight: 1.5, color: '#8a93a0', marginTop: 16, paddingTop: 14, borderTop: '1px dashed #e6dfd2' }}>
                  Valido sotto la soglia VAT di 375.000 AED. Oltre la soglia si parte dal piano <strong style={{ color: '#3a4550' }}>Entry Level a 800 AED/mese</strong> con dichiarazione VAT inclusa.
                </div>
                <Link href="/configuratore" style={{ display: 'block', width: '100%', marginTop: 18, background: '#efe7d8', color: '#1d2b3a', fontSize: 15, fontWeight: 600, padding: 13, borderRadius: 10, textDecoration: 'none', textAlign: 'center' }}>
                  Calcola il tuo piano →
                </Link>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: 'clamp(14px,3vw,40px)', flexWrap: 'wrap', marginTop: 'clamp(36px,5vw,56px)', paddingTop: 28, borderTop: '1px solid #e6dfd2' }}>
            {trustBadges.map(b => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ width: 7, height: 7, borderRadius: 2, background: '#a9885e', transform: 'rotate(45deg)', display: 'inline-block' }}></span>
                <span style={{ fontSize: 14.5, fontWeight: 600, color: '#3a4550' }}>{b}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ============ COME FUNZIONA ============ */}
        <section style={{ background: '#fff', borderTop: '1px solid #e6dfd2', borderBottom: '1px solid #e6dfd2' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(18px,4vw,40px)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,56px)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#a9885e', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>Come funziona</div>
              <h2 style={{ fontSize: 'clamp(28px,3.4vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>Operativi in 48 ore, in tre passi</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'clamp(18px,2.5vw,28px)' }}>
              {comeFunziona.map(s => (
                <div key={s.n} style={{ background: '#faf8f3', border: '1px solid #ece5d8', borderRadius: 16, padding: '30px 26px' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: '#1d2b3a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, fontWeight: 700, marginBottom: 20 }}>{s.n}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontSize: 15, lineHeight: 1.55, color: '#5b6570' }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PRICING PREVIEW ============ */}
        <section style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(18px,4vw,40px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 'clamp(28px,4vw,44px)' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#a9885e', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>I pacchetti</div>
              <h2 style={{ fontSize: 'clamp(28px,3.4vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>Prezzi chiari, IVA 5% inclusa</h2>
            </div>
            <Link href="/pacchetti" style={{ fontSize: 15, fontWeight: 600, color: '#1d2b3a', textDecoration: 'underline', textDecorationColor: '#cdbfa6', textUnderlineOffset: 4, padding: '8px 0' }}>
              Vedi tutti i piani →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(18px,2vw,24px)' }}>
            {homePlans.map(p => (
              <div key={p.name} style={{ position: 'relative', background: p.popular ? '#1d2b3a' : '#fff', border: p.popular ? '1.5px solid #1d2b3a' : '1px solid #e6dfd2', borderRadius: 18, padding: '30px 26px', display: 'flex', flexDirection: 'column', boxShadow: p.popular ? '0 22px 44px -24px rgba(29,43,58,.55)' : '0 1px 2px rgba(0,0,0,.03)' }}>
                {p.popular && (
                  <span style={{ position: 'absolute', top: -12, left: 26, background: '#a9885e', color: '#fff', fontSize: 12, fontWeight: 700, padding: '5px 13px', borderRadius: 999, letterSpacing: '.02em' }}>Più scelto</span>
                )}
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: p.popular ? '#c2a677' : '#a9885e', marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: p.popular ? '#9aa6b3' : '#8a93a0', marginBottom: 14 }}>{p.subtitle}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
                  <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', color: p.popular ? '#fff' : '#1d2b3a' }}>{p.price}</span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: p.popular ? '#9aa6b3' : '#8a93a0' }}>AED/mese</span>
                </div>
                <div style={{ fontSize: 13, color: p.popular ? '#9aa6b3' : '#8a93a0', marginBottom: 22, marginTop: 3 }}>IVA 5% inclusa</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 26, flex: 1 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14.5, lineHeight: 1.45, color: p.popular ? '#dbe1e8' : '#3a4550' }}>
                      <span style={{ color: p.popular ? '#7fd0a3' : '#2f8a5b', fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <Link href="/configuratore" style={{ display: 'block', width: '100%', background: p.popular ? '#a9885e' : '#efe7d8', color: p.popular ? '#fff' : '#1d2b3a', border: 'none', fontSize: 15, fontWeight: 600, padding: 13, borderRadius: 10, textDecoration: 'none', textAlign: 'center' }}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ============ TESTIMONIALS ============ */}
        <section style={{ background: '#1d2b3a', color: '#fff' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(18px,4vw,40px)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,52px)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#c2a677', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>Dicono di noi</div>
              <h2 style={{ fontSize: 'clamp(28px,3.4vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>Imprenditori italiani, già operativi a Dubai</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(18px,2vw,24px)' }}>
              {testimonials.map(t => (
                <div key={t.name} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 18, padding: 28 }}>
                  <div style={{ fontSize: 15.5, lineHeight: 1.6, color: '#e7ebef', marginBottom: 22 }}>&ldquo;{t.quote}&rdquo;</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#a9885e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15 }}>{t.initials}</div>
                    <div>
                      <div style={{ fontSize: 14.5, fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: 13, color: '#9aa6b3' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <FaqSection faqs={faqs} />

      </div>

      <Footer />
    </>
  )
}

function FaqSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section style={{ maxWidth: 820, margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(18px,4vw,40px)' }}>
      <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,4vw,44px)' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#a9885e', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>Domande frequenti</div>
        <h2 style={{ fontSize: 'clamp(28px,3.4vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>Le risposte chiare, prima di iniziare</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {faqs.map((f) => (
          <details key={f.q} style={{ background: '#fff', border: '1px solid #e6dfd2', borderRadius: 14, overflow: 'hidden' }}>
            <summary style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, textAlign: 'left', cursor: 'pointer', padding: '20px 22px', fontSize: 16, fontWeight: 600, color: '#1d2b3a', listStyle: 'none' }}>
              {f.q}
              <span style={{ fontSize: 22, color: '#a9885e', flexShrink: 0, lineHeight: 1 }}>+</span>
            </summary>
            <div style={{ padding: '0 22px 22px', fontSize: 15, lineHeight: 1.62, color: '#5b6570' }}>{f.a}</div>
          </details>
        ))}
      </div>
    </section>
  )
}
