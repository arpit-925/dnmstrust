import {
  HeartPulse, Handshake, Users, Car, Gift, CheckCircle,
  ChevronRight, CreditCard
} from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const benefits = [
  { icon: HeartPulse, title: 'Healthcare & Medical Assistance', desc: 'Access to healthcare benefits through the trust\'s health card programme with subsidized medical services.' },
  { icon: Handshake, title: 'Marriage & Wedding Assistance', desc: 'Financial assistance and subsidies for eligible families during marriages and wedding ceremonies.' },
  { icon: Users, title: 'Social Welfare & Community Support', desc: 'Access to various social welfare schemes, community support programmes and assistance during need.' },
  { icon: Car, title: 'Vehicle Purchase Subsidies', desc: 'Eligible subsidies on selected car and bike purchases through participating partners and dealers.' },
  { icon: Gift, title: 'Other Welfare Schemes', desc: 'Access to other trust-supported welfare schemes, benefits and programmes as they are introduced.' },
]

export default function Membership() {
  return (
    <main>
      <section className="bg-light-bg py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">Membership</h1>
          <p className="text-charcoal/70 text-base md:text-lg max-w-2xl mx-auto">
            One membership, multiple welfare benefits for you and your family.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="One Membership, Multiple Welfare Benefits"
            subtitle="A single membership card provides access to various trust-supported welfare initiatives and programmes."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((item, i) => (
              <Card key={i} hover>
                <div className="w-12 h-12 bg-saffron/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-saffron" />
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
          <SectionHeading title="How to Become a Member" />
          <div className="space-y-6">
            {[
              { step: '1', title: 'Contact Us', desc: 'Reach out to us through our contact page, phone or visit our office to express your interest.' },
              { step: '2', title: 'Submit Application', desc: 'Complete the membership application form with the required documents and details.' },
              { step: '3', title: 'Verification', desc: 'Our team will verify your application and eligibility for the membership programme.' },
              { step: '4', title: 'Receive Membership Card', desc: 'Upon approval, you will receive your membership card with access to all welfare benefits.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-xl border border-border p-6">
                <div className="w-10 h-10 bg-saffron rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-navy font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-charcoal/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">Ready to Join?</h2>
          <p className="text-charcoal/70 text-base md:text-lg mb-8">
            Contact us today to learn more about our membership programme and start accessing welfare benefits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/contact" size="lg">Contact Us to Join</Button>
            <Button to="/health-card" variant="outline" size="lg">Learn About Health Card</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
