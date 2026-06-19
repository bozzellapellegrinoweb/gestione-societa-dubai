import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CheckCircle, ArrowRight, Star, Shield, Globe, Phone } from 'lucide-react'
import { PLANS } from '@/lib/pricing'
import { formatAED, formatEUR } from '@/lib/utils'

const faqs = [
  { q: 'Quanto costa un commercialista a Dubai?', a: 'I nostri piani partono da 500 AED/mese (~125€) per società con fino a 25 transazioni mensili. Il costo varia in base al volume di attività e ai servizi richiesti.' },
  { q: 'Devo essere residente a Dubai per usare il servizio?', a: 'No. Gestiamo società di imprenditori italiani sia residenti negli Emirati che ancora residenti in Italia. In entrambi i casi esistono obblighi specifici che ti aiutiamo a gestire.' },
  { q: "Cos'è la Corporate Tax UAE?", a: "Dal 1° giugno 2023, tutte le società negli Emirati sono soggette a una Corporate Tax del 9% sul reddito imponibile oltre 375.000 AED. È inclusa in tutti i nostri piani." },
  { q: 'Gestite anche la VAT (IVA emiratina)?', a: 'Sì. Se la tua società è registrata VAT (TRN), gestiamo la preparazione e presentazione dei VAT Return. Se non sei ancora registrato ma superi la soglia obbligatoria, ti aiutiamo con l\'abilitazione TRN.' },
  { q: "Come funziona l'onboarding?", a: 'Dopo il pagamento ricevi un link sicuro per caricare i documenti necessari (Trade License, passaporto, MOA, estratti conto). Il nostro team verifica tutto entro 48 ore lavorative.' },
  { q: 'Gestite free zone e mainland?', a: 'Sì. Operiamo per società Free Zone (IFZA, DMCC, RAKEZ, Meydan, UAQ e altre), Mainland (LLC) e anche Offshore con valutazione iniziale personalizzata.' },
  { q: 'Come comunicate con i clienti?', a: '100% in italiano. Hai un account manager dedicato raggiungibile via email e WhatsApp. Nessuna burocrazia in inglese o arabo.' },
  { q: 'Posso cambiare piano in futuro?', a: 'Sì, puoi upgradarti o downgradarti in qualsiasi momento con 30 giorni di preavviso.' },
]

export default function HomePage() {
  const displayPlans = PLANS.slice(0, 3)

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}>
            <Star size={14} fill="currentColor" /> 450+ aziende gestite · 5 anni a Dubai
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-6">
            La gestione della tua società a Dubai,{' '}
            <span className="text-gold">finalmente in italiano.</span>
          </h1>
          <p className="text-xl text-gray-soft leading-relaxed mb-10 max-w-2xl mx-auto">
            Contabilità, Corporate Tax, VAT e compliance per società Free Zone e Mainland negli Emirati. Tutto in italiano, con un commercialista dedicato. Powered by PB TAX International.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/configuratore" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-navy text-lg transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
              Scopri il tuo piano <ArrowRight size={20} />
            </Link>
            <Link href="https://wa.me/971585025012" target="_blank" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-cream text-lg border transition-all hover:bg-white/5" style={{ borderColor: 'rgba(201,168,76,0.3)' }}>
              <Phone size={18} /> Parla con noi su WhatsApp
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center">
          {[
            { icon: '🏢', label: '450+ aziende', sub: 'gestite con successo' },
            { icon: '🇮🇹', label: '100% italiano', sub: 'nessuna barriera linguistica' },
            { icon: '⚡', label: '48h onboarding', sub: 'attivazione rapida' },
            { icon: '🔒', label: 'Compliance UAE', sub: 'sempre aggiornata' },
          ].map((b) => (
            <div key={b.label} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}>
              <div className="text-2xl mb-1">{b.icon}</div>
              <div className="font-bold text-gold text-sm">{b.label}</div>
              <div className="text-xs text-gray-soft mt-0.5">{b.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Come funziona */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-cream mb-4">Come funziona</h2>
          <p className="text-gray-soft">Dal configuratore alla gestione completa in 3 semplici passi</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { n: '01', title: 'Configura', desc: 'Rispondi a 10 domande sulla tua società. Il nostro tool costruisce automaticamente il piano su misura per te.', icon: '⚙️' },
            { n: '02', title: 'Paga', desc: 'Attiva il tuo piano con pagamento sicuro via MAMO Pay. Subscription mensile, cancellabile in qualsiasi momento.', icon: '💳' },
            { n: '03', title: 'Affidati a noi', desc: 'Carica i documenti, ti assegniamo un account manager italiano dedicato. Pensiamo a tutto noi.', icon: '🤝' },
          ].map((s) => (
            <div key={s.n} className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}>
              <div className="text-4xl mb-3">{s.icon}</div>
              <div className="text-gold font-bold text-sm mb-1">STEP {s.n}</div>
              <h3 className="text-xl font-bold text-cream mb-2">{s.title}</h3>
              <p className="text-gray-soft text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Piani preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-cream mb-4">Piani e prezzi</h2>
          <p className="text-gray-soft">Piani mensili ricorrenti in AED. Nessun costo nascosto.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {displayPlans.map((plan, i) => (
            <div key={plan.key} className="p-6 rounded-2xl" style={{ background: i === 1 ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.04)', border: `1px solid ${i === 1 ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.12)'}` }}>
              {i === 1 && <div className="text-xs font-bold text-gold mb-3 uppercase tracking-wider">⭐ Più scelto</div>}
              <div className="text-lg font-bold text-cream mb-1">{plan.label}</div>
              <div className="text-3xl font-bold text-gold mb-1">{formatAED(plan.priceAED!)}</div>
              <div className="text-xs text-gray-soft mb-4">{formatEUR(plan.priceAED!)} · /mese</div>
              <div className="text-sm text-gray-soft mb-4">{plan.description}</div>
              <ul className="space-y-1.5 mb-6">
                {plan.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-cream">
                    <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/configuratore" className="block text-center px-4 py-2.5 rounded-lg font-semibold text-sm transition-all hover:opacity-90" style={{ background: i === 1 ? 'linear-gradient(135deg, #a9885e, #C9A84C)' : 'rgba(201,168,76,0.15)', color: i === 1 ? '#0A1628' : '#C9A84C' }}>
                Inizia con {plan.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/pacchetti" className="inline-flex items-center gap-2 text-gold hover:opacity-80 transition-opacity font-semibold">
            Vedi tutti i pacchetti <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Chi siamo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl p-8 md:p-12" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-gold text-sm font-bold uppercase tracking-wider mb-3">PB TAX International</div>
              <h2 className="text-3xl font-bold text-cream mb-4">Dietro societa-dubai.it c&apos;è il team di PB TAX</h2>
              <p className="text-gray-soft leading-relaxed mb-4">
                Avv. Pellegrino Bozzella e il suo team operano dal cuore di Dubai (Platinum Tower, JLT) dal 2019. Oltre 450 aziende italiane gestite negli Emirati.
              </p>
              <ul className="space-y-2">
                {['Commercialisti iscritti UAE', 'Esperti in diritto societario DMCC', 'Partner con le principali Free Zone', 'Comunicazione sempre in italiano'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-cream">
                    <Shield size={14} className="text-gold" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              {[
                { quote: '"Finalmente un commercialista a Dubai che risponde in italiano e capisce la normativa sia UAE che italiana."', author: 'Marco T., imprenditore e-commerce, IFZA' },
                { quote: '"Ho attivato il piano Professional in 10 minuti. L\'onboarding è stato semplice e il team ha gestito tutto."', author: 'Chiara M., consulente, DMCC Free Zone' },
              ].map((t) => (
                <div key={t.author} className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.1)' }}>
                  <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-gold" fill="currentColor" />)}</div>
                  <p className="text-sm text-cream italic mb-2">{t.quote}</p>
                  <p className="text-xs text-gray-soft">{t.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-cream mb-4">Domande frequenti</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.1)' }}>
              <h3 className="font-semibold text-cream mb-2">{faq.q}</h3>
              <p className="text-gray-soft text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA finale */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="rounded-2xl p-10 md:p-16" style={{ background: 'linear-gradient(135deg, rgba(169,136,94,0.15), rgba(201,168,76,0.1))', border: '1px solid rgba(201,168,76,0.3)' }}>
          <Globe size={40} className="text-gold mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">Pronto a mettere in ordine la tua società a Dubai?</h2>
          <p className="text-gray-soft text-lg mb-8">Il configuratore ti guida in 5 minuti. Zero call, zero attese. Attivazione immediata.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/configuratore" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-navy text-lg transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
              Inizia il configuratore <ArrowRight size={20} />
            </Link>
            <Link href="https://wa.me/971585025012" target="_blank" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-cream text-lg border transition-all hover:bg-white/5" style={{ borderColor: 'rgba(201,168,76,0.3)' }}>
              💬 Scrivici su WhatsApp
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
