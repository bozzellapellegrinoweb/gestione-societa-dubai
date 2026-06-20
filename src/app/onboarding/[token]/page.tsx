'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

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
        <main style={{ maxWidth: 600, margin: '0 auto', padding: 'clamp(60px,8vw,100px) clamp(18px,4vw,40px) 80px', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
          <h1 style={{ fontSize: 'clamp(26px,3.4vw,34px)', fontWeight: 800, margin: '0 0 12px', color: '#1d2b3a' }}>Documenti ricevuti!</h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: '#5b6570', margin: '0 0 28px' }}>Grazie! Il team PB TAX ha ricevuto i tuoi documenti e li verificherà entro 48 ore lavorative. Riceverai una email di conferma e il tuo account manager ti contatterà direttamente.</p>
          <Link href="https://wa.me/971585971575" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#1d8a4e', border: '1.5px solid #d6ddd6', fontSize: 15, fontWeight: 600, padding: '14px 24px', borderRadius: 12, textDecoration: 'none' }}>
            Scrivici su WhatsApp per domande
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 700, margin: '0 auto', padding: 'clamp(40px,5vw,64px) clamp(18px,4vw,40px) 80px' }}>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#efe7d8', border: '1px solid #e3d6bd', color: '#7a6234', fontSize: 13, fontWeight: 600, padding: '6px 14px', borderRadius: 999, marginBottom: 16 }}>
            Benvenuto in PB TAX
          </div>
          <h1 style={{ fontSize: 'clamp(26px,3.4vw,34px)', fontWeight: 800, margin: '0 0 10px', color: '#1d2b3a' }}>Completa il tuo onboarding</h1>
          <p style={{ fontSize: 16, color: '#5b6570', margin: 0 }}>Carica i documenti necessari per avviare la gestione della tua società.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
          {REQUIRED_DOCS.map(doc => (
            <div key={doc.key} style={{ background: '#fff', border: `1.5px solid ${files[doc.key] ? '#a9885e' : '#e6dfd2'}`, borderRadius: 14, padding: '18px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: files[doc.key] ? 8 : 12 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1d2b3a' }}>{doc.label}</div>
                  {!doc.required && <div style={{ fontSize: 12, color: '#8a93a0', marginTop: 2 }}>Opzionale</div>}
                </div>
                {files[doc.key] && (
                  <button onClick={() => setFiles(f => { const n = { ...f }; delete n[doc.key]; return n })} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#8a93a0', padding: '0 4px' }}>✕</button>
                )}
              </div>
              {files[doc.key] ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                  <span style={{ color: '#2f8a5b', fontWeight: 700 }}>✓</span>
                  <span style={{ color: '#1d2b3a', fontWeight: 500 }}>{files[doc.key].name}</span>
                  <span style={{ color: '#8a93a0', fontSize: 12 }}>({(files[doc.key].size / 1024).toFixed(0)} KB)</span>
                </div>
              ) : (
                <div
                  style={{ border: `2px dashed ${dragging === doc.key ? '#a9885e' : '#e6dfd2'}`, borderRadius: 10, padding: '16px', textAlign: 'center', cursor: 'pointer', background: dragging === doc.key ? '#faf8f3' : 'transparent', transition: 'all .15s' }}
                  onDragOver={e => { e.preventDefault(); setDragging(doc.key) }}
                  onDragLeave={() => setDragging(null)}
                  onDrop={e => handleDrop(doc.key, e)}
                  onClick={() => { const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.pdf,.jpg,.jpeg,.png'; inp.onchange = (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) handleFile(doc.key, f) }; inp.click() }}
                >
                  <div style={{ fontSize: 13, color: '#8a93a0' }}>Trascina qui o <span style={{ color: '#a9885e', fontWeight: 600 }}>clicca per caricare</span></div>
                  <div style={{ fontSize: 12, color: '#b0a898', marginTop: 4 }}>PDF, JPG, PNG · max 10MB</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: '#3a4550', marginBottom: 7 }}>Software contabile attualmente usato (opzionale)</label>
            <input value={software} onChange={e => setSoftware(e.target.value)} placeholder="es. QuickBooks, Zoho Books, nessuno..." style={{ width: '100%', padding: '14px 16px', border: '1.5px solid #e6dfd2', borderRadius: 11, fontSize: 15, fontFamily: 'inherit', background: '#fff', color: '#1d2b3a', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: '#3a4550', marginBottom: 7 }}>Note aggiuntive (opzionale)</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Qualsiasi informazione utile al team PB TAX..." style={{ width: '100%', padding: '14px 16px', border: '1.5px solid #e6dfd2', borderRadius: 11, fontSize: 15, fontFamily: 'inherit', background: '#fff', color: '#1d2b3a', outline: 'none', boxSizing: 'border-box', resize: 'none' }} />
          </div>
        </div>

        <button onClick={handleSubmit} disabled={submitting} style={{ width: '100%', background: '#1d2b3a', color: '#fff', border: 'none', cursor: submitting ? 'wait' : 'pointer', fontSize: 17, fontWeight: 700, padding: 17, borderRadius: 13, boxShadow: '0 6px 18px rgba(29,43,58,.24)', font: 'inherit', opacity: submitting ? 0.6 : 1 }}>
          {submitting ? 'Invio in corso...' : 'Invia documenti al team PB TAX →'}
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16, fontSize: 12.5, color: '#8a93a0' }}>
          <span>Upload sicuro</span>
          <span>·</span>
          <span>Storage privato</span>
          <span>·</span>
          <span>Risposta entro 48h</span>
        </div>
      </main>
      <Footer />
    </>
  )
}
