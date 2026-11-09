import {
  CreditCard, HeartPulse, Shield, Heart, CheckCircle, ChevronRight, AlertCircle
} from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const benefits = [
  { icon: CreditCard, title: 'Health Card Membership', desc: 'A dedicated health membership card that provides access to healthcare benefits through our programme.' },
  { icon: HeartPulse, title: '10%–50% Healthcare Subsidies', desc: 'Approximately 10%–50% subsidies on eligible medical checkups, healthcare services and treatments.' },
  { icon: Shield, title: 'Medical Assistance up to ₹20 Lakh', desc: 'Medical assistance and treatment support up to ₹20 lakh, subject to eligibility, membership terms and agreements.' },
  { icon: Heart, title: 'Support for Weaker Families', desc: 'Affordable healthcare facilities and assistance specifically for economically weaker families.' },
]

const features = [
  'Access to participating hospitals and healthcare centres',
  'Subsidized medical checkups and diagnostic tests',
  'Medical assistance for eligible treatments',
  'Support for hospitalisation expenses (subject to terms)',
  'Family coverage options available',
  'Simple application and renewal process',
]

export default function HealthCard() {
  return (
    <main>
      <section className="bg-light-bg py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">Health Card Programme</h1>
          <p className="text-charcoal/70 text-base md:text-lg max-w-2xl mx-auto">
            Affordable healthcare for everyone through our dedicated health card membership programme.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Affordable Healthcare for Everyone"
            subtitle="Our health card programme is designed to make quality healthcare accessible and affordable."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item, i) => (
              <Card key={i} hover>
                <div className="w-12 h-12 bg-green/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-green" />
                </div>
                <h3 className="text-navy font-semibold mb-2">{item.title}</h3>
                <p className="text-charcoal/70 text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light-bg py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading title="What's Included" />
          <div className="bg-white rounded-2xl border border-border p-8 md:p-10">
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-green mt-0.5 shrink-0" />
                  <span className="text-charcoal/80 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-saffron/5 border border-saffron/20 rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-saffron mt-0.5 shrink-0" />
              <div>
                <h4 className="text-navy font-semibold mb-2">Important Information</h4>
                <p className="text-charcoal/70 text-sm leading-relaxed">
                  Benefits, discounts and medical assistance mentioned above are subject to the applicable
                  terms and conditions, eligibility criteria and participating hospital/provider agreements.
                  The health card programme is not an insurance product and should not be considered as
                  guaranteed insurance coverage. Coverage amounts, subsidy percentages and available services
                  may vary based on membership type, provider availability and programme guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light-bg py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">Get Your Health Card Today</h2>
          <p className="text-charcoal/70 text-base md:text-lg mb-8">
            Join our health card programme and access affordable healthcare for you and your family.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/membership" size="lg">Apply for Health Card</Button>
            <Button to="/contact" variant="outline" size="lg">Enquire Now</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
