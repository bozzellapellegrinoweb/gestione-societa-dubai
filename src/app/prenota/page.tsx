import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BookingWizard from '@/components/booking/BookingWizard'
import { CALL_TYPES } from '@/lib/booking'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prenota una call · PB TAX International',
  description: 'Prenota una consulenza con PB TAX International. Call conoscitiva gratuita o consulenza approfondita, in videochiamata.',
}

export default async function PrenotaPage({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>
}) {
  const { payment } = await searchParams
  const paymentFailed = payment === 'failed'
  const callTypes = CALL_TYPES.map(c => ({
    key: c.key,
    label: c.label,
    description: c.description,
    durationMin: c.durationMin,
    priceAED: c.priceAED,
  }))

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 620, margin: '0 auto', padding: 'clamp(48px,7vw,88px) clamp(18px,4vw,40px) 80px' }}>
        {paymentFailed && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 12, padding: '14px 18px', marginBottom: 28, textAlign: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#991b1b' }}>
              Il pagamento non è andato a buon fine. Riprova la prenotazione o scrivici su WhatsApp.
            </span>
          </div>
        )}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h1 style={{ fontSize: 'clamp(28px,3.6vw,38px)', fontWeight: 800, margin: '0 0 12px', color: '#1d2b3a' }}>Prenota una call</h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#5b6570', margin: 0 }}>
            Parla con un consulente in videochiamata. Ricevi conferma immediata e l&apos;invito al calendario.
          </p>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e6dfd2', borderRadius: 20, padding: 'clamp(22px,4vw,34px)' }}>
          <BookingWizard callTypes={callTypes} />
        </div>
      </main>
      <Footer />
    </>
  )
}
