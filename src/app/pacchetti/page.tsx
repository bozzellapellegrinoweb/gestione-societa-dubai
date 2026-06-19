import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { PLANS, ADDONS } from '@/lib/pricing'
import { formatAED, formatEUR } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pacchetti e Prezzi — Contabilità Dubai · societa-dubai.it',
  description: 'Confronta tutti i piani di gestione contabile per società a Dubai. Da 500 AED/mese. Free Zone, Mainland, Offshore. Powered by PB TAX International.',
}

const features = [
  'Contabilità mensile',
  'Corporate Tax Return annuale',
  'Comunicazione in italiano',
  'Account manager dedicato',
  'Reportistica mensile',
  'Verifica compliance annuale',
  'Riconciliazione bancaria avanzata',
  'Budget & forecasting trimestrale',
  'CFO on-demand (2h/mese)',
]

const planFeatureMap: Record<string, boolean[]> = {
  ESSENTIAL:     [true, true, true, true, true, false, false, false, false],
  SMART:         [true, true, true, true, true, false, false, false, false],
  PROFESSIONAL:  [true, true, true, true, true, true,  false, false, false],
  BUSINESS:      [true, true, true, true, true, true,  true,  false, false],
  PREMIUM:       [true, true, true, true, true, true,  true,  true,  false],
  CORPORATE:     [true, true, true, true, true, true,  true,  true,  true],
  ENTERPRISE:    [true, true, true, true, true, true,  true,  true,  true],
}

export default function PacchettiPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cream mb-4">Pacchetti e Prezzi</h1>
          <p className="text-gray-soft text-lg max-w-2xl mx-auto">Piani mensili ricorrenti in AED (Dirham emiratino). Nessun costo nascosto. Cancellabile con 30 giorni di preavviso.</p>
        </div>

        {/* Tabella piani */}
        <div className="overflow-x-auto mb-16">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr>
                <th className="text-left p-4 text-gray-soft text-sm font-medium w-48">Servizio incluso</th>
                {PLANS.map((plan, i) => (
                  <th key={plan.key} className="p-4 text-center" style={{ background: i === 2 ? 'rgba(201,168,76,0.08)' : 'transparent' }}>
                    {i === 2 && <div className="text-xs text-gold font-bold mb-1">⭐ PIÙ SCELTO</div>}
                    <div className="font-bold text-cream">{plan.label}</div>
                    {plan.priceAED ? (
                      <>
                        <div className="text-gold font-bold text-lg">{formatAED(plan.priceAED)}</div>
                        <div className="text-xs text-gray-soft">{formatEUR(plan.priceAED)}/mese</div>
                      </>
                    ) : (
                      <div className="text-gold font-bold text-sm">Da pattuire</div>
                    )}
                    <div className="text-xs text-gray-soft mt-1">{plan.maxTransactions ? `≤ ${plan.maxTransactions} transaz.` : '> 500 transaz.'}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feat, fi) => (
                <tr key={feat} style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}>
                  <td className="p-4 text-sm text-gray-soft">{feat}</td>
                  {PLANS.map((plan, pi) => (
                    <td key={plan.key} className="p-4 text-center" style={{ background: pi === 2 ? 'rgba(201,168,76,0.04)' : 'transparent' }}>
                      {planFeatureMap[plan.key][fi] ? (
                        <CheckCircle size={16} className="text-gold mx-auto" />
                      ) : (
                        <span className="text-gray-soft text-lg">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}>
                <td className="p-4" />
                {PLANS.map((plan, i) => (
                  <td key={plan.key} className="p-4 text-center" style={{ background: i === 2 ? 'rgba(201,168,76,0.04)' : 'transparent' }}>
                    <Link href="/configuratore" className="inline-block px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:opacity-90 whitespace-nowrap" style={{ background: i === 2 ? 'linear-gradient(135deg, #a9885e, #C9A84C)' : 'rgba(201,168,76,0.15)', color: i === 2 ? '#0A1628' : '#C9A84C' }}>
                      {plan.key === 'ENTERPRISE' ? 'Contattaci' : `Attiva ${plan.label}`}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Add-on */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-cream mb-6">Servizi aggiuntivi (Add-on)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADDONS.map(addon => (
              <div key={addon.key} className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}>
                <div className="font-semibold text-cream mb-1">{addon.label}</div>
                <div className="text-gold font-bold text-lg">{addon.priceLabel}</div>
                {addon.oneTime && <div className="text-xs text-gray-soft mt-1">Servizio una-tantum</div>}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center rounded-2xl p-10" style={{ background: 'linear-gradient(135deg, rgba(169,136,94,0.12), rgba(201,168,76,0.08))', border: '1px solid rgba(201,168,76,0.25)' }}>
          <h2 className="text-2xl font-bold text-cream mb-3">Non sai quale piano scegliere?</h2>
          <p className="text-gray-soft mb-6">Il configuratore ti guida in 5 minuti e costruisce il piano esatto per la tua situazione.</p>
          <Link href="/configuratore" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-navy transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
            Vai al configuratore <ArrowRight size={18} />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
