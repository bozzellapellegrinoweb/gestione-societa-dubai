export type PlanKey = 'BASIC' | 'ENTRY_LEVEL' | 'PRO' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND'

export interface Plan {
  key: PlanKey
  label: string
  subtitle: string
  maxTransactions: number | null
  priceAED: number | null
  description: string
  features: string[]
}

export const PLANS: Plan[] = [
  {
    key: 'BASIC',
    label: 'Basic',
    subtitle: 'Tax Management & Compliance',
    maxTransactions: 25,
    priceAED: 500,
    description: 'Ideale per freelance, holding o società dormiente',
    features: ['Contabilità mensile (fino a 25 transazioni)', 'Corporate Tax Return annuale', 'Comunicazione 100% in italiano', 'Account manager dedicato', 'Reportistica mensile', 'Gruppo WhatsApp operativo', 'Aggiornamenti legali inclusi'],
  },
  {
    key: 'ENTRY_LEVEL',
    label: 'Entry Level',
    subtitle: 'Tax & VAT Management',
    maxTransactions: 50,
    priceAED: 800,
    description: 'Ideale per servizi e e-commerce piccolo',
    features: ['Contabilità mensile (fino a 50 transazioni)', 'Corporate Tax Return annuale', 'Dichiarazione VAT inclusa', 'Comunicazione 100% in italiano', 'Account manager dedicato', 'Reportistica mensile', 'Gruppo WhatsApp operativo', 'Aggiornamenti legali inclusi'],
  },
  {
    key: 'PRO',
    label: 'Pro',
    subtitle: 'Full Accounting & Tax',
    maxTransactions: 100,
    priceAED: 1200,
    description: 'Standard per PMI operativa',
    features: ['Contabilità mensile (fino a 100 transazioni)', 'Corporate Tax Return annuale', 'Dichiarazione VAT inclusa', 'Comunicazione 100% in italiano', 'Account manager dedicato', 'Reportistica mensile', 'Verifica compliance annuale', 'Gruppo WhatsApp operativo', 'Aggiornamenti legali inclusi'],
  },
  {
    key: 'SILVER',
    label: 'Silver',
    subtitle: 'Advanced Accounting & Advisory',
    maxTransactions: 150,
    priceAED: 1500,
    description: 'Trading attivo e più fornitori',
    features: ['Contabilità mensile (fino a 150 transazioni)', 'Corporate Tax Return annuale', 'Dichiarazione VAT inclusa', 'Comunicazione 100% in italiano', 'Account manager dedicato', 'Reportistica mensile', 'Verifica compliance annuale', 'Riconciliazione bancaria avanzata', 'Gruppo WhatsApp operativo', 'Aggiornamenti legali inclusi'],
  },
  {
    key: 'GOLD',
    label: 'Gold',
    subtitle: 'Premium Accounting & CFO Support',
    maxTransactions: 300,
    priceAED: 1800,
    description: 'Per operatività elevata',
    features: ['Contabilità mensile (fino a 300 transazioni)', 'Corporate Tax Return annuale', 'Dichiarazione VAT inclusa', 'Comunicazione 100% in italiano', 'Account manager dedicato', 'Reportistica mensile', 'Verifica compliance annuale', 'Riconciliazione bancaria avanzata', 'Budget & forecasting trimestrale', 'Gruppo WhatsApp operativo', 'Aggiornamenti legali inclusi'],
  },
  {
    key: 'PLATINUM',
    label: 'Platinum',
    subtitle: 'Corporate Full Service',
    maxTransactions: 500,
    priceAED: 2000,
    description: 'Grandi volumi — servizio completo',
    features: ['Contabilità mensile (fino a 500 transazioni)', 'Corporate Tax Return annuale', 'Dichiarazione VAT inclusa', 'Comunicazione 100% in italiano', 'Account manager dedicato', 'Reportistica mensile', 'Verifica compliance annuale', 'Riconciliazione bancaria avanzata', 'Budget & forecasting trimestrale', 'CFO on-demand (2h/mese)', 'Gruppo WhatsApp operativo', 'Aggiornamenti legali inclusi'],
  },
  {
    key: 'DIAMOND',
    label: 'Diamond',
    subtitle: 'Custom Solution',
    maxTransactions: null,
    priceAED: null,
    description: 'Piano su misura per volumi oltre 500 transazioni/mese',
    features: ['Piano completamente personalizzato', 'Team dedicato', 'Reportistica avanzata', 'CFO on-demand', 'SLA garantito', 'Supporto prioritario', 'Gruppo WhatsApp operativo', 'Aggiornamenti legali inclusi'],
  },
]

export interface Addon {
  key: string
  label: string
  priceAED: number | null
  priceLabel: string
  oneTime: boolean
}

export const ADDONS: Addon[] = [
  { key: 'vat_filing', label: 'VAT Filing annuale', priceAED: 2500, priceLabel: '2.500 AED/anno', oneTime: true },
  { key: 'audit', label: 'Audit certificato con Auditor', priceAED: 5000, priceLabel: '5.000 AED', oneTime: true },
  { key: 'trn', label: 'Abilitazione TRN (registrazione VAT)', priceAED: 2200, priceLabel: '2.200 AED', oneTime: true },
  { key: 'aml', label: 'Compliance AML / Anti-riciclaggio', priceAED: null, priceLabel: '3.000–8.000 AED (preventivo)', oneTime: true },
  { key: 'legal', label: 'Contratti commerciali e legali', priceAED: null, priceLabel: 'Su preventivo', oneTime: true },
  { key: 'it_uae', label: 'Consulenza fiscale Italia-UAE coordinata', priceAED: null, priceLabel: 'Su preventivo', oneTime: true },
  { key: 'visti', label: 'Gestione visti e PRO services', priceAED: null, priceLabel: 'Su preventivo', oneTime: true },
  { key: 'conto', label: 'Apertura/assistenza conto corrente UAE', priceAED: null, priceLabel: 'Su preventivo', oneTime: true },
]

export function getPlanByTransactions(transactions: number): Plan {
  if (transactions <= 25) return PLANS[0]  // Basic
  if (transactions <= 50) return PLANS[1]  // Entry Level
  if (transactions <= 100) return PLANS[2] // Pro
  if (transactions <= 150) return PLANS[3] // Silver
  if (transactions <= 300) return PLANS[4] // Gold
  if (transactions <= 500) return PLANS[5] // Platinum
  return PLANS[6]                          // Diamond
}
