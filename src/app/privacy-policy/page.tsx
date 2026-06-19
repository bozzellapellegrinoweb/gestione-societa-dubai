import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy · societa-dubai.it' }

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-cream mb-2">Privacy Policy</h1>
        <p className="text-gray-soft mb-8 text-sm">Last updated: June 2026</p>
        <div className="space-y-6 text-gray-soft text-sm leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">1. Data Controller</h2>
            <p>PB TAX International Tax Consultants FZCO — Platinum Tower Unit 2503, JLT, Dubai, UAE. Email: info@pbtax.ae</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">2. Data Collected</h2>
            <p>We collect data provided directly by the user through the configurator (name, email, phone, company details), documents uploaded during onboarding, and anonymous browsing data for analytics. We do not collect special category data within the meaning of GDPR Art. 9.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">3. Purposes of Processing</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provision of accounting and tax services requested</li>
              <li>Management of the contractual relationship</li>
              <li>Commercial communications (subject to explicit consent)</li>
              <li>Compliance with UAE and Italian legal obligations</li>
              <li>Website analytics to improve the service</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">4. Legal Basis (GDPR)</h2>
            <p>Performance of a contract (Art. 6.1.b), consent (Art. 6.1.a), legitimate interests (Art. 6.1.f), legal obligation (Art. 6.1.c).</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">5. Data Retention</h2>
            <p>Contractual data is retained for 10 years in accordance with UAE and Italian regulations. Uploaded documents are retained for the duration of the contractual relationship plus 7 years. Data from configurator sessions that did not result in a contract is retained for 12 months.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">6. International Data Transfers</h2>
            <p>Data is processed on Supabase servers (EU region) and may be transferred to the UAE for service delivery, in compliance with the safeguards provided by the GDPR and the UAE Personal Data Protection Law (PDPL).</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">7. Your Rights</h2>
            <p>You have the right to access, rectify, erase, port, restrict processing of, and object to the processing of your personal data. To exercise your rights, contact us at: privacy@societa-dubai.it or via WhatsApp.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream mb-2">8. Cookies</h2>
            <p>We use technically necessary cookies for the website to function and analytics cookies (Google Analytics 4) subject to your consent. We do not use third-party commercial profiling cookies.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
