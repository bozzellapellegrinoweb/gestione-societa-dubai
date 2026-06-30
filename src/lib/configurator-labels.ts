export const QUESTIONS: { q: string; options: string[] }[] = [
  {
    q: 'Tipo di società',
    options: ['Free Zone', 'Mainland', 'Offshore', 'Non sono sicuro'],
  },
  {
    q: 'Zona / Free Zone',
    options: ['IFZA', 'DMCC', 'RAKEZ', 'Altra / Mainland'],
  },
  {
    q: 'Transazioni mensili',
    options: ['Fino a 25', 'Fino a 50', 'Fino a 100', 'Fino a 150', 'Fino a 300', 'Fino a 500', 'Oltre 500'],
  },
  {
    q: 'Dipendenti con visto',
    options: ['Nessuno', 'Da 1 a 3', 'Da 4 a 10', 'Oltre 10'],
  },
  {
    q: 'Fatturato > 375.000 AED',
    options: ['Sì', 'No', 'Non ancora'],
  },
  {
    q: 'Gestione libro paga',
    options: ['Sì, gestitelo voi', 'No, non mi serve'],
  },
  {
    q: 'Situazione Fisco italiano',
    options: ['Residente in Italia', 'Iscritto AIRE', 'In transizione', 'Non lo so con certezza'],
  },
  {
    q: 'Residenza fiscale',
    options: ['Italia', 'Emirati Arabi', 'Altro paese', 'Non sono sicuro'],
  },
  {
    q: 'Operatività società',
    options: ['In apertura', 'Meno di 1 anno', 'Da 1 a 3 anni', 'Oltre 3 anni'],
  },
]

export function answersToText(answers: Record<number, number>): string {
  return QUESTIONS.map((q, i) => {
    const stepNum = i + 1
    const ans = answers[stepNum]
    const label = ans !== undefined ? (q.options[ans] ?? `risposta ${ans}`) : '—'
    return `${q.q}: ${label}`
  }).join('\n')
}

export function answersToHtmlRows(answers: Record<number, number>): string {
  return QUESTIONS.map((q, i) => {
    const stepNum = i + 1
    const ans = answers[stepNum]
    const label = ans !== undefined ? (q.options[ans] ?? `risposta ${ans}`) : '—'
    return `<tr>
      <td style="padding:8px 12px 8px 0;font-weight:600;color:#5b6570;white-space:nowrap;vertical-align:top">${q.q}</td>
      <td style="padding:8px 0;color:#1d2b3a">${label}</td>
    </tr>`
  }).join('')
}
