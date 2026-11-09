import { Link } from 'react-router-dom'
import {
  Heart, Users, GraduationCap, Leaf, PawPrint, Building,
  HeartPulse, CreditCard, Handshake, Car, Gift, ChevronRight,
  Shield, Eye, CheckCircle2, Star, ArrowRight, Calendar, AlertCircle
} from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import StarRating from '../components/ui/StarRating'

const commitments = [
  {
    icon: HeartPulse,
    title: 'Affordable Healthcare',
    desc: 'Making quality medical care accessible through subsidized checkups, health card benefits and hospital assistance.',
  },
  {
    icon: Users,
    title: 'Social & Family Welfare',
    desc: 'Supporting economically weaker families, marriage assistance, and community welfare programmes.',
  },
  {
    icon: GraduationCap,
    title: 'Education & Development',
    desc: 'Fostering education, skill development workshops and educational guidance for deserving youth.',
  },
  {
    icon: Leaf,
    title: 'Environmental Protection',
    desc: 'Promoting tree plantation, clean surroundings, and ecological conservation initiatives.',
  },
  {
    icon: PawPrint,
    title: 'Animal Welfare',
    desc: 'Caring for stray and indigenous animals through gaushala support, fodder and medical aid.',
  },
  {
    icon: Building,
    title: 'Community Development',
    desc: 'Strengthening community bonds through inclusive social support and humanitarian outreach.',
  },
]

const healthBenefits = [
  {
    icon: CreditCard,
    title: 'Health Card Membership',
    desc: 'A dedicated membership card providing streamlined access to healthcare benefits and subsidies.',
  },
  {
    icon: HeartPulse,
    title: '10%–50% Subsidies',
    desc: 'Approximately 10%–50% subsidies on eligible medical checkups, diagnostic tests, healthcare services and treatments.',
  },
  {
    icon: Shield,
    title: 'Assistance up to ₹20 Lakh',
    desc: 'Medical assistance and treatment support up to ₹20 lakh, subject to eligibility, membership terms and participating provider agreements.',
  },
  {
    icon: Heart,
    title: 'Affordable Facilities',
    desc: 'Affordable healthcare facilities and guidance for economically weaker and underprivileged families.',
  },
]

const memberBenefits = [
  {
    icon: HeartPulse,
    number: '01',
    title: 'Healthcare & Medical Assistance',
    desc: 'Subsidized clinical checkups, treatment support and tie-ups with participating medical providers.',
  },
  {
    icon: Handshake,
    number: '02',
    title: 'Marriage & Wedding Assistance',
    desc: 'Financial support and subsidies for eligible families during marriages and community wedding ceremonies.',
  },
  {
    icon: Users,
    number: '03',
    title: 'Social Welfare & Community Support',
    desc: 'Guidance, essential relief aid, and social welfare security schemes during emergencies and need.',
  },
  {
    icon: Car,
    number: '04',
    title: 'Car & Bike Purchase Subsidies',
    desc: 'Eligible subsidies on selected car and two-wheeler purchases through authorized participating partners.',
  },
  {
    icon: Gift,
    number: '05',
    title: 'Trust Welfare Schemes',
    desc: 'Priority access to upcoming community programmes, welfare distributions and vocational initiatives.',
  },
]

const visionCategories = [
  {
    icon: Heart,
    title: '1. Social Welfare',
    items: [
      'Old Age Homes for dignified senior care',
      'Orphanages providing love and safety',
      'Shelter Homes for individuals in transition',
      'Support for homeless and underprivileged people',
    ],
  },
  {
    icon: PawPrint,
    title: '2. Animal Welfare',
    items: [
      'Modern Gaushalas with veterinary care',
      'Animal rescue, shelter and nourishment',
      'Stray animal protection and medical treatment',
    ],
  },
  {
    icon: HeartPulse,
    title: '3. Healthcare',
    items: [
      'Charitable multispecialty hospitals',
      'Ayurvedic medicine and holistic treatment centres',
      'Affordable 24/7 emergency & healthcare facilities',
    ],
  },
  {
    icon: GraduationCap,
    title: '4. Education',
    items: [
      'Colleges and modern educational institutions',
      'Scholarships and educational financial assistance',
      'Vocational training and youth skill development',
    ],
  },
  {
    icon: Leaf,
    title: '5. Agriculture & Environment',
    items: [
      'Sustainable agricultural development projects',
      'Farmer assistance and modern farming guidance',
      'Massive tree plantation and water conservation drives',
      'Ecological and environmental protection drives',
    ],
  },
  {
    icon: Building,
    title: '6. Culture & Spiritual Activities',
    items: [
      'Temple development and maintenance',
      'Religious and cultural activities preservation',
      'Community festivals and social celebrations',
      'Spiritual awareness and moral education programmes',
    ],
  },
]

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-saffron/10 border border-saffron/20 rounded-full text-saffron text-xs md:text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-saffron" />
                Dhirendra Nath Mishra Seva Trust • Established for Public Welfare
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-[1.2] mb-6">
                Serving Humanity,{' '}
                <span className="text-saffron">Building a Better Tomorrow</span>
              </h1>
              <p className="text-charcoal/80 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                Dhirendra Nath Mishra Seva Trust is committed to improving lives through
                affordable healthcare, social welfare, education, environmental protection
                and community development.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button to="/services" size="lg">
                  Explore Our Services
                </Button>
                <Button to="/membership" variant="outline" size="lg">
                  Become a Member
                </Button>
              </div>

              {/* Trust highlights counter */}
              <div className="mt-10 pt-8 border-t border-border grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-navy">10-50%</p>
                  <p className="text-xs text-charcoal/60 mt-0.5">Healthcare Subsidies</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-green">₹20 Lakh</p>
                  <p className="text-xs text-charcoal/60 mt-0.5">Treatment Support*</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-saffron">1 Card</p>
                  <p className="text-xs text-charcoal/60 mt-0.5">Multi-Welfare Benefits</p>
                </div>
              </div>
            </div>

            {/* Right Balanced Image */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-light-bg aspect-[4/3] relative">
                  <img
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=80"
                    alt="Community social welfare and humanitarian service"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-medium uppercase tracking-wider text-saffron">Humanitarian Mission</p>
                    <p className="text-sm font-semibold mt-0.5">Dedicated to Uplifting Economically Weaker Families</p>
                  </div>
                </div>

                {/* Sub-badge with Trust Seal */}
                <div className="mt-4 p-4 bg-white rounded-xl border border-border shadow-sm flex items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="DNM Seva Trust Seal"
                    className="w-12 h-12 object-contain rounded-full shadow-xs shrink-0 bg-white"
                  />
                  <div>
                    <p className="text-xs font-bold text-navy">डीएनएम सेवा ट्रस्ट • DNM Seva Trust</p>
                    <p className="text-[11px] text-charcoal/60">Registered charitable organization committed to public welfare</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-light-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="About Us"
            subtitle="Dhirendra Nath Mishra Seva Trust is an organization committed to serving society and supporting underprivileged communities across India."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {commitments.map((item, i) => (
              <Card key={i} hover className="flex flex-col">
                <div className="w-12 h-12 bg-saffron/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-saffron" />
                </div>
                <h3 className="text-navy font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-charcoal/70 text-sm leading-relaxed flex-1">{item.desc}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button to="/about" variant="outline">
              Learn More About Our Trust <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Health Card Section */}
      <section className="bg-white py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Affordable Healthcare for Everyone"
            subtitle="Our health card membership programme makes quality healthcare accessible and affordable for families through subsidized treatments and assistance."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthBenefits.map((item, i) => (
              <Card key={i} hover className="border border-border">
                <div className="w-12 h-12 bg-green/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-green" />
                </div>
                <h3 className="text-navy font-semibold mb-2">{item.title}</h3>
                <p className="text-charcoal/70 text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>

          {/* Important Regulatory Disclaimer */}
          <div className="mt-8 max-w-3xl mx-auto p-4 bg-light-bg rounded-xl border border-border flex items-start gap-3">
            <AlertCircle size={18} className="text-charcoal/50 shrink-0 mt-0.5" />
            <p className="text-xs text-charcoal/70 leading-relaxed">
              <strong>Important Notice:</strong> Benefits, discounts and medical assistance are subject to applicable
              terms, eligibility criteria and participating hospital/provider agreements. These benefits are supported
              through trust initiatives and do not constitute guaranteed commercial insurance coverage.
            </p>
          </div>

          <div className="text-center mt-8">
            <Button to="/health-card" size="lg">
              Know More About Health Card <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="bg-light-bg py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="One Membership, Multiple Welfare Benefits"
            subtitle="Discover how one single membership card opens access to multiple trust-supported welfare initiatives for your entire family."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {memberBenefits.map((item, i) => (
              <Card key={i} hover className="bg-white relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-saffron/10 rounded-lg flex items-center justify-center">
                    <item.icon size={24} className="text-saffron" />
                  </div>
                  <span className="text-xs font-bold text-charcoal/30">{item.number}</span>
                </div>
                <h3 className="text-navy font-semibold mb-2">{item.title}</h3>
                <p className="text-charcoal/70 text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}

            {/* Quick action card */}
            <div className="bg-navy rounded-xl p-6 text-white flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-saffron font-semibold mb-1">Simple Process</p>
                <h3 className="text-lg font-bold mb-2">Join the Movement</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Join hundreds of beneficiaries and socially responsible citizens in our welfare community.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  to="/membership"
                  className="inline-flex items-center gap-2 text-saffron hover:text-white text-sm font-semibold transition-colors"
                >
                  Apply for Membership <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button to="/membership" size="lg">
              Explore All Membership Benefits <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Marriage & Family Welfare */}
      <section className="bg-white py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80"
                  alt="Marriage assistance and family welfare"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <SectionHeading
                title="Supporting Families, Strengthening Communities"
                subtitle="We believe dignified families form the backbone of a compassionate society. Our trust extends a helping hand during life's most momentous occasions."
                centered={false}
              />
              <div className="space-y-4">
                <div className="p-4 bg-light-bg rounded-xl border border-border">
                  <h4 className="font-semibold text-navy text-sm md:text-base mb-1">
                    Financial Assistance & Marriage Subsidies
                  </h4>
                  <p className="text-xs md:text-sm text-charcoal/70 leading-relaxed">
                    Financial assistance and subsidies for eligible families during marriages, helping relieve wedding-related financial strain.
                  </p>
                </div>
                <div className="p-4 bg-light-bg rounded-xl border border-border">
                  <h4 className="font-semibold text-navy text-sm md:text-base mb-1">
                    Support for Economically Weaker Families
                  </h4>
                  <p className="text-xs md:text-sm text-charcoal/70 leading-relaxed">
                    Targeted household welfare supplies, essential kitchen items and emotional support for underprivileged brides and families.
                  </p>
                </div>
                <div className="p-4 bg-light-bg rounded-xl border border-border">
                  <h4 className="font-semibold text-navy text-sm md:text-base mb-1">
                    Community Marriages & Social Welfare Events
                  </h4>
                  <p className="text-xs md:text-sm text-charcoal/70 leading-relaxed">
                    Organizing grand community marriages where couples are joined with dignity, Vedic rituals, blessings and community feasting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Future Vision */}
      <section className="bg-light-bg py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Our Vision for a Better Society"
            subtitle="Our planned expansion initiatives aim to build a comprehensive social welfare umbrella supporting every citizen from childhood to old age."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visionCategories.map((cat, i) => (
              <Card key={i} className="bg-white flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-saffron/10 rounded-lg flex items-center justify-center mb-4">
                    <cat.icon size={24} className="text-saffron" />
                  </div>
                  <h3 className="text-navy font-semibold text-base md:text-lg mb-3">{cat.title}</h3>
                  <ul className="space-y-2">
                    {cat.items.map((item, j) => (
                      <li key={j} className="text-charcoal/70 text-xs md:text-sm flex items-start gap-2">
                        <ChevronRight size={14} className="text-saffron mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <span className="inline-block px-4 py-2 bg-white border border-border rounded-lg text-xs text-charcoal/60">
              * Note: These six categories represent our future expansion roadmap and phased goals, not necessarily all currently operational services.
            </span>
          </div>

          <div className="text-center mt-6">
            <Button to="/future-vision" variant="outline">
              Read Detailed Vision Roadmap <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision Statements */}
      <section className="bg-white py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-light-bg rounded-2xl p-8 md:p-10 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-saffron/10 rounded-lg flex items-center justify-center">
                  <Shield size={20} className="text-saffron" />
                </div>
                <h3 className="text-navy font-bold text-xl">Our Mission</h3>
              </div>
              <p className="text-charcoal/80 text-sm md:text-base leading-relaxed">
                "To build a society where everyone has access to affordable healthcare, quality education,
                social security and equal opportunities, while promoting environmental protection, animal
                welfare and cultural values."
              </p>
            </div>

            <div className="bg-light-bg rounded-2xl p-8 md:p-10 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green/10 rounded-lg flex items-center justify-center">
                  <Eye size={20} className="text-green" />
                </div>
                <h3 className="text-navy font-bold text-xl">Our Vision</h3>
              </div>
              <p className="text-charcoal/80 text-sm md:text-base leading-relaxed">
                "To establish a comprehensive social welfare network that supports people at every stage of
                life through healthcare, education, agriculture, environmental conservation, cultural
                activities and humanitarian services."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Spotlight */}
      <section className="bg-light-bg py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-wider text-saffron font-bold">On Ground Impact</span>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mt-1">Activities & Gallery Spotlight</h2>
              <p className="text-charcoal/70 text-sm mt-1 max-w-xl">
                Snapshots from our free medical camps, tree plantation campaigns, and family assistance events.
              </p>
            </div>
            <Link
              to="/gallery"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron hover:text-saffron-dark transition-colors"
            >
              View All Photos in Gallery <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Free Health Camp',
                img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
                cat: 'Healthcare Camps',
              },
              {
                title: 'Tree Plantation Drive',
                img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
                cat: 'Environment',
              },
              {
                title: 'Marriage Welfare Support',
                img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
                cat: 'Family Welfare',
              },
              {
                title: 'Gaushala Care',
                img: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80',
                cat: 'Animal Welfare',
              },
            ].map((item, i) => (
              <Link
                key={i}
                to="/gallery"
                className="group rounded-xl overflow-hidden border border-border bg-white hover:shadow-md transition-all flex flex-col"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-3.5">
                  <span className="text-[11px] font-semibold text-saffron uppercase">{item.cat}</span>
                  <h3 className="font-semibold text-navy text-sm mt-0.5 group-hover:text-saffron transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Public Reviews Snapshot */}
      <section className="bg-white py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Voices from the Community"
            subtitle="Verified feedback and experiences shared by our members and beneficiaries."
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Rajesh Kumar',
                service: 'Health Card & Medical Assistance',
                rating: 5,
                text: 'The health card programme has been truly beneficial for our family. Subsidized medical checkups and treatment guidance gave us peace of mind.',
              },
              {
                name: 'Priya Sharma',
                service: 'Membership Benefits',
                rating: 5,
                text: 'Enrolling as a member was straightforward. The trust staff is responsive and genuinely committed to societal welfare.',
              },
              {
                name: 'Amit Singh',
                service: 'Marriage & Family Welfare',
                rating: 5,
                text: 'The trust provided invaluable assistance during our family wedding. We are deeply thankful for the compassionate support.',
              },
            ].map((rev, i) => (
              <Card key={i} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold text-navy text-sm">{rev.name}</p>
                    <StarRating rating={rev.rating} size={14} />
                  </div>
                  <span className="inline-block px-2 py-0.5 bg-saffron/10 text-saffron text-[11px] font-medium rounded-full mb-3">
                    {rev.service}
                  </span>
                  <p className="text-xs md:text-sm text-charcoal/70 leading-relaxed italic">"{rev.text}"</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Button to="/reviews" variant="outline">
              Read More Reviews
            </Button>
            <Button to="/reviews" variant="primary">
              Share Your Experience
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-light-bg py-16 md:py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={32} className="text-saffron" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mb-4">
            Be a Part of Our Mission
          </h2>
          <p className="text-charcoal/80 text-base md:text-lg leading-relaxed mb-8">
            "Your support can help us reach more people, provide essential assistance and create meaningful change in society."
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/membership" size="lg">
              Become a Member
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
            <Button to="/about" variant="secondary" size="lg">
              Support Our Mission
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
