'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import ConfiguratorWizard from '@/components/configurator/ConfiguratorWizard'

function ConfiguratoreContent() {
  const searchParams = useSearchParams()
  const paymentFailed = searchParams.get('payment') === 'failed'

  return (
    <>
      {paymentFailed && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: '#fef2f2', borderBottom: '1px solid #fca5a5', padding: '14px 20px', textAlign: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#991b1b' }}>
            Il pagamento non è andato a buon fine. Riprova o contattaci su WhatsApp al +971 585025012.
          </span>
        </div>
      )}
      <ConfiguratorWizard />
    </>
  )
}

export default function ConfiguratorePage() {
  return (
    <Suspense>
      <ConfiguratoreContent />
    </Suspense>
  )
}
