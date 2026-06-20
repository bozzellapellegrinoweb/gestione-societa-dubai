import { NextRequest, NextResponse } from 'next/server'
import { PLANS } from '@/lib/pricing'

export async function POST(req: NextRequest) {
  try {
    const { plan: planKey } = await req.json()
    const plan = PLANS.find(p => p.key === planKey)
    if (!plan || !plan.priceAED) {
      return NextResponse.json({ error: 'Piano non valido' }, { status: 400 })
    }

    if (!process.env.MAMOPAY_API_KEY) {
      return NextResponse.json({ error: 'Pagamento non configurato' }, { status: 500 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://societa-dubai.it'

    const mamoPayload: Record<string, unknown> = {
      title: `Piano ${plan.label} · ${plan.subtitle}`,
      description: `PB TAX International — ${plan.description}. Contabilità società Dubai, ${plan.maxTransactions} transazioni/mese.`,
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
        piano: planKey,
        piano_label: plan.label,
        source: 'configuratore',
      },
    }

    const mamoRes = await fetch('https://business.mamopay.com/manage_api/v1/links', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MAMOPAY_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(mamoPayload),
    })

    if (!mamoRes.ok) {
      const errBody = await mamoRes.text()
      console.error('MAMO Pay error:', mamoRes.status, errBody)
      return NextResponse.json({ error: 'Errore nella creazione del pagamento' }, { status: 502 })
    }

    const mamoData = await mamoRes.json()
    const paymentUrl = mamoData.payment_url || mamoData.url

    if (!paymentUrl) {
      console.error('MAMO Pay response missing URL:', mamoData)
      return NextResponse.json({ error: 'Link di pagamento non disponibile' }, { status: 502 })
    }

    return NextResponse.json({ payment_url: paymentUrl, link_id: mamoData.id })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 })
  }
}
