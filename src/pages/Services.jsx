import {
  HeartPulse, Users, GraduationCap, Leaf, PawPrint, Handshake,
  CreditCard, Building, ChevronRight
} from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const services = [
  {
    icon: HeartPulse,
    title: 'Healthcare & Medical Assistance',
    desc: 'Affordable healthcare services through our health card programme, medical assistance up to ₹20 lakh (subject to eligibility), and subsidized medical checkups.',
    link: '/health-card',
    color: 'green',
  },
  {
    icon: CreditCard,
    title: 'Health Card Programme',
    desc: 'A dedicated health card offering approximately 10%–50% subsidies on eligible medical checkups and healthcare services through participating providers.',
    link: '/health-card',
    color: 'green',
  },
  {
    icon: Handshake,
    title: 'Marriage & Family Welfare',
    desc: 'Financial assistance during marriages, support for economically weaker families, and community marriage events.',
    color: 'saffron',
  },
  {
    icon: Users,
    title: 'Social Welfare & Community Support',
    desc: 'Various social welfare programmes aimed at supporting underprivileged communities and individuals.',
    color: 'saffron',
  },
  {
    icon: GraduationCap,
    title: 'Education & Skill Development',
    desc: 'Promoting education through assistance programmes, skill development initiatives and support for deserving students.',
    color: 'saffron',
  },
  {
    icon: PawPrint,
    title: 'Animal Welfare',
    desc: 'Animal care and protection through gaushalas and rescue initiatives to ensure animal well-being.',
    color: 'green',
  },
  {
    icon: Leaf,
    title: 'Environmental Protection',
    desc: 'Tree plantation drives, environmental awareness campaigns and conservation programmes for a greener future.',
    color: 'green',
  },
  {
    icon: Building,
    title: 'Cultural & Spiritual Activities',
    desc: 'Temple development, religious and cultural events, community celebrations and spiritual awareness programmes.',
    color: 'saffron',
  },
]

export default function Services() {
  return (
    <main>
      <section className="bg-light-bg py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">Our Services</h1>
          <p className="text-charcoal/70 text-base md:text-lg max-w-2xl mx-auto">
            Explore the various welfare programmes and services offered by our trust.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <Card key={i} hover>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  service.color === 'green' ? 'bg-green/10' : 'bg-saffron/10'
                }`}>
                  <service.icon size={24} className={service.color === 'green' ? 'text-green' : 'text-saffron'} />
                </div>
                <h3 className="text-navy font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-charcoal/70 text-sm leading-relaxed mb-4">{service.desc}</p>
                {service.link && (
                  <Button to={service.link} variant="ghost" size="sm">
                    Learn More <ChevronRight size={14} className="ml-1" />
                  </Button>
                )}
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-charcoal/50 mt-8 max-w-2xl mx-auto">
            * All benefits and services are subject to applicable terms, eligibility criteria
            and trust guidelines. Some services listed are part of future expansion plans.
          </p>
        </div>
      </section>

      <section className="bg-light-bg py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
            Want to Access Our Services?
          </h2>
          <p className="text-charcoal/70 text-base md:text-lg mb-8">
            Become a member of Dhirendra Nath Mishra Seva Trust and access multiple welfare benefits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/membership" size="lg">Become a Member</Button>
            <Button to="/contact" variant="outline" size="lg">Contact Us</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
