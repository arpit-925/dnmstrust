import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { TRUST_NAME, NAV_ITEMS } from '../../lib/constants'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : 'border-b border-border'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/logo.png"
              alt="Dhirendra Nath Mishra Seva Trust Logo"
              className="w-11 h-11 md:w-12 md:h-12 object-contain rounded-full shadow-xs group-hover:scale-105 transition-transform duration-200"
            />
            <div className="hidden sm:block">
              <p className="text-navy font-bold text-sm md:text-base leading-tight group-hover:text-saffron transition-colors">
                Dhirendra Nath Mishra
              </p>
              <p className="text-navy font-semibold text-xs md:text-sm leading-tight opacity-90">
                Seva Trust
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'text-saffron bg-saffron/5'
                    : 'text-charcoal hover:text-saffron hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/membership"
              className="ml-2 px-5 py-2 bg-saffron text-white text-sm font-semibold rounded-lg hover:bg-saffron-dark transition-colors"
            >
              Join Us
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-charcoal hover:text-saffron"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'text-saffron bg-saffron/5'
                    : 'text-charcoal hover:text-saffron hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 px-4">
              <Link
                to="/membership"
                className="block w-full text-center px-5 py-2.5 bg-saffron text-white text-sm font-semibold rounded-lg hover:bg-saffron-dark transition-colors"
              >
                Join Us
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
