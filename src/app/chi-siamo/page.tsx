import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Shield, Globe, Users, Award } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi siamo — PB TAX International · societa-dubai.it',
  description: 'PB TAX International Tax Consultants FZCO. Avv. Pellegrino Bozzella. 450+ aziende italiane gestite a Dubai dal 2019. Platinum Tower, JLT, Dubai.',
}

export default function ChiSiamoPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-gold text-sm font-bold uppercase tracking-wider mb-3">PB TAX International</div>
          <h1 className="text-4xl font-bold text-cream mb-4">Il team dietro societa-dubai.it</h1>
          <p className="text-gray-soft text-lg max-w-2xl mx-auto">Dal 2019 al fianco degli imprenditori italiani negli Emirati Arabi Uniti. 450+ società gestite. Un team che parla la tua lingua.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)' }}>
            <div className="text-4xl mb-4">👨‍💼</div>
            <h2 className="text-2xl font-bold text-cream mb-2">Avv. Pellegrino Bozzella</h2>
            <div className="text-gold text-sm font-semibold mb-4">Fondatore & CEO · PB TAX International</div>
            <p className="text-gray-soft leading-relaxed mb-4">
              Avvocato italiano con specializzazione in diritto societario UAE e fiscalità internazionale. Residente a Dubai dal 2019, ha fondato PB TAX International per rispondere a una necessità concreta: gli imprenditori italiani a Dubai hanno bisogno di un professionista che capisca entrambi i sistemi fiscali.
            </p>
            <p className="text-gray-soft leading-relaxed">
              Titolare della DMCC License No. DMCC-996944, opera dalla Platinum Tower al JLT (Jumeirah Lake Towers), il cuore business di Dubai.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: <Users className="text-gold" size={20} />, title: '450+ aziende gestite', desc: 'Società Free Zone, Mainland e Offshore di imprenditori italiani negli Emirati.' },
              { icon: <Globe className="text-gold" size={20} />, title: 'Due sistemi fiscali, un unico team', desc: 'Gestiamo la compliance UAE e monitoriamo gli impatti fiscali italiani (CFC, quadro RW, IVAFE).' },
              { icon: <Shield className="text-gold" size={20} />, title: 'Partner ufficiale Free Zone', desc: 'Rapporti diretti con IFZA, DMCC, RAKEZ, Meydan e altre autorità di registrazione.' },
              { icon: <Award className="text-gold" size={20} />, title: 'Corporate Tax & VAT UAE', desc: 'Specializzati nella normativa fiscale emiratina dal 2023. Corporate Tax Return, VAT Filing, AML compliance.' },
            ].map(item => (
              <div key={item.title} className="p-5 rounded-xl flex gap-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.1)' }}>
                <div className="shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <div className="font-semibold text-cream mb-1">{item.title}</div>
                  <div className="text-gray-soft text-sm">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.1)' }}>
          <h2 className="text-2xl font-bold text-cream mb-6">Dati aziendali</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {[
              ['Ragione sociale', 'PB TAX International Tax Consultants FZCO'],
              ['DMCC License', 'DMCC-996944'],
              ['TRN (VAT)', '105333005400001'],
              ['Sede operativa', 'Platinum Tower Unit 2503, JLT, Dubai, UAE'],
              ['WhatsApp', '+971 585025012'],
              ['Sito principale', 'InDubai.it'],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-gray-soft text-xs uppercase tracking-wider mb-1">{k}</div>
                <div className="text-cream font-medium">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center rounded-2xl p-10" style={{ background: 'linear-gradient(135deg, rgba(169,136,94,0.12), rgba(201,168,76,0.08))', border: '1px solid rgba(201,168,76,0.25)' }}>
          <h2 className="text-2xl font-bold text-cream mb-3">Pronto a lavorare con noi?</h2>
          <p className="text-gray-soft mb-6">Configura il tuo piano in 5 minuti o scrivici direttamente su WhatsApp.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/configuratore" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-navy transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #a9885e, #C9A84C)' }}>
              Vai al configuratore →
            </Link>
            <Link href="https://wa.me/971585025012" target="_blank" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-cream border transition-all hover:bg-white/5" style={{ borderColor: 'rgba(201,168,76,0.3)' }}>
              💬 WhatsApp diretto
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
