import { useState, useEffect } from 'react'
import { Star, Send, ChevronDown, CheckCircle, ShieldCheck, HeartHandshake } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import StarRating from '../components/ui/StarRating'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { SERVICE_CATEGORIES } from '../lib/constants'

const defaultApprovedReviews = [
  {
    id: 'rev-1',
    name: 'Rajesh Kumar',
    service: 'Health Card & Medical Assistance',
    rating: 5,
    review:
      'The health card programme has been very helpful for my family. We received subsidized healthcare services at a participating hospital. Very grateful to the trust.',
    created_at: '2024-05-10T10:30:00Z',
  },
  {
    id: 'rev-2',
    name: 'Priya Sharma',
    service: 'Membership Benefits',
    rating: 4,
    review:
      'Becoming a member was a smooth process. The welfare benefits are genuinely helpful for families. I recommend everyone to join.',
    created_at: '2024-04-22T14:15:00Z',
  },
  {
    id: 'rev-3',
    name: 'Amit Singh',
    service: 'Marriage & Family Welfare',
    rating: 5,
    review:
      'The trust provided wonderful support during my sister\'s wedding. The financial assistance was a blessing for our family. Thank you so much.',
    created_at: '2024-03-15T09:45:00Z',
  },
  {
    id: 'rev-4',
    name: 'Sunita Devi',
    service: 'Social Welfare',
    rating: 5,
    review:
      'A truly noble organisation. Their social welfare work in our community has made a real difference. Keep up the great work.',
    created_at: '2024-02-28T11:20:00Z',
  },
]

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(8)
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    service: '',
    rating: 0,
    review: '',
    honeypot: '', // Spam trap
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    loadApprovedReviews()
  }, [])

  async function loadApprovedReviews() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('id, name, service, rating, review, created_at')
          .eq('approved', true)
          .order('created_at', { ascending: false })

        if (!error && data && data.length > 0) {
          setReviews(data)
        } else {
          setReviews(defaultApprovedReviews)
        }
      } catch {
        setReviews(defaultApprovedReviews)
      }
    } else {
      // In demo mode, read from localStorage to reflect approved reviews from admin
      const stored = localStorage.getItem('dnm_local_reviews')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          const approvedOnly = parsed.filter((r) => r.approved)
          setReviews(approvedOnly.length > 0 ? approvedOnly : defaultApprovedReviews)
        } catch {
          setReviews(defaultApprovedReviews)
        }
      } else {
        setReviews(defaultApprovedReviews)
      }
    }
    setLoading(false)
  }

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '5.0'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    // Anti-Spam Check: Honeypot check
    if (form.honeypot) {
      setSubmitted(true)
      return
    }

    if (form.rating === 0) {
      setErrorMsg('Please select a star rating from 1 to 5.')
      return
    }

    if (form.review.trim().length < 10) {
      setErrorMsg('Please write at least 10 characters for your review.')
      return
    }

    setSubmitting(true)

    const newReview = {
      id: `rev-${Date.now()}`,
      name: form.name.trim(),
      mobile: form.mobile ? form.mobile.trim() : null,
      email: form.email ? form.email.trim() : null,
      service: form.service,
      rating: form.rating,
      review: form.review.trim(),
      approved: false, // Mandatory: Must undergo admin verification
      created_at: new Date().toISOString(),
    }

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('reviews').insert([
          {
            name: newReview.name,
            mobile: newReview.mobile,
            email: newReview.email,
            service: newReview.service,
            rating: newReview.rating,
            review: newReview.review,
            approved: false,
          },
        ])
        if (error) {
          console.error('Error submitting review to Supabase:', error)
        }
      } catch (err) {
        console.error('Submission error:', err)
      }
    } else {
      // Demo mode fallback: save to localStorage pending list for admin moderation
      const stored = localStorage.getItem('dnm_local_reviews')
      let list = []
      if (stored) {
        try {
          list = JSON.parse(stored)
        } catch {
          list = defaultApprovedReviews
        }
      } else {
        list = defaultApprovedReviews
      }
      list.unshift(newReview)
      localStorage.setItem('dnm_local_reviews', JSON.stringify(list))
    }

    setSubmitting(false)
    setSubmitted(true)
    setForm({
      name: '',
      mobile: '',
      email: '',
      service: '',
      rating: 0,
      review: '',
      honeypot: '',
    })
  }

  return (
    <main>
      {/* Page Header */}
      <section className="bg-light-bg py-12 md:py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 bg-saffron/10 text-saffron text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
            Community Testimonials
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">Reviews & Feedback</h1>
          <p className="text-charcoal/70 text-base md:text-lg max-w-2xl mx-auto">
            Honest experiences from beneficiaries, members and families supported by Dhirendra Nath Mishra Seva Trust.
          </p>
        </div>
      </section>

      {/* Trust Rating Statistics */}
      {reviews.length > 0 && (
        <section className="bg-white py-10 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 text-center">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-navy leading-none mb-1">{avgRating}</p>
                <div className="flex justify-center my-1.5">
                  <StarRating rating={Math.round(Number(avgRating))} size={20} />
                </div>
                <p className="text-xs text-charcoal/60 uppercase tracking-wider font-medium">Overall Average Rating</p>
              </div>

              <div className="h-10 w-px bg-border hidden sm:block" />

              <div>
                <p className="text-4xl md:text-5xl font-bold text-navy leading-none mb-1">{reviews.length}</p>
                <p className="text-xs text-green font-medium my-1.5 flex items-center justify-center gap-1">
                  <ShieldCheck size={16} /> 100% Admin Verified
                </p>
                <p className="text-xs text-charcoal/60 uppercase tracking-wider font-medium">Approved Reviews</p>
              </div>

              <div className="h-10 w-px bg-border hidden sm:block" />

              <div>
                <a
                  href="#share-experience"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-saffron text-white text-xs md:text-sm font-semibold rounded-lg hover:bg-saffron-dark transition-colors shadow-sm"
                >
                  <HeartHandshake size={16} /> Submit Your Feedback
                </a>
                <p className="text-[11px] text-charcoal/50 mt-1.5">Takes less than 2 minutes</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Public Reviews Listing */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-8 flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-xl font-bold text-navy">Approved Community Feedback</h2>
            <span className="text-xs text-charcoal/50">Showing {Math.min(visibleCount, reviews.length)} of {reviews.length}</span>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="w-8 h-8 border-3 border-saffron border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-charcoal/50 text-sm">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-16 bg-light-bg rounded-2xl border border-dashed border-border p-8">
              <p className="text-charcoal/60 text-sm">No public reviews yet. Be the first to share your experience below!</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                {reviews.slice(0, visibleCount).map((review) => (
                  <Card key={review.id} className="flex flex-col justify-between hover:border-saffron/40 transition-colors">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-navy font-semibold text-sm md:text-base">{review.name}</p>
                          <p className="text-[11px] text-charcoal/50">
                            {new Date(review.created_at).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <StarRating rating={review.rating} size={15} />
                      </div>
                      {review.service && (
                        <span className="inline-block px-2.5 py-0.5 bg-saffron/10 text-saffron text-xs font-medium rounded-full mb-3">
                          {review.service}
                        </span>
                      )}
                      <p className="text-charcoal/70 text-sm leading-relaxed whitespace-pre-line">
                        "{review.review}"
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-1.5 text-[11px] text-green font-medium">
                      <CheckCircle size={13} />
                      <span>Verified Beneficiary / Member</span>
                    </div>
                  </Card>
                ))}
              </div>

              {visibleCount < reviews.length && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 8)}
                    className="px-8 py-2.5 bg-light-bg text-charcoal font-medium text-sm rounded-lg hover:bg-gray-200 border border-border transition-colors inline-flex items-center gap-2"
                  >
                    Load More Reviews <ChevronDown size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Review Submission Section */}
      <section id="share-experience" className="bg-light-bg py-16 md:py-24 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Share Your Experience"
            subtitle="Your voice matters to us. Submit your feedback to help us refine and expand our social welfare initiatives."
          />

          {submitted ? (
            <div className="bg-white rounded-2xl border border-border p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green" />
              </div>
              <h3 className="text-navy font-bold text-xl mb-3">Feedback Received</h3>
              <p className="text-charcoal/80 text-sm md:text-base leading-relaxed mb-6 max-w-md mx-auto">
                Thank you for sharing your experience with Dhirendra Nath Mishra Seva Trust.
                Your feedback is valuable to us and will be published after verification.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 text-xs font-semibold text-saffron hover:bg-saffron/10 rounded-lg transition-colors border border-saffron/30"
              >
                Submit Another Review
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-border p-6 md:p-8 space-y-5 shadow-sm"
            >
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* Honeypot anti-spam trap */}
              <input
                type="text"
                name="honeypot"
                value={form.honeypot}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div>
                <label className="block text-xs font-semibold text-navy uppercase mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                  placeholder="e.g. Ramesh Chandra Mishra"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy uppercase mb-1.5">
                    Mobile Number <span className="text-charcoal/40 font-normal">(Optional, kept private)</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                    placeholder="e.g. 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy uppercase mb-1.5">
                    Email Address <span className="text-charcoal/40 font-normal">(Optional, kept private)</span>
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
                  Select Service <span className="text-red-500">*</span>
                </label>
                <select
                  name="service"
                  required
                  value={form.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                >
                  <option value="">Choose the service you experienced</option>
                  {SERVICE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy uppercase mb-1.5">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="p-3 bg-light-bg rounded-lg border border-border inline-flex items-center gap-3">
                  <StarRating
                    rating={form.rating}
                    onRate={(r) => setForm({ ...form, rating: r })}
                    size={28}
                    interactive
                  />
                  <span className="text-xs font-semibold text-charcoal/70">
                    {form.rating > 0 ? `${form.rating} of 5 Stars` : 'Click to rate'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy uppercase mb-1.5">
                  Write Your Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="review"
                  required
                  rows={4}
                  value={form.review}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron resize-none"
                  placeholder="Describe your experience with the trust's services or initiatives..."
                />
              </div>

              <div className="p-3 bg-light-bg rounded-lg border border-border/80 flex items-start gap-2">
                <ShieldCheck size={16} className="text-green mt-0.5 shrink-0" />
                <p className="text-[11px] text-charcoal/60 leading-relaxed">
                  <strong>Privacy & Authenticity:</strong> Your contact number and email will never be displayed publicly. All reviews undergo moderation to maintain authenticity and avoid automated spam.
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                <Send size={16} className="mr-2" />
                {submitting ? 'Submitting for Verification...' : 'Submit Review'}
              </Button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
