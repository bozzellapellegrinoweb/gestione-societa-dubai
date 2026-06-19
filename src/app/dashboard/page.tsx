import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { FileText, CreditCard, User, LayoutDashboard } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard Cliente · societa-dubai.it' }

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cream mb-1">Area Cliente</h1>
          <p className="text-gray-soft">Gestisci il tuo contratto, i documenti e le fatture.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <LayoutDashboard size={18} />, label: 'Overview', href: '/dashboard' },
            { icon: <FileText size={18} />, label: 'Documenti', href: '/dashboard/documenti' },
            { icon: <CreditCard size={18} />, label: 'Fatture', href: '/dashboard/fatture' },
            { icon: <User size={18} />, label: 'Profilo', href: '/dashboard/profilo' },
          ].map(item => (
            <Link key={item.label} href={item.href} className="flex items-center gap-2 p-4 rounded-xl font-semibold text-sm text-cream transition-all hover:border-gold/40" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <span className="text-gold">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Stato contratto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Piano attivo', value: 'Piano Pro', sub: '1.200 AED/mese' },
            { label: 'Stato contratto', value: 'Attivo ✅', sub: 'Dal 01/06/2026' },
            { label: 'Prossimo rinnovo', value: '01/07/2026', sub: 'Pagamento automatico' },
          ].map(stat => (
            <div key={stat.label} className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}>
              <div className="text-xs text-gray-soft uppercase tracking-wider mb-1">{stat.label}</div>
              <div className="font-bold text-cream text-lg">{stat.value}</div>
              <div className="text-xs text-gold">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-xl" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <p className="text-cream text-sm mb-3">
            <strong>Nota:</strong> La dashboard completa con documenti, fatture e profilo è in fase di implementazione. Per qualsiasi necessità, contattaci direttamente.
          </p>
          <Link href="https://wa.me/971585025012" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-navy text-sm" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
            💬 Contatta il tuo account manager
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
