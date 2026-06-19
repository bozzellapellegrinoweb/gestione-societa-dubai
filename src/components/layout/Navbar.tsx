'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(245,242,236,0.88)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e6dfd2' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '12px clamp(18px,4vw,40px)', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <Image src="/pbtax-logo.svg" alt="PB TAX International" width={140} height={36} priority style={{ height: 36, width: 'auto' }} />
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: '#1d2b3a', borderLeft: '1px solid #ddd4c4', paddingLeft: 12 }}>societa-dubai.it</span>
        </Link>

        <nav style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginLeft: 'auto', alignItems: 'center' }} className="hidden md:flex">
          <Link href="/" style={{ background: 'none', fontSize: 14.5, fontWeight: 500, color: '#4a5560', padding: '8px 12px', borderRadius: 8, textDecoration: 'none' }}>Home</Link>
          <Link href="/pacchetti" style={{ background: 'none', fontSize: 14.5, fontWeight: 500, color: '#4a5560', padding: '8px 12px', borderRadius: 8, textDecoration: 'none' }}>Pacchetti</Link>
          <Link href="/chi-siamo" style={{ background: 'none', fontSize: 14.5, fontWeight: 500, color: '#4a5560', padding: '8px 12px', borderRadius: 8, textDecoration: 'none' }}>Chi siamo</Link>
          <Link href="/configuratore" style={{ background: '#1d2b3a', fontSize: 14.5, fontWeight: 600, color: '#fff', padding: '10px 18px', borderRadius: 9, textDecoration: 'none', boxShadow: '0 1px 2px rgba(29,43,58,.2)' }}>
            Calcola il tuo piano
          </Link>
        </nav>

        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#1d2b3a' }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div style={{ padding: '0 18px 16px', display: 'flex', flexDirection: 'column', gap: 4, background: 'rgba(245,242,236,0.98)', borderTop: '1px solid #e6dfd2' }}>
          <Link href="/" style={{ fontSize: 15, fontWeight: 500, color: '#1d2b3a', padding: '12px 4px', borderBottom: '1px solid #e6dfd2', textDecoration: 'none' }} onClick={() => setOpen(false)}>Home</Link>
          <Link href="/pacchetti" style={{ fontSize: 15, fontWeight: 500, color: '#1d2b3a', padding: '12px 4px', borderBottom: '1px solid #e6dfd2', textDecoration: 'none' }} onClick={() => setOpen(false)}>Pacchetti</Link>
          <Link href="/chi-siamo" style={{ fontSize: 15, fontWeight: 500, color: '#1d2b3a', padding: '12px 4px', borderBottom: '1px solid #e6dfd2', textDecoration: 'none' }} onClick={() => setOpen(false)}>Chi siamo</Link>
          <Link href="/configuratore" style={{ marginTop: 8, background: '#1d2b3a', color: '#fff', fontSize: 15, fontWeight: 600, padding: '14px', borderRadius: 10, textDecoration: 'none', textAlign: 'center' }} onClick={() => setOpen(false)}>
            Calcola il tuo piano
          </Link>
        </div>
      )}
    </header>
  )
}
