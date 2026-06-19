import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('x-mamo-signature')

  // Verifica firma webhook
  if (process.env.MAMOPAY_WEBHOOK_SECRET && signature) {
    const expected = crypto.createHmac('sha256', process.env.MAMOPAY_WEBHOOK_SECRET).update(body).digest('hex')
    if (signature !== expected) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
  }

  const event = JSON.parse(body)
  const { type, data } = event

  if (type === 'payment.completed' || type === 'subscription.activated') {
    const contractId = data?.metadata?.contract_id
    if (contractId) {
      await supabase.from('contracts').update({
        status: 'active',
        mamopay_sub_id: data.subscription_id || data.id,
        started_at: new Date().toISOString(),
        next_billing: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }).eq('id', contractId)

      // Segna configurator session come convertita
      const { data: contract } = await supabase.from('contracts').select('client_id').eq('id', contractId).single()
      if (contract?.client_id) {
        const { data: client } = await supabase.from('clients').select('email').eq('id', contract.client_id).single()
        if (client?.email) {
          await supabase.from('configurator_sessions').update({ converted: true }).eq('client_email', client.email)
        }
      }
    }
  }

  if (type === 'payment.failed') {
    const contractId = data?.metadata?.contract_id
    if (contractId) {
      await supabase.from('contracts').update({ status: 'paused' }).eq('id', contractId)
    }
  }

  return NextResponse.json({ received: true })
}
