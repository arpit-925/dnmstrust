import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Lock } from 'lucide-react'
import { TRUST_NAME, CONTACT } from '../../lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-saffron rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-lg font-serif">D</span>
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">Dhirendra Nath Mishra</p>
                <p className="font-semibold text-xs leading-tight opacity-80">Seva Trust</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Committed to improving lives through affordable healthcare, social welfare,
              education, environmental protection and community development.
            </p>
            <p className="text-xs text-saffron font-medium">
              सेवा ही परम धर्म है • Registered Charitable Trust
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-white border-b border-white/10 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Health Card Programme', path: '/health-card' },
                { label: 'Membership Benefits', path: '/membership' },
                { label: 'Photo Gallery', path: '/gallery' },
                { label: 'Reviews & Feedback', path: '/reviews' },
                { label: 'Our Future Vision', path: '/future-vision' },
                { label: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-300 hover:text-saffron transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-white border-b border-white/10 pb-2">
              Key Focus Areas
            </h3>
            <ul className="space-y-2.5">
              {[
                'Affordable Healthcare & Camps',
                'Health Card Subsidies (10%–50%)',
                'Marriage & Wedding Assistance',
                'Economically Weaker Family Aid',
                'Education & Youth Development',
                'Animal Care & Gaushala Support',
                'Tree Plantation & Conservation',
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm text-gray-300 hover:text-saffron transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-white border-b border-white/10 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-saffron mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-gray-400 block">Phone</span>
                  <a href={`tel:${CONTACT.phone}`} className="text-sm text-gray-200 hover:text-saffron transition-colors">
                    {CONTACT.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-saffron mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-gray-400 block">Email</span>
                  <a href={`mailto:${CONTACT.email}`} className="text-sm text-gray-200 hover:text-saffron transition-colors">
                    {CONTACT.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-saffron mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-gray-400 block">Head Office</span>
                  <span className="text-sm text-gray-300 leading-relaxed block">
                    {CONTACT.address}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs md:text-sm text-gray-400 text-center md:text-left">
              © {currentYear} {TRUST_NAME}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link to="/privacy" className="text-xs md:text-sm text-gray-400 hover:text-saffron transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs md:text-sm text-gray-400 hover:text-saffron transition-colors">
                Terms & Conditions
              </Link>
              <Link
                to="/admin"
                className="text-xs md:text-sm text-gray-400 hover:text-saffron transition-colors inline-flex items-center gap-1"
                title="Trust Administrator Access"
              >
                <Lock size={12} />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
