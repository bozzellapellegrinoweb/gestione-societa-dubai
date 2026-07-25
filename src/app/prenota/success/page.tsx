import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Prenotazione confermata · PB TAX International' }

async function getBooking(id: string) {
  if (!id || !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
    const { data } = await supabase
      .from('bookings')
      .select('call_label,start_at,duration_min,status,meet_link')
      .eq('id', id)
      .single()
    return data
  } catch {
    return null
  }
}

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ booking?: string }>
}) {
  const { booking: bookingId } = await searchParams
  const booking = bookingId ? await getBooking(bookingId) : null

  const when = booking
    ? new Intl.DateTimeFormat('it-IT', {
        weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dubai',
      }).format(new Date(booking.start_at))
    : null

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 620, margin: '0 auto', padding: 'clamp(60px,8vw,100px) clamp(18px,4vw,40px) 80px', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#e8f3ec', color: '#2f8a5b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, margin: '0 auto 24px' }}>✓</div>
        <h1 style={{ fontSize: 'clamp(28px,3.6vw,38px)', fontWeight: 800, margin: '0 0 14px', color: '#1d2b3a' }}>Prenotazione confermata!</h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: '#5b6570', margin: '0 0 12px' }}>
          Grazie. Il pagamento è andato a buon fine e la tua call è stata prenotata.
        </p>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, color: '#3a4550', margin: '0 0 32px', fontWeight: 500 }}>
          Ti abbiamo inviato una email con i dettagli e l&apos;invito al calendario con il link della videochiamata.
        </p>

        {booking && when && (
          <div style={{ background: '#faf8f3', border: '1px solid #e6dfd2', borderRadius: 16, padding: '22px 24px', marginBottom: 28, textAlign: 'left' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#a9885e', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>Il tuo appuntamento</div>
            <div style={{ fontSize: 16, color: '#1d2b3a', marginBottom: 6 }}><strong>{booking.call_label}</strong></div>
            <div style={{ fontSize: 15, color: '#3a4550', textTransform: 'capitalize' }}>{when} · {booking.duration_min} min (ora di Dubai)</div>
            {booking.meet_link && (
              <a href={booking.meet_link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 16, background: '#1d8a4e', color: '#fff', fontSize: 14, fontWeight: 700, padding: '11px 20px', borderRadius: 10, textDecoration: 'none' }}>
                Apri la video call →
              </a>
            )}
          </div>
        )}

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ background: '#1d2b3a', color: '#fff', fontSize: 16, fontWeight: 600, padding: '14px 28px', borderRadius: 12, textDecoration: 'none' }}>
            Torna alla home
          </Link>
          <Link href="https://wa.me/971585971575" target="_blank" style={{ background: '#fff', color: '#1d8a4e', border: '1.5px solid #d6ddd6', fontSize: 16, fontWeight: 600, padding: '14px 28px', borderRadius: 12, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Scrivici su WhatsApp
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
