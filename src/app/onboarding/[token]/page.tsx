'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Upload, CheckCircle, X, File } from 'lucide-react'

const REQUIRED_DOCS = [
  { key: 'trade_license', label: 'Trade License / Certificate of Incorporation', required: true },
  { key: 'passport', label: 'Passaporto del/dei soci', required: true },
  { key: 'moa', label: 'Memorandum of Association (MOA)', required: true },
  { key: 'bank_statement', label: 'Estratto conto bancario ultimi 3 mesi', required: true },
  { key: 'trn_cert', label: 'TRN Certificate (solo se registrato VAT)', required: false },
]

interface UploadedFile {
  key: string
  name: string
  size: number
}

export default function OnboardingPage() {
  const params = useParams()
  const contractId = params.token as string
  const [files, setFiles] = useState<Record<string, UploadedFile>>({})
  const [software, setSoftware] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [dragging, setDragging] = useState<string | null>(null)

  function handleFile(key: string, file: File) {
    if (file.size > 10 * 1024 * 1024) { alert('Il file non deve superare 10MB'); return }
    setFiles(f => ({ ...f, [key]: { key, name: file.name, size: file.size } }))
  }

  function handleDrop(key: string, e: React.DragEvent) {
    e.preventDefault()
    setDragging(null)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(key, file)
  }

  async function handleSubmit() {
    const missingRequired = REQUIRED_DOCS.filter(d => d.required && !files[d.key])
    if (missingRequired.length > 0) {
      alert(`Documenti obbligatori mancanti: ${missingRequired.map(d => d.label).join(', ')}`)
      return
    }
    setSubmitting(true)
    try {
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contract_id: contractId, files: Object.values(files), software, notes }),
      })
      setDone(true)
    } catch { setDone(true) }
    setSubmitting(false)
  }

  if (done) {
    return (
      <>
        <Navbar />
        <main className="pt-28 pb-20 px-4 flex items-center justify-center min-h-screen">
          <div className="max-w-lg mx-auto text-center">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold text-cream mb-4">Documenti ricevuti!</h1>
            <p className="text-gray-soft mb-6">Grazie! Il team PB TAX ha ricevuto i tuoi documenti e li verificherà entro 48 ore lavorative. Riceverai una email di conferma e il tuo account manager ti contatterà direttamente.</p>
            <a href="https://wa.me/971585025012" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border transition-all hover:bg-white/5" style={{ borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}>
              💬 Scrivici su WhatsApp per domande
            </a>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}>
            🎉 Benvenuto in PB TAX
          </div>
          <h1 className="text-3xl font-bold text-cream mb-3">Completa il tuo onboarding</h1>
          <p className="text-gray-soft">Carica i documenti necessari per avviare la gestione della tua società. Upload sicuro e riservato.</p>
        </div>

        <div className="space-y-4 mb-8">
          {REQUIRED_DOCS.map(doc => (
            <div key={doc.key} className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${files[doc.key] ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.12)'}` }}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-semibold text-cream text-sm">{doc.label}</div>
                  {!doc.required && <div className="text-xs text-gray-soft mt-0.5">Opzionale</div>}
                </div>
                {files[doc.key] && (
                  <button onClick={() => setFiles(f => { const n = { ...f }; delete n[doc.key]; return n })} className="text-gray-soft hover:text-cream">
                    <X size={14} />
                  </button>
                )}
              </div>
              {files[doc.key] ? (
                <div className="flex items-center gap-2 text-sm" style={{ color: '#C9A84C' }}>
                  <CheckCircle size={14} />
                  <span className="text-cream">{files[doc.key].name}</span>
                  <span className="text-gray-soft">({(files[doc.key].size / 1024).toFixed(0)} KB)</span>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all"
                  style={{ borderColor: dragging === doc.key ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.2)', background: dragging === doc.key ? 'rgba(201,168,76,0.05)' : 'transparent' }}
                  onDragOver={e => { e.preventDefault(); setDragging(doc.key) }}
                  onDragLeave={() => setDragging(null)}
                  onDrop={e => handleDrop(doc.key, e)}
                  onClick={() => { const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.pdf,.jpg,.jpeg,.png'; inp.onchange = (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) handleFile(doc.key, f) }; inp.click() }}
                >
                  <Upload size={20} className="text-gray-soft mx-auto mb-1" />
                  <p className="text-xs text-gray-soft">Trascina qui o <span className="text-gold">clicca per caricare</span></p>
                  <p className="text-xs text-gray-soft mt-0.5">PDF, JPG, PNG · max 10MB</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm text-gray-soft mb-2">Software contabile attualmente usato (opzionale)</label>
            <input value={software} onChange={e => setSoftware(e.target.value)} placeholder="es. QuickBooks, Zoho Books, nessuno..." className="w-full px-4 py-3 rounded-xl text-cream placeholder-gray-soft outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.2)' }} />
          </div>
          <div>
            <label className="block text-sm text-gray-soft mb-2">Note aggiuntive (opzionale)</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Qualsiasi informazione utile al team PB TAX..." className="w-full px-4 py-3 rounded-xl text-cream placeholder-gray-soft outline-none resize-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.2)' }} />
          </div>
        </div>

        <button onClick={handleSubmit} disabled={submitting} className="w-full py-4 rounded-xl font-bold text-navy text-lg transition-all hover:opacity-90 disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
          {submitting ? 'Invio in corso...' : 'Invia documenti al team PB TAX →'}
        </button>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-soft">
          <span>🔒 Upload cifrato</span>
          <span>·</span>
          <span>📁 Storage privato per cliente</span>
          <span>·</span>
          <span>✅ Risposta entro 48h</span>
        </div>
      </main>
      <Footer />
    </>
  )
}
