import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy · societa-dubai.it' }

const sections = [
  { title: '1. Data Controller', body: 'PB TAX International Tax Consultants FZCO — Platinum Tower Unit 2503, JLT, Dubai, UAE. Email: info@pbtax.ae' },
  { title: '2. Data Collected', body: 'We collect data provided directly by the user through the configurator (name, email, phone, company details), documents uploaded during onboarding, and anonymous browsing data for analytics. We do not collect special category data within the meaning of GDPR Art. 9.' },
  { title: '3. Purposes of Processing', body: null, list: ['Provision of accounting and tax services requested', 'Management of the contractual relationship', 'Commercial communications (subject to explicit consent)', 'Compliance with UAE and Italian legal obligations', 'Website analytics to improve the service'] },
  { title: '4. Legal Basis (GDPR)', body: 'Performance of a contract (Art. 6.1.b), consent (Art. 6.1.a), legitimate interests (Art. 6.1.f), legal obligation (Art. 6.1.c).' },
  { title: '5. Data Retention', body: 'Contractual data is retained for 10 years in accordance with UAE and Italian regulations. Uploaded documents are retained for the duration of the contractual relationship plus 7 years. Data from configurator sessions that did not result in a contract is retained for 12 months.' },
  { title: '6. International Data Transfers', body: 'Data is processed on Supabase servers (EU region) and may be transferred to the UAE for service delivery, in compliance with the safeguards provided by the GDPR and the UAE Personal Data Protection Law (PDPL).' },
  { title: '7. Your Rights', body: 'You have the right to access, rectify, erase, port, restrict processing of, and object to the processing of your personal data. To exercise your rights, contact us at: privacy@societa-dubai.it or via WhatsApp.' },
  { title: '8. Cookies', body: 'We use technically necessary cookies for the website to function and analytics cookies (Google Analytics 4) subject to your consent. We do not use third-party commercial profiling cookies.' },
]

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(40px,5vw,64px) clamp(18px,4vw,40px) 80px' }}>
        <h1 style={{ fontSize: 'clamp(28px,3.4vw,38px)', fontWeight: 800, margin: '0 0 8px', color: '#1d2b3a' }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, color: '#8a93a0', margin: '0 0 32px' }}>Last updated: June 2026</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {sections.map(s => (
            <div key={s.title}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1d2b3a', margin: '0 0 10px' }}>{s.title}</h2>
              {s.body && <p style={{ fontSize: 15, lineHeight: 1.65, color: '#5b6570', margin: 0 }}>{s.body}</p>}
              {s.list && (
                <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {s.list.map(item => (
                    <li key={item} style={{ fontSize: 15, lineHeight: 1.55, color: '#5b6570' }}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
