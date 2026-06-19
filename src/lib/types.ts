export interface ConfiguratorData {
  step1_company_type?: 'freezone' | 'mainland' | 'offshore' | 'unknown'
  step2_age?: 'new' | 'less1y' | '1to3y' | 'more3y'
  step3_transactions?: number
  step4_vat?: 'yes' | 'no' | 'unknown'
  step5_employees?: 0 | 1 | 2 | 3
  step6_corporate_tax?: 'yes' | 'pending' | 'unknown'
  step7_italy?: 'aire' | 'resident' | 'transitioning' | 'unknown'
  step8_accountant?: 'none' | 'unsatisfied' | 'switching' | 'new'
  step9_addons?: string[]
  step10_contact?: {
    full_name: string
    email: string
    phone: string
    company_name: string
    free_zone?: string
  }
}

export interface Alert {
  code: string
  text: string
}

export function computeAlerts(data: ConfiguratorData): Alert[] {
  const alerts: Alert[] = []

  if (data.step1_company_type === 'offshore') {
    alerts.push({
      code: 'OFFSHORE_ALERT',
      text: 'Le società offshore hanno requisiti contabili specifici che dipendono dalla giurisdizione. Incluso nel tuo piano: una valutazione iniziale personalizzata.',
    })
  }

  if (data.step2_age === 'more3y') {
    alerts.push({
      code: 'PREGRESSO',
      text: 'Con una storia societaria pregressa, l\'onboarding include una verifica della contabilità arretrata. Nessun problema — ci pensiamo noi.',
    })
  }

  if (data.step4_vat === 'no') {
    alerts.push({
      code: 'VAT_REQUIRED',
      text: 'Se il tuo fatturato supera 375.000 AED (~102.000€), la registrazione VAT è obbligatoria. Valuteremo la tua situazione nell\'onboarding.',
    })
  }

  if (data.step5_employees === 3) {
    alerts.push({
      code: 'VISTI_ALTI',
      text: 'Con più di 5 dipendenti è necessaria la gestione WPS (Wage Protection System). Includi il nostro add-on payroll per restare compliant.',
    })
  }

  if (data.step6_corporate_tax === 'unknown') {
    alerts.push({
      code: 'CT_MISSING',
      text: 'Dal 2023, tutte le società UAE sono soggette alla Corporate Tax del 9%. Il nostro piano include la preparazione del tuo Corporate Tax Return.',
    })
  }

  if (data.step7_italy === 'resident') {
    alerts.push({
      code: 'IT_RESIDENCY',
      text: 'Attenzione: la tua residenza fiscale italiana può generare obblighi di dichiarazione sulla società UAE (CFC, quadro RW). Ti aiutiamo a gestirlo correttamente.',
    })
  }

  if (data.step8_accountant === 'none') {
    alerts.push({
      code: 'PREGRESSO',
      text: 'Molti imprenditori scoprono tardi di avere arretrati contabili o obblighi non rispettati. Il nostro onboarding include sempre una verifica della situazione pregressa.',
    })
  }

  if (data.step9_addons?.includes('aml')) {
    alerts.push({
      code: 'AML_FLAG',
      text: 'I costi AML variano da 3.000 a 8.000 AED a seconda della complessità. Un nostro consulente ti contatterà per definire il preventivo specifico.',
    })
  }

  return alerts
}
