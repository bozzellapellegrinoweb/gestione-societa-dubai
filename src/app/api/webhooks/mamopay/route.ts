import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendWelcomeEmail, sendNewClientNotification, sendPaymentFailedNotification } from '@/lib/email'
import { trackPurchase, trackPaymentFailed } from '@/lib/ga'
import { PLANS } from '@/lib/pricing'

function planLabelFromAmount(amountAED: number): string | null {
  // Plans show price without VAT; MAMO Pay charges +5% IVA
  for (const p of PLANS) {
    if (!p.priceAED) continue
    const withVat = Math.round(p.priceAED * 1.05)
    if (withVat === amountAED || p.priceAED === amountAED) return p.label
  }
  return null
}

export async function POST(req: NextRequest) {
  const body = await req.text()

  if (process.env.MAMOPAY_WEBHOOK_SECRET) {
    const authHeader = req.headers.get('authorization')
    if (authHeader !== process.env.MAMOPAY_WEBHOOK_SECRET) {
      console.error('Webhook auth mismatch')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  let charge: Record<string, unknown>
  try {
    const parsed = JSON.parse(body)
    charge = parsed.data || parsed
  } catch {
    console.error('Invalid webhook JSON:', body.substring(0, 200))
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const eventType = (charge.event_type || charge.type) as string | undefined
  const customData = charge.custom_data as Record<string, string> | undefined
  const planKey = customData?.piano
  const amountAED = charge.amount as number || 0
  const customerDetails = charge.customer_details as Record<string, string> | undefined
  const customerEmail = customerDetails?.email
  const customerName = customerDetails?.name || 'Cliente'
  // MAMO Pay may use different field names for phone depending on link type
  const customerPhone = customerDetails?.phone || customerDetails?.phone_number || customerDetails?.mobile || ''

  // Try custom_data first; fall back to amount-based lookup for manually-created links
  const planLabel = customData?.piano_label || planKey || planLabelFromAmount(amountAED) || `Servizio ${amountAED} AED`

  console.log('MAMO webhook:', eventType, { planKey, planLabel, amountAED, customerEmail, customerPhone })
  console.log('MAMO customer_details raw:', JSON.stringify(customerDetails))

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing Supabase env vars')
    return NextResponse.json({ received: true })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  if (eventType === 'charge.succeeded' || eventType === 'subscription.succeeded') {
    if (customerEmail) {
      const { data: client } = await supabase
        .from('clients')
        .upsert({
          email: customerEmail,
          full_name: customerName,
          company_type: customData?.company_type,
        }, { onConflict: 'email' })
        .select()
        .single()

      if (client) {
        await supabase.from('contracts').insert({
          client_id: client.id,
          plan: planKey,
          amount_aed: amountAED,
          status: 'active',
          mamopay_plan_id: charge.payment_link_id || charge.id,
          mamopay_sub_id: charge.subscription_id || charge.id,
          started_at: new Date().toISOString(),
          next_billing: (charge.next_payment_date as string) || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        })

        await supabase
          .from('configurator_sessions')
          .update({ converted: true })
          .eq('client_email', customerEmail)
      }

      const isSubscription = eventType === 'subscription.succeeded'
      try {
        // Welcome email only for subscriptions — una tantum payments get no client email
        if (isSubscription) {
          await sendWelcomeEmail(customerEmail, customerName, planLabel, amountAED, isSubscription)
        }
        await sendNewClientNotification(customerName, customerEmail, planLabel, amountAED, customerPhone, isSubscription)
      } catch (e) {
        console.error('Email send error:', e)
      }

      await trackPurchase(customerEmail, planLabel, amountAED)
    }
  }

  if (eventType === 'charge.failed' || eventType === 'subscription.failed') {
    if (customerEmail) {
      await supabase
        .from('contracts')
        .update({ status: 'paused' })
        .eq('plan', planKey)
        .eq('status', 'active')

      try {
        await sendPaymentFailedNotification(customerEmail, planLabel)
      } catch (e) {
        console.error('Email send error:', e)
      }

      await trackPaymentFailed(customerEmail, planLabel)
    }
  }

  return NextResponse.json({ received: true })
}
