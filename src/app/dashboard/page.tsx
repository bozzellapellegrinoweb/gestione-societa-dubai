import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Area Cliente · societa-dubai.it' }

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(40px,5vw,64px) clamp(18px,4vw,40px) 80px' }}>

        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 'clamp(28px,3.4vw,38px)', fontWeight: 800, margin: '0 0 8px', color: '#1d2b3a' }}>Area Cliente</h1>
          <p style={{ fontSize: 16, color: '#5b6570', margin: 0 }}>Gestisci il tuo contratto, i documenti e le fatture.</p>
        </div>

        {/* Stato contratto */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Piano attivo', value: 'Piano Pro', sub: '1.200 AED/mese', color: '#a9885e' },
            { label: 'Stato contratto', value: 'Attivo', sub: 'Dal 01/06/2026', color: '#2f8a5b' },
            { label: 'Prossimo rinnovo', value: '01/07/2026', sub: 'Pagamento automatico', color: '#1d2b3a' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#fff', border: '1px solid #e6dfd2', borderRadius: 16, padding: '22px 20px' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#8a93a0', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>{stat.label}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: '#a9885e', fontWeight: 500, marginTop: 4 }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 32 }}>
          {[
            { label: 'Documenti', desc: 'Carica e visualizza documenti', href: '#' },
            { label: 'Fatture', desc: 'Storico pagamenti e fatture', href: '#' },
            { label: 'Profilo', desc: 'Modifica i tuoi dati', href: '#' },
            { label: 'Supporto', desc: 'Contatta il team PB TAX', href: 'https://wa.me/971585025012' },
          ].map(item => (
            <Link key={item.label} href={item.href} style={{ background: '#fff', border: '1px solid #e6dfd2', borderRadius: 14, padding: '20px', textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1d2b3a', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 13, color: '#8a93a0' }}>{item.desc}</div>
            </Link>
          ))}
        </div>

        {/* Notice */}
        <div style={{ background: '#faf8f3', border: '1px solid #e6dfd2', borderRadius: 16, padding: '24px 26px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1d2b3a', marginBottom: 8 }}>Dashboard in fase di sviluppo</div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: '#5b6570', margin: '0 0 16px' }}>
            La dashboard completa con gestione documenti, fatture e profilo è in fase di implementazione. Per qualsiasi necessità, contattaci direttamente.
          </p>
          <Link href="https://wa.me/971585025012" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1d2b3a', color: '#fff', fontSize: 14, fontWeight: 600, padding: '12px 20px', borderRadius: 10, textDecoration: 'none' }}>
            Contatta il tuo account manager →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
