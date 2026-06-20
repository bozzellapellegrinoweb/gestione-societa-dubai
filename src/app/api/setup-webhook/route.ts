import { NextResponse } from 'next/server'

export async function GET() {
  if (!process.env.MAMOPAY_API_KEY) {
    return NextResponse.json({ error: 'MAMOPAY_API_KEY not set' }, { status: 500 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://societa-dubai.it'
  const results: Record<string, unknown> = {}

  try {
    const listRes = await fetch('https://api.mamopay.com/manage_api/v1/webhooks', {
      headers: {
        'Authorization': `Bearer ${process.env.MAMOPAY_API_KEY}`,
        'Accept': 'application/json',
      },
    })
    results.existing = await listRes.json().catch(() => listRes.statusText)
    results.list_status = listRes.status
  } catch (e) {
    results.list_error = String(e)
  }

  try {
    const createRes = await fetch('https://api.mamopay.com/manage_api/v1/webhooks', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MAMOPAY_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        url: `${siteUrl}/api/webhooks/mamopay`,
      }),
    })
    results.webhook = await createRes.json().catch(() => createRes.statusText)
    results.create_status = createRes.status
  } catch (e) {
    results.create_error = String(e)
  }

  return NextResponse.json(results)
}
