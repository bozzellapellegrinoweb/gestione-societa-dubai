'use client'
import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle, AlertTriangle, ArrowRight, Phone } from 'lucide-react'
import { Plan, Addon } from '@/lib/pricing'
import { Alert } from '@/lib/types'
import { formatAED, formatEUR } from '@/lib/utils'

interface Props {
  plan: Plan
  addons: Addon[]
  alerts: Alert[]
  contact: { full_name: string; email: string; phone: string; company_name: string; free_zone?: string }
}

export default function ResultCard({ plan, addons, alerts, contact }: Props) {
  const [loading, setLoading] = useState(false)
  const isEnterprise = plan.key === 'ENTERPRISE'
  const [enterpriseSubmitted, setEnterpriseSubmitted] = useState(false)

  const quantifiableAddons = addons.filter(a => a.priceAED !== null)
  const quoteAddons = addons.filter(a => a.priceAED === null)

  async function handleActivate() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: plan.key, addons: addons.map(a => a.key), contact }),
      })
      const data = await res.json()
      if (data.redirect_url) window.location.href = data.redirect_url
      else alert('Errore nel checkout. Contattaci su WhatsApp.')
    } catch {
      alert('Errore nel checkout. Contattaci su WhatsApp.')
    }
    setLoading(false)
  }

  async function handleEnterpriseContact() {
    setEnterpriseSubmitted(true)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-gold text-sm font-bold uppercase tracking-wider mb-2">✅ Preventivo pronto</div>
        <h2 className="text-3xl font-bold text-cream">Il tuo piano personalizzato</h2>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.3)' }}>
        {/* Header piano */}
        <div className="p-6" style={{ background: 'linear-gradient(135deg, rgba(169,136,94,0.2), rgba(201,168,76,0.1))' }}>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1">Piano selezionato</div>
              <div className="text-2xl font-bold text-cream">{plan.label}</div>
              <div className="text-gray-soft text-sm mt-1">{plan.description}</div>
            </div>
            {!isEnterprise && plan.priceAED && (
              <div className="text-right">
                <div className="text-3xl font-bold text-gold">{formatAED(plan.priceAED)}</div>
                <div className="text-xs text-gray-soft">{formatEUR(plan.priceAED)} · /mese</div>
              </div>
            )}
            {isEnterprise && (
              <div className="text-right">
                <div className="text-xl font-bold text-gold">Piano su misura</div>
                <div className="text-xs text-gray-soft">Preventivo dedicato</div>
              </div>
            )}
          </div>
        </div>

        {/* Servizi inclusi */}
        <div className="p-6 border-t" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
          <div className="font-semibold text-cream mb-3 text-sm uppercase tracking-wider">Servizi inclusi</div>
          <ul className="space-y-2">
            {plan.features.map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-cream">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Add-on */}
        {addons.length > 0 && (
          <div className="p-6 border-t" style={{ borderColor: 'rgba(201,168,76,0.1)', background: 'rgba(255,255,255,0.02)' }}>
            <div className="font-semibold text-cream mb-3 text-sm uppercase tracking-wider">Add-on selezionati</div>
            <ul className="space-y-2">
              {quantifiableAddons.map(a => (
                <li key={a.key} className="flex justify-between text-sm">
                  <span className="text-cream">+ {a.label}</span>
                  <span className="text-gold font-semibold">{a.priceLabel}</span>
                </li>
              ))}
              {quoteAddons.map(a => (
                <li key={a.key} className="flex justify-between text-sm">
                  <span className="text-cream">+ {a.label}</span>
                  <span className="text-gray-soft">{a.priceLabel}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Alert personalizzati */}
        {alerts.length > 0 && (
          <div className="p-6 border-t" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
            <div className="font-semibold text-cream mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle size={14} className="text-gold" /> Note personalizzate
            </div>
            <ul className="space-y-2">
              {alerts.map(a => (
                <li key={a.code} className="flex items-start gap-2 text-sm text-gray-soft">
                  <span className="text-gold mt-0.5">·</span>
                  {a.text}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="p-6 border-t" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
          {!isEnterprise ? (
            <>
              <button onClick={handleActivate} disabled={loading} className="w-full py-4 rounded-xl font-bold text-navy text-lg transition-all hover:opacity-90 disabled:opacity-50 mb-3" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
                {loading ? 'Reindirizzamento...' : `Attiva il piano ${plan.label} →`}
              </button>
              <Link href="https://wa.me/971585025012" target="_blank" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-cream text-sm transition-all hover:bg-white/5" style={{ borderColor: 'rgba(201,168,76,0.3)' }}>
                <Phone size={16} /> Hai domande? Scrivici su WhatsApp
              </Link>
            </>
          ) : (
            <>
              {!enterpriseSubmitted ? (
                <>
                  <div className="p-4 rounded-xl mb-4" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
                    <p className="text-cream text-sm leading-relaxed">
                      Con oltre 500 transazioni mensili, costruiamo insieme un piano su misura. Il tuo lead è stato inviato al team PB TAX. Ti contatteremo entro 24 ore.
                    </p>
                  </div>
                  <button onClick={handleEnterpriseContact} className="w-full py-4 rounded-xl font-bold text-navy text-lg transition-all hover:opacity-90 mb-3" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
                    Confermo — ricontattami entro 24h
                  </button>
                </>
              ) : (
                <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}>
                  <div className="text-2xl mb-2">✅</div>
                  <p className="text-cream font-semibold">Richiesta inviata!</p>
                  <p className="text-gray-soft text-sm mt-1">Ti contatteremo entro 24 ore al numero {contact.phone}</p>
                </div>
              )}
              <Link href="https://wa.me/971585025012" target="_blank" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-cream text-sm transition-all hover:bg-white/5 mt-3" style={{ borderColor: 'rgba(201,168,76,0.3)' }}>
                <Phone size={16} /> Oppure scrivici su WhatsApp ora
              </Link>
            </>
          )}
          <p className="text-xs text-gray-soft text-center mt-3 italic">
            I prezzi sono orientativi e non costituiscono offerta contrattuale. Il preventivo definitivo sarà confermato da PB TAX.
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link href="/pacchetti" className="text-gold hover:opacity-80 transition-opacity text-sm">
          Confronta tutti i pacchetti <ArrowRight size={12} className="inline" />
        </Link>
      </div>
    </div>
  )
}
