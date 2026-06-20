import { NextRequest, NextResponse } from 'next/server'
import { PLANS } from '@/lib/pricing'

const PLAN_LINKS: Record<string, string | undefined> = {
  BASIC: process.env.MAMOPAY_LINK_BASIC,
  ENTRY_LEVEL: process.env.MAMOPAY_LINK_ENTRY_LEVEL,
  PRO: process.env.MAMOPAY_LINK_PRO,
  SILVER: process.env.MAMOPAY_LINK_SILVER,
  GOLD: process.env.MAMOPAY_LINK_GOLD,
  PLATINUM: process.env.MAMOPAY_LINK_PLATINUM,
}

export async function POST(req: NextRequest) {
  try {
    const { plan: planKey } = await req.json()
    const plan = PLANS.find(p => p.key === planKey)
    if (!plan || !plan.priceAED) {
      return NextResponse.json({ error: 'Piano non valido' }, { status: 400 })
    }

    const paymentUrl = PLAN_LINKS[planKey]
    if (!paymentUrl) {
      return NextResponse.json({ error: 'Link di pagamento non configurato' }, { status: 500 })
    }

    return NextResponse.json({ payment_url: paymentUrl })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 })
  }
}
