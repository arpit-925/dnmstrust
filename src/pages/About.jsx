import {
  HeartPulse, Users, GraduationCap, Leaf, PawPrint, Building,
  Shield, Eye, Target, ChevronRight
} from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const commitments = [
  { icon: HeartPulse, title: 'Affordable Healthcare', desc: 'Providing access to quality healthcare services at affordable rates through our health card programme and medical assistance initiatives.' },
  { icon: Users, title: 'Social & Family Welfare', desc: 'Supporting families during important milestones and providing social welfare assistance to communities in need.' },
  { icon: GraduationCap, title: 'Education & Development', desc: 'Promoting education, skill development and providing educational assistance to deserving students.' },
  { icon: Leaf, title: 'Environmental Protection', desc: 'Working towards a greener future through tree plantation drives, environmental awareness and conservation programmes.' },
  { icon: PawPrint, title: 'Animal Welfare', desc: 'Protecting and caring for animals through gaushalas, rescue initiatives and animal care programmes.' },
  { icon: Building, title: 'Community Development', desc: 'Building stronger communities through infrastructure development, social support and welfare programmes.' },
]

export default function About() {
  return (
    <main>
      {/* Page Header */}
      <section className="bg-light-bg py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">About Us</h1>
          <p className="text-charcoal/70 text-base md:text-lg max-w-2xl mx-auto">
            Learn about our commitment to serving society and building a better tomorrow.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target size={40} className="text-saffron" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">
              Dhirendra Nath Mishra Seva Trust
            </h2>
            <div className="space-y-4 text-charcoal/70 text-base md:text-lg leading-relaxed">
              <p>
                Dhirendra Nath Mishra Seva Trust is an organisation committed to serving
                society and supporting underprivileged communities across India. Founded with
                the vision of creating a just and equitable society, the trust works towards
                providing affordable healthcare, social welfare, education and community
                development.
              </p>
              <p>
                Our mission is rooted in the belief that every individual deserves access to
                basic necessities, quality healthcare and equal opportunities. Through our
                various programmes and initiatives, we strive to make a positive impact on
                the lives of people who need it the most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitments */}
      <section className="bg-light-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Our Commitments"
            subtitle="We are dedicated to making a difference through these key focus areas."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {commitments.map((item, i) => (
              <Card key={i} hover>
                <div className="w-12 h-12 bg-saffron/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-saffron" />
                </div>
                <h3 className="text-navy font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-charcoal/70 text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-light-bg rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-saffron/10 rounded-lg flex items-center justify-center">
                  <Shield size={20} className="text-saffron" />
                </div>
                <h3 className="text-navy font-bold text-xl">Our Mission</h3>
              </div>
              <p className="text-charcoal/70 leading-relaxed">
                To build a society where everyone has access to affordable healthcare,
                quality education, social security and equal opportunities, while promoting
                environmental protection, animal welfare and cultural values.
              </p>
            </div>
            <div className="bg-light-bg rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green/10 rounded-lg flex items-center justify-center">
                  <Eye size={20} className="text-green" />
                </div>
                <h3 className="text-navy font-bold text-xl">Our Vision</h3>
              </div>
              <p className="text-charcoal/70 leading-relaxed">
                To establish a comprehensive social welfare network that supports people
                at every stage of life through healthcare, education, agriculture,
                environmental conservation, cultural activities and humanitarian services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-light-bg py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">Join Our Cause</h2>
          <p className="text-charcoal/70 text-base md:text-lg mb-8">
            Together, we can create lasting change and build a better society for everyone.
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
