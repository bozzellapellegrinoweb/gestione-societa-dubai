import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t mt-24" style={{ borderColor: 'rgba(201,168,76,0.15)', background: 'rgba(0,0,0,0.2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="font-bold text-2xl text-cream mb-2">societa-dubai<span className="text-gold">.it</span></div>
            <div className="text-gold-muted text-sm mb-3">by PB TAX International Tax Consultants FZCO</div>
            <p className="text-gray-soft text-sm leading-relaxed">
              La gestione della tua società a Dubai, finalmente in italiano. 450+ aziende gestite. Platinum Tower, JLT, Dubai.
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="https://wa.me/971585025012" target="_blank" className="text-sm text-gold hover:opacity-80 transition-opacity">
                📱 WhatsApp +971 585025012
              </Link>
            </div>
          </div>
          <div>
            <div className="font-semibold text-cream mb-3 text-sm uppercase tracking-wider">Servizi</div>
            <ul className="space-y-2 text-sm text-gray-soft">
              <li><Link href="/configuratore" className="hover:text-gold transition-colors">Configuratore</Link></li>
              <li><Link href="/pacchetti" className="hover:text-gold transition-colors">Pacchetti e prezzi</Link></li>
              <li><Link href="/chi-siamo" className="hover:text-gold transition-colors">Chi siamo</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-cream mb-3 text-sm uppercase tracking-wider">Legale</div>
            <ul className="space-y-2 text-sm text-gray-soft">
              <li><Link href="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/termini-di-servizio" className="hover:text-gold transition-colors">Termini di servizio</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
          <p className="text-xs text-gray-soft">
            © 2026 PB TAX International Tax Consultants FZCO · DMCC License No. DMCC-996944 · TRN: 105333005400001
          </p>
          <p className="text-xs text-gray-soft italic">
            I prezzi del configuratore sono orientativi e non costituiscono offerta contrattuale.
          </p>
        </div>
      </div>
    </footer>
  )
}
