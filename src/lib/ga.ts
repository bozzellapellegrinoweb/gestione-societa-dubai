const GA_MEASUREMENT_ID = 'G-GLJ6SEB12P'
const GA_API_SECRET = process.env.GA_API_SECRET

const GA_ENDPOINT = `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`

export async function trackServerEvent(
  clientId: string,
  eventName: string,
  params: Record<string, string | number | boolean> = {},
) {
  if (!GA_API_SECRET) return

  try {
    await fetch(GA_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        client_id: clientId,
        events: [{ name: eventName, params }],
      }),
    })
  } catch {
    console.warn('GA4 event failed:', eventName)
  }
}

export async function trackPurchase(
  customerEmail: string,
  planLabel: string,
  amountAED: number,
  currency = 'AED',
) {
  const clientId = customerEmail.replace(/[^a-zA-Z0-9]/g, '_')

  await trackServerEvent(clientId, 'purchase', {
    transaction_id: `${Date.now()}_${clientId}`,
    value: amountAED,
    currency,
    items: planLabel,
    plan_name: planLabel,
  })
}

export async function trackPaymentFailed(customerEmail: string, planLabel: string) {
  const clientId = customerEmail.replace(/[^a-zA-Z0-9]/g, '_')
  await trackServerEvent(clientId, 'payment_failed', { plan_name: planLabel })
}
