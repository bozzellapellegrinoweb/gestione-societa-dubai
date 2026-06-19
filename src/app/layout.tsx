import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'societa-dubai.it — Gestione contabile per società a Dubai in italiano',
  description: 'Commercialista italiano a Dubai. Contabilità, Corporate Tax, VAT, gestione visti per società Free Zone e Mainland negli Emirati Arabi Uniti. Powered by PB TAX International.',
  keywords: 'contabilità Dubai, commercialista italiano Dubai, gestione società Dubai, corporate tax Dubai, VAT Dubai italiano',
  openGraph: {
    title: 'societa-dubai.it — La gestione della tua società a Dubai, finalmente in italiano',
    description: 'Contabilità, Corporate Tax, VAT e compliance per società negli Emirati Arabi Uniti. Powered by PB TAX International.',
    url: 'https://societa-dubai.it',
    siteName: 'societa-dubai.it',
    locale: 'it_IT',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={inter.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
