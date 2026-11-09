import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Lock } from 'lucide-react'
import { TRUST_NAME, CONTACT, SOCIAL } from '../../lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="DNM Seva Trust Logo"
                className="w-12 h-12 object-contain rounded-full bg-white p-0.5 shadow-xs shrink-0"
              />
              <div>
                <p className="font-bold text-sm leading-tight">Dhirendra Nath Mishra</p>
                <p className="font-semibold text-xs leading-tight opacity-80">Seva Trust</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              Committed to improving lives through affordable healthcare, social welfare,
              education, environmental protection and community development.
            </p>
            <p className="text-xs text-saffron font-medium mb-4">
              सेवा ही परम धर्म है • Registered Charitable Trust
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs text-gray-400">Follow:</span>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors"
                title="Follow us on Facebook"
                aria-label="Facebook Page"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E4405F] text-white flex items-center justify-center transition-colors"
                title="Follow us on Instagram"
                aria-label="Instagram Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
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
