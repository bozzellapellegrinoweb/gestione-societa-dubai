import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { PLANS, ADDONS } from '@/lib/pricing'

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  try {
    const { plan: planKey, addons: addonKeys, contact } = await req.json()
    const plan = PLANS.find(p => p.key === planKey)
    if (!plan || !plan.priceAED) {
      return NextResponse.json({ error: 'Piano non valido' }, { status: 400 })
    }

    // Salva/aggiorna il cliente su Supabase
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .upsert({ email: contact.email, full_name: contact.full_name, phone: contact.phone, whatsapp: contact.phone, company_name: contact.company_name }, { onConflict: 'email' })
      .select()
      .single()

    if (clientError) console.error('Client upsert error:', clientError)

    // Crea il contratto in stato pending
    const { data: contractData } = await supabase.from('contracts').insert({
      client_id: client?.id,
      plan: planKey,
      amount_aed: plan.priceAED,
      addons: addonKeys,
      status: 'pending',
    }).select().single()

    const addonsList = ADDONS.filter(a => addonKeys?.includes(a.key))
    const addonDesc = addonsList.length > 0 ? ` + ${addonsList.map(a => a.label).join(', ')}` : ''

    // Crea il payment plan su MAMO Pay
    const mamoPayload = {
      title: `Piano ${plan.label} · societa-dubai.it`,
      amount: plan.priceAED,
      currency: 'AED',
      frequency: 'MONTHLY',
      description: `Contabilità società Dubai - ${plan.description}${addonDesc}`,
      customer: {
        name: contact.full_name,
        email: contact.email,
        phone: contact.phone,
      },
      metadata: {
        piano: planKey,
        societa: contact.company_name,
        addons: addonKeys,
        source: 'configuratore',
        contract_id: contractData?.id,
      },
      redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL}/onboarding/${contractData?.id}`,
      webhook_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/mamopay`,
    }

    let redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/onboarding/${contractData?.id}`

    if (process.env.MAMOPAY_API_KEY) {
      try {
        const mamoRes = await fetch('https://api.mamopay.com/v1/links', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.MAMOPAY_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mamoPayload),
        })
        const mamoData = await mamoRes.json()
        if (mamoData.url) redirectUrl = mamoData.url
        if (mamoData.id && contractData?.id) {
          await supabase.from('contracts').update({ mamopay_plan_id: mamoData.id }).eq('id', contractData.id)
        }
      } catch (mamoErr) {
        console.error('MAMO Pay error:', mamoErr)
      }
    }

    return NextResponse.json({ redirect_url: redirectUrl, contract_id: contractData?.id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 })
  }
}
