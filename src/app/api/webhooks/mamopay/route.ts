import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('x-mamo-signature')

  if (process.env.MAMOPAY_WEBHOOK_SECRET && signature) {
    const expected = crypto.createHmac('sha256', process.env.MAMOPAY_WEBHOOK_SECRET).update(body).digest('hex')
    if (signature !== expected) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
  }

  const event = JSON.parse(body)
  const { type, data } = event
  const planKey = data?.custom_data?.piano || data?.metadata?.piano

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing Supabase env vars')
    return NextResponse.json({ received: true })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  if (type === 'payment.captured' || type === 'payment.completed' || type === 'subscription.activated') {
    const customerEmail = data?.customer_email || data?.customer?.email
    const customerName = data?.customer_name || data?.customer?.name

    if (customerEmail) {
      const { data: client } = await supabase
        .from('clients')
        .upsert({
          email: customerEmail,
          full_name: customerName || 'N/A',
          company_type: data?.custom_data?.company_type,
        }, { onConflict: 'email' })
        .select()
        .single()

      if (client) {
        await supabase.from('contracts').insert({
          client_id: client.id,
          plan: planKey,
          amount_aed: data?.amount || data?.total,
          status: 'active',
          mamopay_plan_id: data?.link_id || data?.id,
          mamopay_sub_id: data?.subscription_id || data?.id,
          started_at: new Date().toISOString(),
          next_billing: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        })

        await supabase
          .from('configurator_sessions')
          .update({ converted: true })
          .eq('client_email', customerEmail)
      }
    }
  }

  if (type === 'payment.failed') {
    const customerEmail = data?.customer_email || data?.customer?.email
    if (customerEmail) {
      await supabase
        .from('contracts')
        .update({ status: 'paused' })
        .eq('plan', planKey)
        .eq('status', 'active')
    }
  }

  return NextResponse.json({ received: true })
}
