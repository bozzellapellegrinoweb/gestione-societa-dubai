import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const FROM = process.env.RESEND_FROM_EMAIL || 'PB TAX International <onboarding@resend.dev>'
const REPLY_TO = 'segreteria@indubai.it'

export async function sendWelcomeEmail(to: string, customerName: string, planLabel: string, amountAED: number) {
  if (!resend) { console.warn('Resend not configured, skipping email'); return }

  await resend.emails.send({
    from: FROM,
    to,
    replyTo: REPLY_TO,
    subject: `Benvenuto in PB TAX International — Piano ${planLabel} attivato`,
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#1d2b3a">
        <div style="background:#1d2b3a;padding:32px 28px;border-radius:16px 16px 0 0">
          <h1 style="color:#fff;font-size:22px;margin:0;font-weight:800">PB TAX International</h1>
        </div>
        <div style="background:#fff;padding:32px 28px;border:1px solid #e6dfd2;border-top:none">
          <p style="font-size:17px;font-weight:700;margin:0 0 16px">Ciao ${customerName},</p>
          <p style="font-size:15px;line-height:1.6;color:#3a4550;margin:0 0 20px">
            Il tuo abbonamento al <strong>Piano ${planLabel}</strong> è stato attivato con successo!
          </p>

          <div style="background:#f5f2ec;border-radius:12px;padding:20px;margin-bottom:24px">
            <div style="font-size:13px;font-weight:600;color:#8a93a0;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px">Riepilogo</div>
            <div style="font-size:15px;color:#1d2b3a;margin-bottom:6px"><strong>Piano:</strong> ${planLabel}</div>
            <div style="font-size:15px;color:#1d2b3a;margin-bottom:6px"><strong>Importo:</strong> ${amountAED} AED/mese</div>
            <div style="font-size:15px;color:#1d2b3a"><strong>Rinnovo:</strong> Mensile automatico</div>
          </div>

          <div style="background:#e8f3ec;border:1px solid #b8dcc8;border-radius:12px;padding:20px;margin-bottom:24px">
            <div style="font-size:15px;font-weight:700;color:#1d6b3a;margin-bottom:8px">Cosa succede ora?</div>
            <p style="font-size:15px;line-height:1.6;color:#2a5a3a;margin:0">
              Un membro del nostro team ti scriverà <strong>entro 48 ore</strong> per fissare una <strong>video call di onboarding</strong> in cui ti guideremo passo passo nell'attivazione del servizio.
            </p>
          </div>

          <div style="font-size:14px;font-weight:700;color:#a9885e;text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px">Prossimi passi</div>
          <ol style="font-size:15px;line-height:1.8;color:#3a4550;padding-left:20px;margin:0 0 24px">
            <li>Riceverai un messaggio dal tuo account manager entro 48h</li>
            <li>Fisserete insieme una video call di onboarding</li>
            <li>Durante la call ti guideremo nel caricamento dei documenti</li>
            <li>Inizio gestione contabile entro 5 giorni lavorativi</li>
          </ol>

          <p style="font-size:14px;color:#5b6570;line-height:1.6;margin:0 0 24px">
            Per qualsiasi domanda, rispondi a questa email o scrivici su
            <a href="https://wa.me/971585971575" style="color:#1d8a4e;font-weight:600">WhatsApp</a>.
          </p>
          <div style="border-top:1px solid #e6dfd2;padding-top:20px;font-size:12px;color:#8a93a0;text-align:center">
            PB TAX International · Dubai, UAE<br>
            <a href="https://societa-dubai.it" style="color:#a9885e">societa-dubai.it</a>
          </div>
        </div>
      </div>
    `,
  })
}

export async function sendNewClientNotification(customerName: string, customerEmail: string, planLabel: string, amountAED: number) {
  if (!resend) { console.warn('Resend not configured, skipping notification'); return }

  await resend.emails.send({
    from: FROM,
    to: REPLY_TO,
    subject: `Nuovo cliente: ${customerName} — Piano ${planLabel} (${amountAED} AED/mese)`,
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#1d2b3a">
        <div style="background:#2f8a5b;padding:24px 28px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;font-size:20px;margin:0;font-weight:700">Nuovo cliente acquisito</h1>
        </div>
        <div style="background:#fff;padding:28px;border:1px solid #e6dfd2;border-top:none;border-radius:0 0 12px 12px">
          <div style="font-size:18px;font-weight:700;margin-bottom:20px;color:#1d2b3a">${customerName}</div>
          <table style="font-size:15px;line-height:2.2;color:#3a4550;border-collapse:collapse;width:100%">
            <tr><td style="padding-right:16px;font-weight:600;white-space:nowrap">Email:</td><td><a href="mailto:${customerEmail}" style="color:#1d6b3a">${customerEmail}</a></td></tr>
            <tr><td style="padding-right:16px;font-weight:600;white-space:nowrap">Piano:</td><td>${planLabel}</td></tr>
            <tr><td style="padding-right:16px;font-weight:600;white-space:nowrap">Importo:</td><td>${amountAED} AED/mese</td></tr>
          </table>

          <div style="background:#fef9e7;border:1px solid #f0d860;border-radius:10px;padding:16px;margin:20px 0">
            <div style="font-size:14px;font-weight:700;color:#7a5e12;margin-bottom:4px">Da fare</div>
            <p style="font-size:14px;line-height:1.5;color:#876418;margin:0">
              Contattare il cliente entro 48h per fissare la <strong>video call di onboarding</strong>.
            </p>
          </div>

          <div style="margin-top:20px;display:flex;gap:10px">
            <a href="mailto:${customerEmail}" style="display:inline-block;background:#1d2b3a;color:#fff;font-size:14px;font-weight:600;padding:12px 20px;border-radius:8px;text-decoration:none">Scrivi al cliente</a>
            <a href="https://wa.me/971585971575" style="display:inline-block;background:#25d366;color:#fff;font-size:14px;font-weight:600;padding:12px 20px;border-radius:8px;text-decoration:none">WhatsApp</a>
          </div>
        </div>
      </div>
    `,
  })
}

export async function sendPaymentFailedNotification(customerEmail: string, planLabel: string) {
  if (!resend) return

  await resend.emails.send({
    from: FROM,
    to: REPLY_TO,
    subject: `Pagamento fallito: ${customerEmail} — Piano ${planLabel}`,
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:500px;margin:0 auto">
        <div style="background:#dc2626;padding:20px 24px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;font-size:18px;margin:0">Pagamento fallito</h1>
        </div>
        <div style="background:#fff;padding:24px;border:1px solid #fca5a5;border-top:none;border-radius:0 0 12px 12px">
          <p style="font-size:15px;color:#3a4550;margin:0 0 8px"><strong>Cliente:</strong> ${customerEmail}</p>
          <p style="font-size:15px;color:#3a4550;margin:0 0 16px"><strong>Piano:</strong> ${planLabel}</p>
          <p style="font-size:14px;color:#991b1b;margin:0">Il rinnovo subscription è fallito. Il contratto è stato messo in pausa.</p>
        </div>
      </div>
    `,
  })
}
