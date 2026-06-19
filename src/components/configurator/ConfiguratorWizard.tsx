'use client'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { ConfiguratorData, computeAlerts } from '@/lib/types'
import { PLANS, ADDONS, getPlanByTransactions } from '@/lib/pricing'
import { formatAED, formatEUR } from '@/lib/utils'
import ResultCard from './ResultCard'

const TOTAL_STEPS = 10

type Step1Option = { value: ConfiguratorData['step1_company_type']; label: string; icon: string; alert?: string }
type Step2Option = { value: ConfiguratorData['step2_age']; label: string; icon: string }
type Step4Option = { value: ConfiguratorData['step4_vat']; label: string; icon: string; alert?: string }
type Step6Option = { value: ConfiguratorData['step6_corporate_tax']; label: string; icon: string; alert?: string }
type Step7Option = { value: ConfiguratorData['step7_italy']; label: string; icon: string; alert?: string }
type Step8Option = { value: ConfiguratorData['step8_accountant']; label: string; icon: string; alert?: string }

const step1Options: Step1Option[] = [
  { value: 'freezone', label: 'Free Zone (IFZA, DMCC, RAKEZ, Meydan, UAQ, o altra)', icon: '🏢' },
  { value: 'mainland', label: 'Mainland (LLC o Branch)', icon: '🏙️' },
  { value: 'offshore', label: 'Offshore (RAK ICC, JAFZA Offshore)', icon: '🌐', alert: 'Le società offshore hanno requisiti contabili specifici — ti guidiamo noi nella valutazione.' },
  { value: 'unknown', label: 'Non sono sicuro del tipo', icon: '❓' },
]

const step2Options: Step2Option[] = [
  { value: 'new', label: "L'ho appena costituita (meno di 3 mesi)", icon: '🆕' },
  { value: 'less1y', label: 'Meno di 1 anno', icon: '📅' },
  { value: '1to3y', label: '1-3 anni', icon: '📆' },
  { value: 'more3y', label: 'Più di 3 anni', icon: '🗓️' },
]

const transactionOptions = [
  { label: 'Fino a 25 transazioni/mese', value: 25, plan: 'ESSENTIAL', price: 500 },
  { label: 'Da 26 a 50 transazioni/mese', value: 50, plan: 'SMART', price: 800 },
  { label: 'Da 51 a 100 transazioni/mese', value: 100, plan: 'PROFESSIONAL', price: 1200 },
  { label: 'Da 101 a 150 transazioni/mese', value: 150, plan: 'BUSINESS', price: 1500 },
  { label: 'Da 151 a 300 transazioni/mese', value: 300, plan: 'PREMIUM', price: 1800 },
  { label: 'Da 301 a 500 transazioni/mese', value: 500, plan: 'CORPORATE', price: 2000 },
  { label: 'Oltre 500 transazioni/mese', value: 9999, plan: 'ENTERPRISE', price: null },
]

const step4Options: Step4Option[] = [
  { value: 'yes', label: 'Sì, siamo registrati VAT (abbiamo il TRN)', icon: '✅' },
  { value: 'no', label: 'No, non siamo registrati', icon: '❌', alert: 'Se il tuo fatturato annuo supera 375.000 AED (~102.000€), la registrazione VAT è obbligatoria per legge UAE. Includeremo una verifica nell\'onboarding.' },
  { value: 'unknown', label: 'Non so / non ricordo', icon: '❓', alert: 'Nessun problema — lo verifichiamo noi durante l\'onboarding iniziale.' },
]

const employeeOptions = [
  { value: 0 as const, label: 'Nessuno (società senza dipendenti)', icon: '👤' },
  { value: 1 as const, label: '1-2 persone', icon: '👥' },
  { value: 2 as const, label: '3-5 persone', icon: '👥' },
  { value: 3 as const, label: 'Più di 5 persone', icon: '👥', alert: 'Con più di 5 dipendenti è necessaria una gestione WPS (Wage Protection System) e payroll dedicata. Ti proporremo un add-on specifico.' },
]

const step6Options: Step6Option[] = [
  { value: 'yes', label: 'Sì, l\'abbiamo già presentata', icon: '✅' },
  { value: 'pending', label: 'No, ma so che devo farlo', icon: '⏳', alert: 'Incluso nel tuo pacchetto: la preparazione e presentazione del Corporate Tax Return annuale.' },
  { value: 'unknown', label: 'Non so cosa sia la Corporate Tax UAE', icon: '❓', alert: 'Dal 1° giugno 2023, tutte le società negli Emirati sono soggette alla Corporate Tax UAE del 9% sul reddito imponibile oltre 375.000 AED. È un obbligo, non una scelta. Ci pensiamo noi.' },
]

const step7Options: Step7Option[] = [
  { value: 'aire', label: 'Sono iscritto AIRE e residente a Dubai (ho chiuso con il Fisco IT)', icon: '🇦🇪' },
  { value: 'resident', label: 'Sono ancora residente in Italia (ho obblighi fiscali italiani)', icon: '🇮🇹', alert: 'Attenzione: se sei ancora fiscalmente residente in Italia, la tua società UAE potrebbe avere obblighi di dichiarazione anche in Italia (CFC, quadro RW, IVAFE). Questa è un\'area critica che gestiamo con il servizio di consulenza fiscale Italia-UAE.' },
  { value: 'transitioning', label: 'Sto trasferendo la residenza (situazione in transizione)', icon: '🔄' },
  { value: 'unknown', label: 'Non sono sicuro della mia posizione', icon: '❓' },
]

const step8Options: Step8Option[] = [
  { value: 'none', label: 'No, gestivo da solo (o non gestivo)', icon: '😕', alert: 'Molti imprenditori scoprono tardi di avere arretrati contabili o obblighi non rispettati. Il nostro onboarding include sempre una verifica della situazione pregressa.' },
  { value: 'unsatisfied', label: 'Sì, ma non sono soddisfatto del servizio', icon: '😞' },
  { value: 'switching', label: 'Sì, sto valutando di cambiare', icon: '🔄' },
  { value: 'new', label: 'La società è nuova, non ho ancora nessuno', icon: '🆕' },
]

const addonOptions = [
  { key: 'visti', label: 'Gestione visti e PRO services (rinnovi, nuove entry)' },
  { key: 'conto', label: 'Apertura/assistenza conto corrente bancario UAE' },
  { key: 'audit', label: 'Audit certificato con Auditor' },
  { key: 'it_uae', label: 'Consulenza fiscale Italia-UAE coordinata' },
  { key: 'legal', label: 'Contratti commerciali e legali' },
  { key: 'aml', label: 'Verifica/gestione compliance AML' },
]

function AlertBox({ text }: { text: string }) {
  return (
    <div className="mt-3 flex items-start gap-2 p-3 rounded-lg text-sm" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}>
      <AlertTriangle size={14} className="text-gold shrink-0 mt-0.5" />
      <span className="text-cream">{text}</span>
    </div>
  )
}

function InfoBox({ text }: { text: string }) {
  return (
    <div className="mb-4 flex items-start gap-2 p-3 rounded-lg text-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}>
      <Info size={14} className="text-gold-muted shrink-0 mt-0.5" />
      <span className="text-gray-soft">{text}</span>
    </div>
  )
}

export default function ConfiguratorWizard() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<ConfiguratorData>({})
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null)
  const [addons, setAddons] = useState<string[]>([])
  const [contact, setContact] = useState({ full_name: '', email: '', phone: '+971 ', company_name: '', free_zone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const progress = (step / TOTAL_STEPS) * 100

  function go(n: number) { setStep(n); setSelectedAlert(null) }

  function pickOption<K extends keyof ConfiguratorData>(field: K, value: ConfiguratorData[K], alert?: string, nextStep?: number) {
    setData(d => ({ ...d, [field]: value }))
    setSelectedAlert(alert || null)
    if (!alert) {
      setTimeout(() => go(nextStep || step + 1), 200)
    }
  }

  function toggleAddon(key: string) {
    setAddons(a => a.includes(key) ? a.filter(k => k !== key) : [...a, key])
  }

  async function submitContact() {
    if (!contact.full_name || !contact.email || !contact.phone || !contact.company_name) return
    setSubmitting(true)
    const plan = data.step3_transactions ? getPlanByTransactions(data.step3_transactions) : PLANS[2]
    const sessionData = { ...data, step9_addons: addons, step10_contact: contact }
    try {
      await fetch('/api/configurator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_data: sessionData, plan_suggested: plan.key, amount_aed: plan.priceAED, client_email: contact.email }),
      })
    } catch {}
    setData(d => ({ ...d, step9_addons: addons, step10_contact: contact }))
    setDone(true)
    setSubmitting(false)
  }

  if (done) {
    const finalData = { ...data, step9_addons: addons, step10_contact: contact }
    const alerts = computeAlerts(finalData)
    const plan = data.step3_transactions ? getPlanByTransactions(data.step3_transactions) : PLANS[2]
    const selectedAddons = ADDONS.filter(a => addons.includes(a.key))
    return <ResultCard plan={plan} addons={selectedAddons} alerts={alerts} contact={contact} />
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-soft mb-2">
          <span>Step {step} di {TOTAL_STEPS}</span>
          <span>{Math.round(progress)}% completato</span>
        </div>
        <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #a9885e, #C9A84C)' }} />
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-cream mb-2">Che tipo di società hai negli Emirati?</h2>
          <p className="text-gray-soft mb-6">Seleziona il tipo che meglio descrive la tua struttura societaria.</p>
          <div className="space-y-3">
            {step1Options.map(opt => (
              <button key={opt.value} onClick={() => pickOption('step1_company_type', opt.value, opt.alert)} className="w-full text-left p-4 rounded-xl border transition-all hover:border-gold/60" style={{ background: data.step1_company_type === opt.value ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.04)', borderColor: data.step1_company_type === opt.value ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.15)' }}>
                <span className="mr-3">{opt.icon}</span>
                <span className="text-cream font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
          {selectedAlert && (
            <>
              <AlertBox text={selectedAlert} />
              <button onClick={() => go(2)} className="mt-4 w-full py-3 rounded-xl font-semibold text-navy transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
                Continua <ArrowRight size={16} className="inline ml-1" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold text-cream mb-2">Da quanto tempo è attiva la tua società?</h2>
          <p className="text-gray-soft mb-6">Ci aiuta a capire eventuali obblighi pregressi.</p>
          <div className="space-y-3">
            {step2Options.map(opt => (
              <button key={opt.value} onClick={() => {
                const alert = opt.value === 'more3y' ? 'Attenzione: è possibile che esistano obblighi pregressi da sanare. Includeremo una verifica iniziale nel tuo pacchetto.' : undefined
                pickOption('step2_age', opt.value, alert)
              }} className="w-full text-left p-4 rounded-xl border transition-all hover:border-gold/60" style={{ background: data.step2_age === opt.value ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.04)', borderColor: data.step2_age === opt.value ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.15)' }}>
                <span className="mr-3">{opt.icon}</span>
                <span className="text-cream font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
          {selectedAlert && (
            <>
              <AlertBox text={selectedAlert} />
              <button onClick={() => go(3)} className="mt-4 w-full py-3 rounded-xl font-semibold text-navy transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
                Continua <ArrowRight size={16} className="inline ml-1" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold text-cream mb-2">Quante transazioni contabili stimi al mese?</h2>
          <InfoBox text="Per transazione intendiamo ogni documento contabile: fattura emessa, fattura ricevuta, estratto conto bancario, nota spese. In caso di dubbio, scegli il range superiore." />
          <div className="space-y-3">
            {transactionOptions.map(opt => (
              <button key={opt.value} onClick={() => { setData(d => ({ ...d, step3_transactions: opt.value })); go(4) }} className="w-full text-left p-4 rounded-xl border transition-all hover:border-gold/60 flex justify-between items-center" style={{ background: data.step3_transactions === opt.value ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.04)', borderColor: data.step3_transactions === opt.value ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.15)' }}>
                <span className="text-cream font-medium">📊 {opt.label}</span>
                <span className="text-gold font-bold text-sm">{opt.price ? `${opt.plan} · ${opt.price} AED/mese` : `${opt.plan} · Da pattuire`}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold text-cream mb-2">La tua società è registrata per la VAT?</h2>
          <p className="text-gray-soft mb-6">La VAT è l&apos;IVA emiratina al 5%. Si registra tramite TRN (Tax Registration Number).</p>
          <div className="space-y-3">
            {step4Options.map(opt => (
              <button key={opt.value} onClick={() => pickOption('step4_vat', opt.value, opt.alert)} className="w-full text-left p-4 rounded-xl border transition-all hover:border-gold/60" style={{ background: data.step4_vat === opt.value ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.04)', borderColor: data.step4_vat === opt.value ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.15)' }}>
                <span className="mr-3">{opt.icon}</span>
                <span className="text-cream font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
          {selectedAlert && (
            <>
              <AlertBox text={selectedAlert} />
              <button onClick={() => go(5)} className="mt-4 w-full py-3 rounded-xl font-semibold text-navy" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
                Continua <ArrowRight size={16} className="inline ml-1" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Step 5 */}
      {step === 5 && (
        <div>
          <h2 className="text-2xl font-bold text-cream mb-2">Quanti dipendenti o collaboratori con visto UAE ha la tua società?</h2>
          <p className="text-gray-soft mb-6">I collaboratori con visto UAE richiedono una gestione specifica.</p>
          <div className="space-y-3">
            {employeeOptions.map(opt => (
              <button key={opt.value} onClick={() => pickOption('step5_employees', opt.value, 'alert' in opt ? opt.alert : undefined)} className="w-full text-left p-4 rounded-xl border transition-all hover:border-gold/60" style={{ background: data.step5_employees === opt.value ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.04)', borderColor: data.step5_employees === opt.value ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.15)' }}>
                <span className="mr-3">{opt.icon}</span>
                <span className="text-cream font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
          {selectedAlert && (
            <>
              <AlertBox text={selectedAlert} />
              <button onClick={() => go(6)} className="mt-4 w-full py-3 rounded-xl font-semibold text-navy" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
                Continua <ArrowRight size={16} className="inline ml-1" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Step 6 */}
      {step === 6 && (
        <div>
          <h2 className="text-2xl font-bold text-cream mb-2">Hai già gestito la Corporate Tax UAE per la tua società?</h2>
          <p className="text-gray-soft mb-6">Dal 2023 tutte le società UAE sono soggette alla Corporate Tax.</p>
          <div className="space-y-3">
            {step6Options.map(opt => (
              <button key={opt.value} onClick={() => pickOption('step6_corporate_tax', opt.value, opt.alert)} className="w-full text-left p-4 rounded-xl border transition-all hover:border-gold/60" style={{ background: data.step6_corporate_tax === opt.value ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.04)', borderColor: data.step6_corporate_tax === opt.value ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.15)' }}>
                <span className="mr-3">{opt.icon}</span>
                <span className="text-cream font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
          {selectedAlert && (
            <>
              <AlertBox text={selectedAlert} />
              <button onClick={() => go(7)} className="mt-4 w-full py-3 rounded-xl font-semibold text-navy" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
                Continua <ArrowRight size={16} className="inline ml-1" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Step 7 */}
      {step === 7 && (
        <div>
          <h2 className="text-2xl font-bold text-cream mb-2">Qual è la tua situazione con il Fisco italiano?</h2>
          <p className="text-gray-soft mb-6">Importante per valutare eventuali obblighi di dichiarazione in Italia.</p>
          <div className="space-y-3">
            {step7Options.map(opt => (
              <button key={opt.value} onClick={() => pickOption('step7_italy', opt.value, opt.alert)} className="w-full text-left p-4 rounded-xl border transition-all hover:border-gold/60" style={{ background: data.step7_italy === opt.value ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.04)', borderColor: data.step7_italy === opt.value ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.15)' }}>
                <span className="mr-3">{opt.icon}</span>
                <span className="text-cream font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
          {selectedAlert && (
            <>
              <AlertBox text={selectedAlert} />
              <button onClick={() => go(8)} className="mt-4 w-full py-3 rounded-xl font-semibold text-navy" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
                Continua <ArrowRight size={16} className="inline ml-1" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Step 8 */}
      {step === 8 && (
        <div>
          <h2 className="text-2xl font-bold text-cream mb-2">Hai già qualcuno che gestisce la contabilità della tua società?</h2>
          <div className="space-y-3 mt-6">
            {step8Options.map(opt => (
              <button key={opt.value} onClick={() => pickOption('step8_accountant', opt.value, opt.alert)} className="w-full text-left p-4 rounded-xl border transition-all hover:border-gold/60" style={{ background: data.step8_accountant === opt.value ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.04)', borderColor: data.step8_accountant === opt.value ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.15)' }}>
                <span className="mr-3">{opt.icon}</span>
                <span className="text-cream font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
          {selectedAlert && (
            <>
              <AlertBox text={selectedAlert} />
              <button onClick={() => go(9)} className="mt-4 w-full py-3 rounded-xl font-semibold text-navy" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
                Continua <ArrowRight size={16} className="inline ml-1" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Step 9 - Addons */}
      {step === 9 && (
        <div>
          <h2 className="text-2xl font-bold text-cream mb-2">Di quali servizi aggiuntivi hai bisogno?</h2>
          <p className="text-gray-soft mb-6">Selezione multipla — puoi scegliere anche nessuno.</p>
          <div className="space-y-3 mb-6">
            {addonOptions.map(opt => (
              <button key={opt.key} onClick={() => toggleAddon(opt.key)} className="w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3" style={{ background: addons.includes(opt.key) ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.04)', borderColor: addons.includes(opt.key) ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.15)' }}>
                <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ background: addons.includes(opt.key) ? '#C9A84C' : 'rgba(255,255,255,0.1)', border: addons.includes(opt.key) ? 'none' : '1px solid rgba(201,168,76,0.3)' }}>
                  {addons.includes(opt.key) && <CheckCircle size={12} className="text-navy" />}
                </div>
                <span className="text-cream font-medium text-sm">{opt.label}</span>
              </button>
            ))}
          </div>
          <button onClick={() => go(10)} className="w-full py-3 rounded-xl font-semibold text-navy transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
            Continua <ArrowRight size={16} className="inline ml-1" />
          </button>
        </div>
      )}

      {/* Step 10 - Contatto */}
      {step === 10 && (
        <div>
          <h2 className="text-2xl font-bold text-cream mb-2">Per completare il tuo preventivo, inserisci i tuoi dati</h2>
          <p className="text-gray-soft mb-6">I tuoi dati sono al sicuro e non saranno condivisi con terze parti.</p>
          <div className="space-y-4">
            {[
              { field: 'full_name' as const, label: 'Nome e Cognome *', type: 'text', placeholder: 'Mario Rossi' },
              { field: 'email' as const, label: 'Email *', type: 'email', placeholder: 'mario@esempio.it' },
              { field: 'phone' as const, label: 'WhatsApp con prefisso *', type: 'tel', placeholder: '+971 50 123 4567' },
              { field: 'company_name' as const, label: 'Nome della società *', type: 'text', placeholder: 'Mia Società FZCO' },
              { field: 'free_zone' as const, label: 'Free Zone / Autorità di registrazione (opzionale)', type: 'text', placeholder: 'es. IFZA, DMCC...' },
            ].map(f => (
              <div key={f.field}>
                <label className="block text-sm text-gray-soft mb-1">{f.label}</label>
                <input
                  type={f.type}
                  value={contact[f.field]}
                  onChange={e => setContact(c => ({ ...c, [f.field]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-3 rounded-xl text-cream placeholder-gray-soft outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.2)', caretColor: '#C9A84C' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                />
              </div>
            ))}
          </div>
          <button onClick={submitContact} disabled={submitting || !contact.full_name || !contact.email || !contact.phone || !contact.company_name} className="mt-6 w-full py-4 rounded-xl font-bold text-navy text-lg transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
            {submitting ? 'Elaborazione...' : 'Vedi il mio piano personalizzato →'}
          </button>
          <p className="text-xs text-gray-soft text-center mt-3">🔒 I tuoi dati sono protetti. Nessuno spam.</p>
        </div>
      )}

      {/* Navigation */}
      {step > 1 && (
        <button onClick={() => go(step - 1)} className="mt-6 flex items-center gap-1 text-sm text-gray-soft hover:text-gold transition-colors">
          <ArrowLeft size={14} /> Torna indietro
        </button>
      )}
    </div>
  )
}
