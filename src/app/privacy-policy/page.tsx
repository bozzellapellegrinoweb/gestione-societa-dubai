import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy · societa-dubai.it' }

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-cream mb-2">Privacy Policy</h1>
        <p className="text-gray-soft mb-8 text-sm">Ultimo aggiornamento: Giugno 2026</p>
        <div className="space-y-6 text-gray-soft text-sm leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">1. Titolare del trattamento</h2>
            <p>PB TAX International Tax Consultants FZCO — Platinum Tower Unit 2503, JLT, Dubai, UAE. Email: info@pbtax.ae · WhatsApp: +971 585025012</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">2. Dati raccolti</h2>
            <p>Raccogliamo dati forniti direttamente dall&apos;utente tramite il configuratore (nome, email, telefono, dati societari), documenti caricati durante l&apos;onboarding, e dati di navigazione anonimi per analytics. Non raccogliamo dati sensibili ai sensi del GDPR art. 9.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">3. Finalità del trattamento</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Erogazione dei servizi contabili e fiscali richiesti</li>
              <li>Gestione della relazione contrattuale</li>
              <li>Comunicazioni commerciali (previo consenso esplicito)</li>
              <li>Adempimento di obblighi di legge UAE e italiani</li>
              <li>Analytics del sito per miglioramento del servizio</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">4. Base giuridica (GDPR)</h2>
            <p>Esecuzione del contratto (art. 6.1.b), consenso (art. 6.1.a), legittimo interesse (art. 6.1.f), obbligo legale (art. 6.1.c).</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">5. Conservazione dei dati</h2>
            <p>I dati contrattuali sono conservati per 10 anni ai sensi della normativa UAE e italiana. I documenti caricati sono conservati per la durata del rapporto contrattuale + 7 anni. I dati di configuratori non convertiti sono conservati per 12 mesi.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">6. Trasferimento dati extra-UE</h2>
            <p>I dati sono elaborati su server Supabase (EU region) e possono essere trasferiti negli UAE per l&apos;erogazione dei servizi, nel rispetto delle garanzie previste dal GDPR e dalla UAE PDPL (Personal Data Protection Law).</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">7. Diritti dell&apos;interessato</h2>
            <p>Hai il diritto di accesso, rettifica, cancellazione, portabilità, limitazione del trattamento e opposizione. Per esercitare i tuoi diritti scrivi a: privacy@societa-dubai.it o tramite WhatsApp.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">8. Cookie</h2>
            <p>Utilizziamo cookie tecnici necessari al funzionamento del sito e cookie analytics (Google Analytics 4) previo consenso. Non utilizziamo cookie di profilazione commerciale di terze parti.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
