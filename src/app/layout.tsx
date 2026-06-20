import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'PB TAX International — Gestione contabile per società a Dubai',
  description: 'Commercialista italiano a Dubai. Contabilità, Corporate Tax, VAT, gestione visti per società Free Zone e Mainland negli Emirati Arabi Uniti. PB TAX International Tax Consultants.',
  keywords: 'contabilità Dubai, commercialista italiano Dubai, gestione società Dubai, corporate tax Dubai, VAT Dubai italiano',
  openGraph: {
    title: 'PB TAX International — La gestione della tua società a Dubai, team italiano',
    description: 'Contabilità, Corporate Tax, VAT e compliance per società negli Emirati Arabi Uniti. PB TAX International Tax Consultants.',
    url: 'https://societa-dubai.it',
    siteName: 'PB TAX International',
    locale: 'it_IT',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={inter.variable}>
      <body className="min-h-screen antialiased">{children}</body>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-GLJ6SEB12P" strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-GLJ6SEB12P');
      `}</Script>
    </html>
  )
}
