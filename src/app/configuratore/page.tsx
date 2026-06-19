import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ConfiguratorWizard from '@/components/configurator/ConfiguratorWizard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configuratore — Trova il tuo piano contabile per Dubai · societa-dubai.it',
  description: 'Configura il tuo piano di gestione contabile per la tua società a Dubai in 5 minuti. Powered by PB TAX International.',
}

export default function ConfiguratorePage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}>
            ⚙️ Configuratore Interattivo
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-cream mb-3">Trova il piano giusto per la tua società</h1>
          <p className="text-gray-soft">10 domande · ~5 minuti · Preventivo personalizzato immediato</p>
        </div>
        <ConfiguratorWizard />
      </main>
      <Footer />
    </>
  )
}
