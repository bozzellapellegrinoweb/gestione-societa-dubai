import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configuratore — Trova il tuo piano · societa-dubai.it',
  description: 'Rispondi a 9 domande sulla tua società a Dubai e scopri il piano giusto per te in 3 minuti.',
}

export default function ConfiguratoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
