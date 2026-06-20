import { NextResponse } from 'next/server'
import { PLANS } from '@/lib/pricing'

export async function GET() {
  const out: string[] = []

  if (!process.env.MAMOPAY_API_KEY) {
    return new NextResponse('No API key', { headers: { 'Content-Type': 'text/plain' } })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://societa-dubai.it'
  const envVars: Record<string, string> = {}

  for (const plan of PLANS) {
    if (!plan.priceAED) continue

    out.push(`--- Creating ${plan.key} (${plan.priceAED} AED/mese) ---`)

    const payload = {
      title: `Piano ${plan.label} · ${plan.subtitle}`,
      description: `${plan.description} — ${plan.maxTransactions} tx/mese`.substring(0, 75),
      active: true,
      enable_tabby: false,
      enable_message: false,
      enable_tips: false,
      enable_customer_details: true,
      enable_quantity: false,
      enable_qr_code: false,
      send_customer_receipt: true,
      save_card: 'required',
      return_url: `${siteUrl}/onboarding/success`,
      failure_return_url: `${siteUrl}/configuratore?payment=failed`,
      processing_fee_percentage: 0,
      amount: plan.priceAED,
      amount_currency: 'AED',
      link_type: 'standalone',
      subscription: {
        frequency: 'monthly',
        frequency_interval: 1,
      },
      custom_data: {
        piano: plan.key,
        piano_label: plan.label,
        source: 'configuratore',
      },
    }

    try {
      const res = await fetch('https://business.mamopay.com/manage_api/v1/links', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.MAMOPAY_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      })
      const data = await res.json()

      if (res.status === 201) {
        const url = data.payment_url || data.url
        out.push(`OK: ${url}`)
        out.push(`Link ID: ${data.id}`)
        out.push(`Sub ID: ${data.subscription?.identifier}`)
        envVars[`MAMOPAY_LINK_${plan.key}`] = url
      } else {
        out.push(`ERROR ${res.status}: ${JSON.stringify(data)}`)
      }
    } catch (e: unknown) {
      out.push(`FETCH ERROR: ${(e as Error).message}`)
    }

    out.push('')
  }

  out.push('=== ENV VARS DA CONFIGURARE ===')
  for (const [key, val] of Object.entries(envVars)) {
    out.push(`${key}=${val}`)
  }

  return new NextResponse(out.join('\n'), { headers: { 'Content-Type': 'text/plain' } })
}
