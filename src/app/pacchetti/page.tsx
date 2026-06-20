import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pacchetti e Prezzi — Contabilità Dubai · PB TAX International',
  description: 'Confronta tutti i piani di gestione contabile per società a Dubai. Da 500 AED/mese. Free Zone, Mainland, Offshore.',
}

const planNames = ['BASIC', 'ENTRY LEVEL', 'PRO', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND']
const planPrices = ['500', '800', '1.200', '1.500', '1.800', '2.000', 'Su misura']
const planUnits = ['AED/mese', 'AED/mese', 'AED/mese', 'AED/mese', 'AED/mese', 'AED/mese', '']

type TableRow = { label: string; vals: string[] }
const Y = '✓', N = '—'
const tableRows: TableRow[] = [
  { label: 'Contabilità mensile', vals: ['25', '50', '100', '150', '300', '500', '500+'] },
  { label: 'Corporate Tax Return', vals: [Y, Y, Y, Y, Y, Y, Y] },
  { label: 'VAT Return', vals: [N, Y, Y, Y, Y, Y, Y] },
  { label: 'Gestione visti', vals: [N, N, N, Y, Y, Y, Y] },
  { label: 'Consulenza Italia-UAE', vals: [N, Y, Y, Y, Y, Y, Y] },
  { label: 'Account manager dedicato', vals: [N, N, Y, Y, Y, Y, Y] },
  { label: 'Gruppo WhatsApp operativo', vals: [Y, Y, Y, Y, Y, Y, Y] },
  { label: 'Aggiornamenti legali', vals: [Y, Y, Y, Y, Y, Y, Y] },
]

const addons = [
  { name: 'Bilancio annuale', desc: 'Redazione e deposito del bilancio annuale della società.', price: '2.500 AED', unit: 'una tantum / anno' },
  { name: 'Gestione visti', desc: 'Pratica o rinnovo visto, gestita per te.', price: 'Da definire', unit: 'su richiesta' },
  { name: 'Report ESR', desc: 'Economic Substance Regulations, dove richiesto.', price: 'Da definire', unit: 'su richiesta' },
  { name: 'Consulenza CFC / Quadro RW', desc: 'Supporto sulla compliance fiscale italiana.', price: 'Da definire', unit: 'su richiesta' },
]

export default function PacchettiPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(40px,5vw,64px) clamp(18px,4vw,40px) 80px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,4vw,48px)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#a9885e', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>Tutti i pacchetti</div>
          <h1 style={{ fontSize: 'clamp(30px,4vw,46px)', fontWeight: 800, letterSpacing: '-0.025em', margin: '0 0 12px' }}>Scegli il piano per la tua società</h1>
          <p style={{ fontSize: 17, color: '#5b6570', margin: 0 }}>Prezzi mensili in AED, IVA 5% inclusa. Cambi piano quando vuoi.</p>
        </div>

        {/* Comparison table */}
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', border: '1px solid #e6dfd2', borderRadius: 18, background: '#fff' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 920 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '22px 20px', verticalAlign: 'bottom', position: 'sticky', left: 0, background: '#fff', minWidth: 180, zIndex: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#8a93a0' }}>Confronta i piani</span>
                </th>
                {planNames.map((name, i) => {
                  const pop = name === 'PRO'
                  return (
                    <th key={name} style={{ padding: '20px 16px', verticalAlign: 'bottom', borderLeft: '1px solid #f0ebe0', background: pop ? '#faf6ee' : '#fff', minWidth: 138 }}>
                      {pop && (
                        <div style={{ display: 'inline-block', background: '#a9885e', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 999, marginBottom: 8, letterSpacing: '.03em' }}>Più scelto</div>
                      )}
                      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.05em', color: '#1d2b3a' }}>{name}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 6 }}>{planPrices[i]}</div>
                      <div style={{ fontSize: 11.5, color: '#8a93a0', fontWeight: 500 }}>{planUnits[i]}</div>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {tableRows.map(row => (
                <tr key={row.label} style={{ borderTop: '1px solid #f0ebe0' }}>
                  <td style={{ padding: '16px 20px', fontSize: 14, fontWeight: 600, color: '#3a4550', position: 'sticky', left: 0, background: '#fff', zIndex: 1 }}>{row.label}</td>
                  {row.vals.map((v, i) => {
                    const pop = planNames[i] === 'PROFESSIONAL'
                    const isCheck = v === Y
                    const isNo = v === N
                    return (
                      <td key={i} style={{ padding: '16px 16px', textAlign: 'center', borderLeft: '1px solid #f0ebe0', fontSize: 13.5, fontWeight: isCheck || isNo ? 700 : 600, color: isNo ? '#c2bbac' : isCheck ? '#2f8a5b' : '#3a4550', background: pop ? '#faf6ee' : '#fff' }}>
                        {v}
                      </td>
                    )
                  })}
                </tr>
              ))}
              <tr style={{ borderTop: '1px solid #f0ebe0' }}>
                <td style={{ padding: '18px 20px', position: 'sticky', left: 0, background: '#fff', zIndex: 1 }} />
                {planNames.map((name, i) => {
                  const pop = name === 'PRO'
                  const isEnt = name === 'DIAMOND'
                  return (
                    <td key={name} style={{ padding: '18px 12px', textAlign: 'center', borderLeft: '1px solid #f0ebe0', background: pop ? '#faf6ee' : '#fff' }}>
                      <Link href="/configuratore" style={{ display: 'block', background: isEnt ? '#fff' : pop ? '#1d2b3a' : '#efe7d8', color: isEnt ? '#1d2b3a' : pop ? '#fff' : '#1d2b3a', border: isEnt ? '1.5px solid #d8cfbf' : 'none', fontSize: 13, fontWeight: 600, padding: '9px 14px', borderRadius: 9, textDecoration: 'none', textAlign: 'center' }}>
                        {isEnt ? 'Contattaci' : 'Scegli'}
                      </Link>
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* VAT notice */}
        <div style={{ display: 'flex', gap: 12, background: '#fbf9f3', border: '1px solid #e3d6bd', borderRadius: 12, padding: '14px 18px', marginTop: 16 }}>
          <span style={{ flexShrink: 0, color: '#b8860b', marginTop: 1 }}>⚠</span>
          <p style={{ fontSize: 13.5, lineHeight: 1.55, color: '#7a6234', margin: 0 }}>
            Il piano <strong>BASIC (500 AED)</strong> è valido solo sotto la soglia VAT di 375.000 AED. Superata la soglia, il piano parte da <strong>ENTRY LEVEL (800 AED)</strong>, con dichiarazione VAT sempre inclusa.
          </p>
        </div>

        {/* Una tantum */}
        <div style={{ marginTop: 'clamp(36px,5vw,56px)' }}>
          <h2 style={{ fontSize: 'clamp(22px,2.6vw,30px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 6px' }}>Servizi una tantum</h2>
          <p style={{ fontSize: 15.5, color: '#5b6570', margin: '0 0 24px' }}>Servizi annuali una tantum, non in abbonamento. Li attivi solo quando ti servono.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
            {addons.map(a => (
              <div key={a.name} style={{ background: '#fff', border: '1px solid #e6dfd2', borderRadius: 14, padding: 22 }}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{a.name}</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: '#5b6570', marginBottom: 14 }}>{a.desc}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 17, fontWeight: 800, color: '#a9885e' }}>{a.price}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: '#9a8a72' }}>{a.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
