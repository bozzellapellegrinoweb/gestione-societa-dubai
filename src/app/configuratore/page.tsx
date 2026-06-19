import ConfiguratorWizard from '@/components/configurator/ConfiguratorWizard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configuratore — Trova il tuo piano · societa-dubai.it',
  description: 'Rispondi a 10 domande sulla tua società a Dubai e scopri il piano giusto per te in 3 minuti.',
}

export default function ConfiguratorePage() {
  return <ConfiguratorWizard />
}
