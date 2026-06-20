import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (key !== 'pbtax2026setup') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.MAMOPAY_API_KEY) {
    return NextResponse.json({ error: 'MAMOPAY_API_KEY not set' }, { status: 500 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://societa-dubai.it'

  // First list existing webhooks
  const listRes = await fetch('https://api.mamopay.com/manage_api/v1/webhooks', {
    headers: {
      'Authorization': `Bearer ${process.env.MAMOPAY_API_KEY}`,
      'Accept': 'application/json',
    },
  })
  const existing = await listRes.json()

  // Create webhook
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

  const webhook = await createRes.json()

  return NextResponse.json({
    existing_webhooks: existing,
    new_webhook: webhook,
    status: createRes.status,
  })
}
