import {
  Heart, PawPrint, HeartPulse, GraduationCap, Leaf, Building, ChevronRight
} from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const visionCategories = [
  {
    icon: Heart, title: 'Social Welfare',
    items: ['Old Age Homes', 'Orphanages', 'Shelter Homes', 'Support for homeless and underprivileged people'],
    desc: 'Creating comprehensive support systems for those who need it the most.',
  },
  {
    icon: PawPrint, title: 'Animal Welfare',
    items: ['Gaushalas', 'Animal care and protection'],
    desc: 'Protecting and nurturing animals through dedicated care facilities.',
  },
  {
    icon: HeartPulse, title: 'Healthcare',
    items: ['Hospitals', 'Ayurvedic medicine and treatment centres', 'Affordable healthcare facilities'],
    desc: 'Expanding healthcare infrastructure for accessible and affordable medical care.',
  },
  {
    icon: GraduationCap, title: 'Education',
    items: ['Colleges and educational institutions', 'Educational assistance', 'Skill development'],
    desc: 'Empowering the next generation through quality education and skill development.',
  },
  {
    icon: Leaf, title: 'Agriculture & Environment',
    items: ['Agricultural development', 'Farmer support', 'Tree plantation', 'Environmental protection'],
    desc: 'Promoting sustainable agriculture and environmental conservation.',
  },
  {
    icon: Building, title: 'Culture & Spiritual Activities',
    items: ['Temple development', 'Religious and cultural activities', 'Community celebrations', 'Spiritual awareness programmes'],
    desc: 'Preserving cultural heritage and promoting spiritual well-being.',
  },
]

export default function FutureVision() {
  return (
    <main>
      <section className="bg-light-bg py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">Our Future Vision</h1>
          <p className="text-charcoal/70 text-base md:text-lg max-w-2xl mx-auto">
            Our roadmap for creating a comprehensive social welfare network across India.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Our Vision for a Better Society"
            subtitle="These future expansion plans aim to support people at every stage of life through diverse welfare initiatives."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visionCategories.map((cat, i) => (
              <Card key={i} hover className="flex flex-col">
                <div className="w-12 h-12 bg-saffron/10 rounded-lg flex items-center justify-center mb-4">
                  <cat.icon size={24} className="text-saffron" />
                </div>
                <h3 className="text-navy font-semibold text-lg mb-2">{cat.title}</h3>
                <p className="text-charcoal/70 text-sm mb-4">{cat.desc}</p>
                <ul className="space-y-2 mt-auto">
                  {cat.items.map((item, j) => (
                    <li key={j} className="text-charcoal/70 text-sm flex items-start gap-2">
                      <ChevronRight size={14} className="text-saffron mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-charcoal/50 mt-8 max-w-2xl mx-auto">
            * These are future expansion plans and may not be currently operational services.
            Implementation timelines may vary based on resources and community needs.
          </p>
        </div>
      </section>

      <section className="bg-light-bg py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
            Help Us Build This Vision
          </h2>
          <p className="text-charcoal/70 text-base md:text-lg mb-8">
            Your support and participation can help us bring these plans to life and serve more communities.
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
