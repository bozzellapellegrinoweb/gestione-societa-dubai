import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ background: '#16212d', color: '#cdd5dd' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(44px,5vw,64px) clamp(18px,4vw,40px) 34px' }}>
        <div style={{ display: 'flex', gap: 'clamp(28px,5vw,64px)', flexWrap: 'wrap' as const, justifyContent: 'space-between', marginBottom: 40 }}>
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <Image src="/pbtax-logo.png" alt="PB TAX International" width={100} height={37} style={{ height: 34, width: 'auto', filter: 'brightness(1.8)' }} />
              <span style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: 12, display: 'flex', alignItems: 'center' }}>
                <Image src="/indubai-logo.png" alt="InDubai.it" width={70} height={26} style={{ height: 22, width: 'auto', filter: 'brightness(2.5)' }} />
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#8a96a3', margin: 0 }}>
              Un servizio PB TAX International Tax Consultants — Dubai. Fondato dall&apos;Avv. Pellegrino Bozzella, fondatore anche di <a href="https://www.indubai.it" target="_blank" rel="noopener noreferrer" style={{ color: '#a9885e', textDecoration: 'none' }}>InDubai.it</a>.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'clamp(28px,5vw,64px)', flexWrap: 'wrap' as const }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', textTransform: 'uppercase' as const, letterSpacing: '.08em', marginBottom: 16 }}>Servizio</div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 11, fontSize: 14 }}>
                <Link href="/pacchetti" style={{ color: '#aab4c0', textDecoration: 'none' }}>Pacchetti</Link>
                <Link href="/configuratore" style={{ color: '#aab4c0', textDecoration: 'none' }}>Configuratore</Link>
                <Link href="/pacchetti#corporate-tax" style={{ color: '#aab4c0', textDecoration: 'none' }}>Corporate Tax UAE</Link>
                <Link href="/pacchetti#vat" style={{ color: '#aab4c0', textDecoration: 'none' }}>VAT &amp; Compliance</Link>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', textTransform: 'uppercase' as const, letterSpacing: '.08em', marginBottom: 16 }}>PB TAX</div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 11, fontSize: 14 }}>
                <Link href="/chi-siamo" style={{ color: '#aab4c0', textDecoration: 'none' }}>Chi siamo</Link>
                <Link href="/chi-siamo" style={{ color: '#aab4c0', textDecoration: 'none' }}>Contatti</Link>
                <Link href="https://wa.me/971585971575" target="_blank" style={{ color: '#aab4c0', textDecoration: 'none' }}>WhatsApp</Link>
                <Link href="https://www.indubai.it/blog" target="_blank" style={{ color: '#aab4c0', textDecoration: 'none' }}>Blog</Link>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: 14, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: 13, color: '#7c8896' }}>
          <span>&copy; 2026 PB TAX International Tax Consultants &middot; Dubai, UAE</span>
          <span style={{ display: 'flex', gap: 20, flexWrap: 'wrap' as const }}>
            <Link href="/privacy-policy" style={{ color: '#7c8896', textDecoration: 'none' }}>Privacy</Link>
            <Link href="/termini-di-servizio" style={{ color: '#7c8896', textDecoration: 'none' }}>Termini</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
