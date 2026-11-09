import { TRUST_NAME } from '../lib/constants'

export default function Terms() {
  return (
    <main>
      <section className="bg-light-bg py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">Terms & Conditions</h1>
        </div>
      </section>
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-sm text-charcoal/80">
          <h2 className="text-navy text-xl font-bold mb-4">Terms and Conditions</h2>
          <p className="mb-4">
            By using the website and services of {TRUST_NAME}, you agree to the following
            terms and conditions.
          </p>
          <h3 className="text-navy text-lg font-semibold mt-6 mb-3">Services</h3>
          <p className="mb-4">
            All benefits, discounts, medical assistance and welfare services described on this
            website are subject to applicable terms, eligibility criteria and trust guidelines.
            The trust reserves the right to modify, suspend or discontinue any service or
            programme at any time.
          </p>
          <h3 className="text-navy text-lg font-semibold mt-6 mb-3">Membership</h3>
          <p className="mb-4">
            Membership benefits are available only to verified members. The trust may accept
            or reject membership applications at its discretion. Membership terms are subject
            to the trust's policies and guidelines.
          </p>
          <h3 className="text-navy text-lg font-semibold mt-6 mb-3">Health Card Disclaimer</h3>
          <p className="mb-4">
            The health card programme is not an insurance product. Benefits and medical assistance
            are subject to eligibility, membership terms, and participating provider agreements.
            Coverage amounts and subsidy percentages may vary.
          </p>
          <h3 className="text-navy text-lg font-semibold mt-6 mb-3">Content</h3>
          <p className="mb-4">
            All content on this website is for informational purposes only. Future vision items
            represent planned initiatives and may not be currently operational. The trust is
            not liable for any decisions made based on the information provided on this website.
          </p>
          <h3 className="text-navy text-lg font-semibold mt-6 mb-3">Contact</h3>
          <p>
            For any questions regarding these terms, please contact us through our contact page.
          </p>
        </div>
      </section>
    </main>
  )
}
