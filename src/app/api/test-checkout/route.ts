import { NextResponse } from 'next/server'

export async function GET() {
  const out: string[] = []

  if (!process.env.MAMOPAY_API_KEY) {
    return new NextResponse('No API key', { headers: { 'Content-Type': 'text/plain' } })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://societa-dubai.it'

  const payload = {
    title: 'Piano Basic · Tax Management & Compliance',
    description: 'PB TAX International — test subscription',
    active: true,
    enable_customer_details: true,
    send_customer_receipt: true,
    save_card: 'required',
    return_url: `${siteUrl}/onboarding/success`,
    failure_return_url: `${siteUrl}/configuratore?payment=failed`,
    amount: 500,
    amount_currency: 'AED',
    link_type: 'standalone',
    subscription: {
      frequency: 'monthly',
      frequency_interval: 1,
    },
    custom_data: {
      piano: 'BASIC',
      piano_label: 'Basic',
      source: 'test',
    },
  }

  out.push('Payload: ' + JSON.stringify(payload, null, 2))

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
    const body = await res.text()
    out.push('Status: ' + res.status)
    out.push('Response: ' + body)
  } catch (e: unknown) {
    const err = e as Error
    out.push('Error: ' + err.message)
  }

  return new NextResponse(out.join('\n\n'), { headers: { 'Content-Type': 'text/plain' } })
}
