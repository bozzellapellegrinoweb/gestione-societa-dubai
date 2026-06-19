import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Termini di Servizio · societa-dubai.it' }

export default function TerminiPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-cream mb-2">Termini di Servizio</h1>
        <p className="text-gray-soft mb-8 text-sm">Ultimo aggiornamento: Giugno 2026</p>
        <div className="space-y-6 text-gray-soft text-sm leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">1. Definizione del servizio</h2>
            <p>societa-dubai.it è una piattaforma di PB TAX International Tax Consultants FZCO che offre servizi di gestione contabile, fiscale e compliance per società negli Emirati Arabi Uniti. Il servizio costituisce consulenza contabile e fiscale — non consulenza legale ai sensi dell&apos;ordinamento italiano o UAE.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">2. Il configuratore</h2>
            <p>I prezzi e le stime fornite dal configuratore sono orientativi e non costituiscono offerta contrattuale vincolante. Il preventivo definitivo sarà confermato da PB TAX a seguito di verifica della situazione specifica del cliente.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">3. Condizioni di abbonamento</h2>
            <p>I piani di gestione contabile sono in abbonamento mensile ricorrente, addebitato tramite MAMO Pay. Il cliente può cancellare il servizio con 30 giorni di preavviso scritto. Non è previsto rimborso del periodo già pagato.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">4. Obblighi del cliente</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Fornire documentazione accurata e completa entro i termini concordati</li>
              <li>Informare tempestivamente PB TAX di variazioni societarie rilevanti</li>
              <li>Mantenere aggiornato il metodo di pagamento</li>
              <li>Non utilizzare i servizi per attività illecite ai sensi della legge UAE o italiana</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">5. Limitazioni di responsabilità</h2>
            <p>PB TAX non è responsabile per sanzioni derivanti da informazioni incomplete o errate fornite dal cliente, da variazioni normative posteriori alla data di prestazione del servizio, o da decisioni del cliente prese autonomamente. La responsabilità massima di PB TAX è limitata alle somme effettivamente pagate dal cliente per il servizio specifico oggetto di contestazione.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">6. Legge applicabile e foro competente</h2>
            <p>Il contratto è regolato dalla legge degli Emirati Arabi Uniti. Per le controversie si applicano i regolamenti DMCC. Foro competente: DMCC o DIFC Courts, a scelta di PB TAX.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">7. Contatti</h2>
            <p>Per qualsiasi questione relativa ai presenti termini: info@societa-dubai.it · WhatsApp: +971 585025012</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
