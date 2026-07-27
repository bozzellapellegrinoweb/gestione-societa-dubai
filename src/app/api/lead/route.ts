import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { PLANS } from '@/lib/pricing'
import { answersToHtmlRows } from '@/lib/configurator-labels'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, plan_suggested, answers } = body

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Nome, email e telefono sono obbligatori.' },
        { status: 400 },
      )
    }

    const plan = PLANS.find(p => p.key === plan_suggested)
    const amount = plan?.priceAED ?? null

    // Salva il lead su Supabase (riusa configurator_sessions con i contatti)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY,
        )
        await supabase.from('configurator_sessions').insert({
          session_data: { ...(answers ?? {}), contact: { name, email, phone }, lead_type: 'call_request' },
          plan_suggested: plan_suggested ?? null,
          amount_aed: amount,
          client_email: email,
          converted: false,
        })
      } catch (dbErr) {
        console.error('Supabase lead insert error:', dbErr)
      }
    }

    // Notifica alla segreteria
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const from = process.env.RESEND_FROM_EMAIL || 'PB TAX International <onboarding@resend.dev>'
        const to = process.env.NOTIFY_EMAIL || 'segreteria@indubai.it'
        const phoneDigits = String(phone).replace(/[^0-9]/g, '')
        const waHref = phoneDigits ? `https://wa.me/${phoneDigits}` : null
        const planLabel = plan?.label ?? plan_suggested ?? '—'
        const amountLabel = amount ? `${amount} AED/mese` : 'da definire'
        const qaRows =
          answers && Object.keys(answers).length > 0
            ? answersToHtmlRows(answers as Record<number, number>)
            : ''

        await resend.emails.send({
          from,
          to,
          replyTo: email,
          subject: `Nuovo lead (call gratuita): ${name} — Piano ${planLabel}`,
          html: `
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#1d2b3a">
              <div style="background:#2f8a5b;padding:24px 28px;border-radius:12px 12px 0 0">
                <h1 style="color:#fff;font-size:18px;margin:0;font-weight:700">Nuovo lead — richiesta call gratuita</h1>
              </div>
              <div style="background:#fff;padding:28px;border:1px solid #e6dfd2;border-top:none;border-radius:0 0 12px 12px">
                <div style="font-size:18px;font-weight:700;margin-bottom:16px;color:#1d2b3a">${name}</div>
                <table style="font-size:15px;line-height:2.2;color:#3a4550;border-collapse:collapse;width:100%">
                  <tr><td style="padding-right:16px;font-weight:600;white-space:nowrap">Email:</td><td><a href="mailto:${email}" style="color:#1d6b3a">${email}</a></td></tr>
                  <tr><td style="padding-right:16px;font-weight:600;white-space:nowrap">Telefono:</td><td>${phone}</td></tr>
                  <tr><td style="padding-right:16px;font-weight:600;white-space:nowrap">Piano stimato:</td><td>${planLabel} (${amountLabel})</td></tr>
                </table>

                <div style="background:#fef9e7;border:1px solid #f0d860;border-radius:10px;padding:14px 18px;margin:20px 0;font-size:14px;color:#876418">
                  <strong>Da fare:</strong> richiamare il lead <strong>entro 48h</strong> per la call gratuita.
                </div>

                ${
                  qaRows
                    ? `<div style="font-size:12px;font-weight:700;color:#8a93a0;text-transform:uppercase;letter-spacing:.08em;margin-bottom:12px">Questionario compilato</div>
                       <table style="font-size:14px;border-collapse:collapse;width:100%;margin-bottom:20px">${qaRows}</table>`
                    : ''
                }

                <div style="margin-top:8px">
                  <a href="mailto:${email}" style="display:inline-block;background:#1d2b3a;color:#fff;font-size:14px;font-weight:600;padding:12px 20px;border-radius:8px;text-decoration:none;margin-right:10px">Scrivi al lead</a>
                  ${waHref ? `<a href="${waHref}" style="display:inline-block;background:#25d366;color:#fff;font-size:14px;font-weight:600;padding:12px 20px;border-radius:8px;text-decoration:none">WhatsApp lead →</a>` : ''}
                </div>
              </div>
            </div>
          `,
        })
      } catch (emailErr) {
        console.error('Lead notification email error:', emailErr)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lead error:', err)
    return NextResponse.json({ success: false, error: 'Errore interno' }, { status: 500 })
  }
}
