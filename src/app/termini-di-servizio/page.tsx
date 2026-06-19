import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Termini di Servizio · societa-dubai.it' }

const sections = [
  { title: '1. Definizione del servizio', body: 'societa-dubai.it è una piattaforma di PB TAX International Tax Consultants FZCO che offre servizi di gestione contabile, fiscale e compliance per società negli Emirati Arabi Uniti. Il servizio costituisce consulenza contabile e fiscale — non consulenza legale ai sensi dell\'ordinamento italiano o UAE.' },
  { title: '2. Il configuratore', body: 'I prezzi e le stime fornite dal configuratore sono orientativi e non costituiscono offerta contrattuale vincolante. Il preventivo definitivo sarà confermato da PB TAX a seguito di verifica della situazione specifica del cliente.' },
  { title: '3. Condizioni di abbonamento', body: 'I piani di gestione contabile sono in abbonamento mensile ricorrente, addebitato tramite MAMO Pay. Il cliente può cancellare il servizio con 30 giorni di preavviso scritto. Non è previsto rimborso del periodo già pagato.' },
  { title: '4. Obblighi del cliente', body: null, list: ['Fornire documentazione accurata e completa entro i termini concordati', 'Informare tempestivamente PB TAX di variazioni societarie rilevanti', 'Mantenere aggiornato il metodo di pagamento', 'Non utilizzare i servizi per attività illecite ai sensi della legge UAE o italiana'] },
  { title: '5. Limitazioni di responsabilità', body: 'PB TAX non è responsabile per sanzioni derivanti da informazioni incomplete o errate fornite dal cliente, da variazioni normative posteriori alla data di prestazione del servizio, o da decisioni del cliente prese autonomamente. La responsabilità massima di PB TAX è limitata alle somme effettivamente pagate dal cliente per il servizio specifico oggetto di contestazione.' },
  { title: '6. Legge applicabile e foro competente', body: 'Il contratto è regolato dalla legge degli Emirati Arabi Uniti. Per le controversie si applicano i regolamenti DMCC. Foro competente: DMCC o DIFC Courts, a scelta di PB TAX.' },
  { title: '7. Contatti', body: 'Per qualsiasi questione relativa ai presenti termini: info@societa-dubai.it · WhatsApp: +971 585025012' },
]

export default function TerminiPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(40px,5vw,64px) clamp(18px,4vw,40px) 80px' }}>
        <h1 style={{ fontSize: 'clamp(28px,3.4vw,38px)', fontWeight: 800, margin: '0 0 8px', color: '#1d2b3a' }}>Termini di Servizio</h1>
        <p style={{ fontSize: 14, color: '#8a93a0', margin: '0 0 32px' }}>Ultimo aggiornamento: Giugno 2026</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {sections.map(s => (
            <div key={s.title}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1d2b3a', margin: '0 0 10px' }}>{s.title}</h2>
              {s.body && <p style={{ fontSize: 15, lineHeight: 1.65, color: '#5b6570', margin: 0 }}>{s.body}</p>}
              {s.list && (
                <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {s.list.map(item => (
                    <li key={item} style={{ fontSize: 15, lineHeight: 1.55, color: '#5b6570' }}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
