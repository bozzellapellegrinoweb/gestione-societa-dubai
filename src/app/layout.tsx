import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const WA_NUMBER = '971585971575'
const WA_TEXT =
  'Salve, ho visto che offrite il servizio di contabilità e gestione. Posso avere maggiori informazioni o fissare una videochiamata?'
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`

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
      <body className="min-h-screen antialiased">
        {children}
        <a
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          id="pbtax-wa-float"
          aria-label="Scrivici su WhatsApp"
        >
          <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false">
            <path
              fill="#fff"
              d="M16 .6C7.5.6.6 7.5.6 16c0 2.8.7 5.4 2 7.7L.4 31.6l8.1-2.1c2.2 1.2 4.7 1.9 7.5 1.9 8.5 0 15.4-6.9 15.4-15.4S24.5.6 16 .6zm0 28c-2.5 0-4.8-.7-6.8-1.8l-.5-.3-4.8 1.3 1.3-4.7-.3-.5C3.8 20.8 3 18.5 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13-5.8 12.6-13 12.6zm7.1-9.4c-.4-.2-2.3-1.1-2.6-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.3-2.1-2.7-.2-.4 0-.6.2-.8.2-.2.4-.4.5-.7.2-.2.2-.4.4-.6.1-.3 0-.5 0-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.6-.7-.9-.7h-.7c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9 0 1.7 1.2 3.4 1.4 3.6.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .8.8.3 1.6.2 2.2.1.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.1-.3-.2-.7-.4z"
            />
          </svg>
          <span className="pbtax-wa-label">Scrivici su WhatsApp</span>
        </a>
        <style>{`
          #pbtax-wa-float {
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 60;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: #25D366;
            color: #fff;
            text-decoration: none;
            padding: 12px 18px 12px 14px;
            border-radius: 50px;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 15px;
            font-weight: 600;
            line-height: 1;
            box-shadow: 0 6px 20px rgba(0,0,0,.22);
            transition: transform .15s ease, box-shadow .15s ease;
          }
          #pbtax-wa-float:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 26px rgba(0,0,0,.28);
          }
          #pbtax-wa-float svg { flex: 0 0 auto; }
          @media (max-width: 640px) {
            #pbtax-wa-float { padding: 14px; border-radius: 50%; }
            #pbtax-wa-float .pbtax-wa-label { display: none; }
          }
        `}</style>
      </body>
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
