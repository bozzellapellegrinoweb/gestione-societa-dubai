'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: 'rgba(10,22,40,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(201,168,76,0.15)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight text-cream">societa-dubai<span className="text-gold">.it</span></span>
          <span className="hidden sm:block text-xs text-gray-soft ml-2">by PB TAX International</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/configuratore" className="text-cream hover:text-gold transition-colors">Configuratore</Link>
          <Link href="/pacchetti" className="text-cream hover:text-gold transition-colors">Pacchetti</Link>
          <Link href="/chi-siamo" className="text-cream hover:text-gold transition-colors">Chi siamo</Link>
          <Link href={`https://wa.me/971585025012`} target="_blank" className="text-cream hover:text-gold transition-colors">WhatsApp</Link>
          <Link href="/configuratore" className="px-4 py-2 rounded-lg font-semibold text-navy text-sm transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
            Inizia ora →
          </Link>
        </div>

        <button className="md:hidden text-cream" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm" style={{ background: 'rgba(10,22,40,0.98)' }}>
          <Link href="/configuratore" className="text-cream py-2 border-b" style={{ borderColor: 'rgba(201,168,76,0.1)' }} onClick={() => setOpen(false)}>Configuratore</Link>
          <Link href="/pacchetti" className="text-cream py-2 border-b" style={{ borderColor: 'rgba(201,168,76,0.1)' }} onClick={() => setOpen(false)}>Pacchetti</Link>
          <Link href="/chi-siamo" className="text-cream py-2 border-b" style={{ borderColor: 'rgba(201,168,76,0.1)' }} onClick={() => setOpen(false)}>Chi siamo</Link>
          <Link href="/configuratore" className="w-full text-center px-4 py-3 rounded-lg font-semibold text-navy mt-2" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }} onClick={() => setOpen(false)}>
            Inizia ora →
          </Link>
        </div>
      )}
    </nav>
  )
}
