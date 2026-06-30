import { NextRequest, NextResponse } from 'next/server'
import { PLANS } from '@/lib/pricing'
import { Resend } from 'resend'
import { answersToHtmlRows } from '@/lib/configurator-labels'

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
    const { plan: planKey, answers } = await req.json()
    const plan = PLANS.find(p => p.key === planKey)
    if (!plan || !plan.priceAED) {
      return NextResponse.json({ error: 'Piano non valido' }, { status: 400 })
    }

    const paymentUrl = PLAN_LINKS[planKey]
    if (!paymentUrl) {
      return NextResponse.json({ error: 'Link di pagamento non configurato' }, { status: 500 })
    }

    // Notifica segreteria con questionario compilato
    if (process.env.RESEND_API_KEY && answers && Object.keys(answers).length > 0) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const from = process.env.RESEND_FROM_EMAIL || 'PB TAX International <onboarding@resend.dev>'
        const to = process.env.NOTIFY_EMAIL || 'segreteria@indubai.it'
        const qaRows = answersToHtmlRows(answers as Record<number, number>)

        await resend.emails.send({
          from,
          to,
          subject: `Nuovo lead configuratore: Piano ${plan.label} — ${plan.priceAED} AED/mese`,
          html: `
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#1d2b3a">
              <div style="background:#1d2b3a;padding:24px 28px;border-radius:12px 12px 0 0">
                <h1 style="color:#fff;font-size:18px;margin:0;font-weight:700">Nuovo lead — configuratore completato</h1>
              </div>
              <div style="background:#fff;padding:28px;border:1px solid #e6dfd2;border-top:none;border-radius:0 0 12px 12px">

                <div style="background:#f5f2ec;border-radius:10px;padding:16px 20px;margin-bottom:24px">
                  <div style="font-size:12px;font-weight:700;color:#a9885e;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Piano selezionato</div>
                  <div style="font-size:20px;font-weight:800;color:#1d2b3a">Piano ${plan.label}</div>
                  <div style="font-size:15px;color:#5b6570;margin-top:2px">${plan.priceAED} AED/mese · ${plan.subtitle || ''}</div>
                </div>

                <div style="font-size:12px;font-weight:700;color:#8a93a0;text-transform:uppercase;letter-spacing:.08em;margin-bottom:12px">Questionario compilato</div>
                <table style="font-size:14px;border-collapse:collapse;width:100%;margin-bottom:24px">
                  ${qaRows}
                </table>

                <div style="background:#fef9e7;border:1px solid #f0d860;border-radius:10px;padding:14px 18px;font-size:13px;color:#876418">
                  Il cliente sta per procedere al pagamento su MAMO Pay. Riceverai una seconda email di conferma a pagamento avvenuto.
                </div>
              </div>
            </div>
          `,
        })
      } catch (emailErr) {
        console.error('Checkout notification email error:', emailErr)
      }
    }

    return NextResponse.json({ payment_url: paymentUrl })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 })
  }
}
