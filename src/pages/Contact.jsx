import { useState } from 'react'
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Clock } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import { TRUST_NAME, CONTACT, SOCIAL } from '../lib/constants'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function Contact() {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('contact_messages').insert([
          {
            name: form.name.trim(),
            mobile: form.mobile.trim(),
            email: form.email ? form.email.trim() : null,
            message: form.message.trim(),
            read: false,
          },
        ])
      } catch (err) {
        console.error('Error submitting contact form:', err)
      }
    } else {
      // Demo mode
      const stored = JSON.parse(localStorage.getItem('dnm_local_contacts') || '[]')
      stored.unshift({
        id: Date.now(),
        ...form,
        created_at: new Date().toISOString(),
      })
      localStorage.setItem('dnm_local_contacts', JSON.stringify(stored))
    }

    setSubmitting(false)
    setSubmitted(true)
    setForm({ name: '', mobile: '', email: '', message: '' })
  }

  const cleanWhatsappNumber = CONTACT.whatsapp.replace(/[^0-9]/g, '')

  return (
    <main>
      {/* Page Header */}
      <section className="bg-light-bg py-12 md:py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 bg-saffron/10 text-saffron text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
            Reach Out To Us
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">Contact Us</h1>
          <p className="text-charcoal/70 text-base md:text-lg max-w-2xl mx-auto">
            Have questions about our healthcare cards, membership programmes or social welfare initiatives? We are here to help.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info Column */}
            <div>
              <div className="inline-block px-3 py-1 bg-light-bg border border-border rounded-lg text-xs font-semibold text-navy mb-4">
                {TRUST_NAME}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                We're Here to Support You
              </h2>
              <p className="text-charcoal/70 text-sm md:text-base leading-relaxed mb-8">
                Reach out to our trust office via phone, email, WhatsApp or submit your message below.
                Our volunteers and support staff will assist you with verified information and enrollment guidelines.
              </p>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-white hover:border-saffron/40 transition-colors">
                  <div className="w-10 h-10 bg-saffron/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-saffron" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-charcoal/50">Helpline / Phone Number</p>
                    <a
                      href={`tel:${CONTACT.phone}`}
                      className="text-sm md:text-base font-semibold text-navy hover:text-saffron transition-colors"
                    >
                      {CONTACT.phone}
                    </a>
                    <p className="text-[11px] text-charcoal/50 mt-0.5">Mon to Sat: 9:00 AM – 6:00 PM</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-white hover:border-saffron/40 transition-colors">
                  <div className="w-10 h-10 bg-saffron/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-saffron" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-charcoal/50">Official Email</p>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-sm md:text-base font-semibold text-navy hover:text-saffron transition-colors"
                    >
                      {CONTACT.email}
                    </a>
                    <p className="text-[11px] text-charcoal/50 mt-0.5">We respond within 24–48 working hours</p>
                  </div>
                </div>

                {/* Office Address */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-white hover:border-saffron/40 transition-colors">
                  <div className="w-10 h-10 bg-saffron/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-saffron" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-charcoal/50">Office Address</p>
                    <p className="text-sm md:text-base font-medium text-navy leading-relaxed">
                      {CONTACT.address}
                    </p>
                  </div>
                </div>

                {/* Action Buttons: WhatsApp & Social Channels */}
                <div className="pt-2 space-y-3">
                  <a
                    href={cleanWhatsappNumber ? `https://wa.me/${cleanWhatsappNumber}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:bg-[#20ba59] transition-colors shadow-sm"
                  >
                    <MessageCircle size={18} />
                    <span>Chat with Us on WhatsApp</span>
                  </a>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <span className="text-xs font-semibold uppercase text-charcoal/50">Follow Our Updates:</span>
                    <a
                      href={SOCIAL.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white rounded-lg text-xs font-semibold transition-colors"
                      title="Follow on Facebook"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook</span>
                    </a>
                    <a
                      href={SOCIAL.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E4405F]/10 hover:bg-[#E4405F] text-[#E4405F] hover:text-white rounded-lg text-xs font-semibold transition-colors"
                      title="Follow on Instagram"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div>
              <div className="bg-light-bg rounded-2xl border border-border p-6 md:p-8 shadow-sm">
                <h3 className="text-xl font-bold text-navy mb-2">Send Us a Message</h3>
                <p className="text-xs md:text-sm text-charcoal/70 mb-6">
                  Fill in your details and our team will get in touch with you shortly.
                </p>

                {submitted ? (
                  <div className="bg-white rounded-xl border border-border p-8 text-center">
                    <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-green" />
                    </div>
                    <h4 className="text-navy font-bold text-lg mb-2">Message Received!</h4>
                    <p className="text-charcoal/70 text-sm leading-relaxed mb-6">
                      Thank you for contacting Dhirendra Nath Mishra Seva Trust. A trust representative will review your message and contact you soon.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 text-xs font-semibold text-saffron border border-saffron/30 rounded-lg hover:bg-saffron/10 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy uppercase mb-1.5">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                        placeholder="e.g. Ramesh Kumar"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-navy uppercase mb-1.5">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          required
                          value={form.mobile}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                          placeholder="e.g. 9876543210"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy uppercase mb-1.5">
                          Email Address <span className="text-charcoal/40 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                          placeholder="e.g. ramesh@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy uppercase mb-1.5">
                        Your Message / Enquiry <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron resize-none"
                        placeholder="Please write your questions or how the trust can assist you..."
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={submitting}>
                      <Send size={16} className="mr-2" />
                      {submitting ? 'Sending Message...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Location */}
      {CONTACT.mapEmbedUrl && (
        <section className="bg-light-bg py-12 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
              <iframe
                src={CONTACT.mapEmbedUrl}
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Office Location"
              />
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
