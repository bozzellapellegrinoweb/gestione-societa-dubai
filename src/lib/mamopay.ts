// Creazione di link di pagamento dinamici via API MAMO Pay.
//
// A differenza dei link statici usati per i piani (MAMOPAY_LINK_*), le call a
// pagamento hanno importo variabile e devono trasportare l'ID prenotazione nei
// custom_data, così il webhook può confermare la call corretta.
//
// Env: MAMOPAY_API_KEY (obbligatoria),
//      MAMOPAY_API_BASE (default produzione; per sandbox usare
//      https://sandbox.dev.business.mamopay.com/manage_api/v1)

const API_BASE = process.env.MAMOPAY_API_BASE || 'https://business.mamopay.com/manage_api/v1'

export function isMamoConfigured(): boolean {
  return Boolean(process.env.MAMOPAY_API_KEY)
}

export interface CreatePaymentLinkParams {
  title: string
  description?: string
  amountAED: number
  returnUrl: string
  failureReturnUrl: string
  customData: Record<string, string>
  customerEmail?: string
  customerName?: string
}

export interface PaymentLink {
  id: string
  paymentUrl: string
}

export async function createPaymentLink(params: CreatePaymentLinkParams): Promise<PaymentLink> {
  if (!process.env.MAMOPAY_API_KEY) throw new Error('MAMOPAY_API_KEY non configurata')

  const res = await fetch(`${API_BASE}/links`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.MAMOPAY_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      title: params.title,
      description: params.description || params.title,
      amount: params.amountAED,
      amount_currency: 'AED',
      return_url: params.returnUrl,
      failure_return_url: params.failureReturnUrl,
      // link monouso: si disattiva dopo il primo pagamento riuscito
      capacity: 1,
      enable_customer_details: true,
      send_customer_receipt: true,
      custom_data: params.customData,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`MAMO create link error ${res.status}: ${text.slice(0, 300)}`)
  }

  const data = (await res.json()) as Record<string, unknown>
  const paymentUrl = (data.payment_url || data.link || data.url) as string | undefined
  const id = (data.id || data.payment_link_id) as string | undefined

  if (!paymentUrl || !id) {
    throw new Error(`MAMO create link: risposta inattesa ${JSON.stringify(data).slice(0, 200)}`)
  }

  return { id, paymentUrl }
}
