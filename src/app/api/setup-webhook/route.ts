import { NextResponse } from 'next/server'

export async function GET() {
  const out: string[] = []

  out.push('MAMOPAY_API_KEY: ' + (process.env.MAMOPAY_API_KEY ? 'SET (' + process.env.MAMOPAY_API_KEY.substring(0, 8) + '...)' : 'NOT SET'))
  out.push('SITE_URL: ' + (process.env.NEXT_PUBLIC_SITE_URL || 'default'))

  if (!process.env.MAMOPAY_API_KEY) {
    out.push('ERROR: No API key')
    return new NextResponse(out.join('\n'), { headers: { 'Content-Type': 'text/plain' } })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://societa-dubai.it'

  try {
    out.push('--- Listing existing webhooks ---')
    const listRes = await fetch('https://api.mamopay.com/manage_api/v1/webhooks', {
      headers: {
        'Authorization': `Bearer ${process.env.MAMOPAY_API_KEY}`,
        'Accept': 'application/json',
      },
    })
    const listBody = await listRes.text()
    out.push('List status: ' + listRes.status)
    out.push('List body: ' + listBody)
  } catch (e) {
    out.push('List error: ' + String(e))
  }

  try {
    out.push('--- Creating webhook ---')
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
    const createBody = await createRes.text()
    out.push('Create status: ' + createRes.status)
    out.push('Create body: ' + createBody)
  } catch (e) {
    out.push('Create error: ' + String(e))
  }

  return new NextResponse(out.join('\n'), { headers: { 'Content-Type': 'text/plain' } })
}
