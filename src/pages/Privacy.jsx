import { TRUST_NAME } from '../lib/constants'

export default function Privacy() {
  return (
    <main>
      <section className="bg-light-bg py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">Privacy Policy</h1>
        </div>
      </section>
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-sm text-charcoal/80">
          <h2 className="text-navy text-xl font-bold mb-4">Privacy Policy</h2>
          <p className="mb-4">
            {TRUST_NAME} is committed to protecting your privacy. This privacy policy explains
            how we collect, use and safeguard your personal information when you use our website
            and services.
          </p>
          <h3 className="text-navy text-lg font-semibold mt-6 mb-3">Information We Collect</h3>
          <p className="mb-4">
            We may collect personal information such as your name, email address, phone number and
            other details when you fill out contact forms, membership applications or review
            submissions on our website.
          </p>
          <h3 className="text-navy text-lg font-semibold mt-6 mb-3">How We Use Your Information</h3>
          <p className="mb-4">
            Your information is used to respond to your enquiries, process membership applications,
            provide services and improve your experience with our trust. We do not sell or share
            your personal information with third parties for marketing purposes.
          </p>
          <h3 className="text-navy text-lg font-semibold mt-6 mb-3">Data Security</h3>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information from
            unauthorised access, alteration or disclosure.
          </p>
          <h3 className="text-navy text-lg font-semibold mt-6 mb-3">Contact Us</h3>
          <p>
            If you have any questions about this privacy policy, please contact us through
            our contact page.
          </p>
        </div>
      </section>
    </main>
  )
}
