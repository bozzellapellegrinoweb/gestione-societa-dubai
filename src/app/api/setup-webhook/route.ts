import { NextResponse } from 'next/server'
import dns from 'dns/promises'

export async function GET() {
  const out: string[] = []

  out.push('MAMOPAY_API_KEY: ' + (process.env.MAMOPAY_API_KEY ? 'SET (' + process.env.MAMOPAY_API_KEY.substring(0, 8) + '...)' : 'NOT SET'))
  out.push('SITE_URL: ' + (process.env.NEXT_PUBLIC_SITE_URL || 'default'))
  out.push('NODE_ENV: ' + process.env.NODE_ENV)
  out.push('VERCEL_REGION: ' + (process.env.VERCEL_REGION || 'unknown'))

  if (!process.env.MAMOPAY_API_KEY) {
    out.push('ERROR: No API key')
    return new NextResponse(out.join('\n'), { headers: { 'Content-Type': 'text/plain' } })
  }

  // DNS check
  try {
    const addresses = await dns.resolve4('business.mamopay.com')
    out.push('DNS resolve business.mamopay.com: ' + addresses.join(', '))
  } catch (e: unknown) {
    const err = e as Error
    out.push('DNS error: ' + err.message)
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://societa-dubai.it'

  // Test 1: List webhooks
  try {
    out.push('--- Listing existing webhooks ---')
    const listRes = await fetch('https://business.mamopay.com/manage_api/v1/webhooks', {
      headers: {
        'Authorization': `Bearer ${process.env.MAMOPAY_API_KEY}`,
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(15000),
    })
    const listBody = await listRes.text()
    out.push('List status: ' + listRes.status)
    out.push('List body: ' + listBody)
  } catch (e: unknown) {
    const err = e as Error
    out.push('List error: ' + err.message)
    out.push('List error name: ' + err.name)
    if ('cause' in err) {
      const cause = err.cause as Error
      out.push('List cause: ' + cause?.message)
      out.push('List cause code: ' + (cause as NodeJS.ErrnoException)?.code)
      if ('cause' in cause) out.push('List cause.cause: ' + JSON.stringify(cause.cause))
    }
  }

  // Test 2: Create webhook
  try {
    out.push('--- Creating webhook ---')
    const createRes = await fetch('https://business.mamopay.com/manage_api/v1/webhooks', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MAMOPAY_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        url: `${siteUrl}/api/webhooks/mamopay`,
      }),
      signal: AbortSignal.timeout(15000),
    })
    const createBody = await createRes.text()
    out.push('Create status: ' + createRes.status)
    out.push('Create body: ' + createBody)
  } catch (e: unknown) {
    const err = e as Error
    out.push('Create error: ' + err.message)
    out.push('Create error name: ' + err.name)
    if ('cause' in err) {
      const cause = err.cause as Error
      out.push('Create cause: ' + cause?.message)
      out.push('Create cause code: ' + (cause as NodeJS.ErrnoException)?.code)
    }
  }

  return new NextResponse(out.join('\n'), { headers: { 'Content-Type': 'text/plain' } })
}
