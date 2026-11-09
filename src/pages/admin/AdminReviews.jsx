import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Trash2, Filter, Star, Edit3, X, Check } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { SERVICE_CATEGORIES } from '../../lib/constants'
import StarRating from '../../components/ui/StarRating'
import Button from '../../components/ui/Button'

const demoReviews = [
  {
    id: 'rev-1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    mobile: '9876543210',
    service: 'Health Card & Medical Assistance',
    rating: 5,
    review: 'The health card programme has been very helpful for my family. We received subsidized healthcare services at a participating hospital. Very grateful to the trust.',
    approved: true,
    created_at: '2024-05-10T10:30:00Z',
  },
  {
    id: 'rev-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    mobile: '',
    service: 'Membership Benefits',
    rating: 4,
    review: 'Becoming a member was a smooth process. The welfare benefits are genuinely helpful for families. I recommend everyone to join.',
    approved: true,
    created_at: '2024-04-22T14:15:00Z',
  },
  {
    id: 'rev-3',
    name: 'Amit Singh',
    email: '',
    mobile: '9876543211',
    service: 'Marriage & Family Welfare',
    rating: 5,
    review: 'The trust provided wonderful support during my sister\'s wedding. The financial assistance was a blessing for our family. Thank you so much.',
    approved: true,
    created_at: '2024-03-15T09:45:00Z',
  },
  {
    id: 'rev-4',
    name: 'Sunita Devi',
    email: '',
    mobile: '9876543212',
    service: 'Social Welfare',
    rating: 5,
    review: 'A truly noble organisation. Their social welfare work in our community has made a real difference. Keep up the great work.',
    approved: true,
    created_at: '2024-02-28T11:20:00Z',
  },
  {
    id: 'rev-5',
    name: 'Vikram Patel',
    email: 'vikram@example.com',
    mobile: '9876543213',
    service: 'Health Card & Medical Assistance',
    rating: 4,
    review: 'Received subsidized medicines and regular checkup assistance. Great initiative for rural areas.',
    approved: false,
    created_at: '2024-06-01T16:00:00Z',
  },
]

export default function AdminReviews() {
  const [reviews, setReviews] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRating, setFilterRating] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [editingReview, setEditingReview] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', review: '', rating: 5, service: '' })

  useEffect(() => {
    loadReviews()
  }, [])

  async function loadReviews() {
    if (isSupabaseConfigured()) {
      const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false })
      if (data) setReviews(data)
    } else {
      // Load from localStorage or demoReviews
      const stored = localStorage.getItem('dnm_local_reviews')
      if (stored) {
        try {
          setReviews(JSON.parse(stored))
        } catch {
          setReviews(demoReviews)
        }
      } else {
        setReviews(demoReviews)
        localStorage.setItem('dnm_local_reviews', JSON.stringify(demoReviews))
      }
    }
  }

  const saveReviewsLocally = (updated) => {
    setReviews(updated)
    if (!isSupabaseConfigured()) {
      localStorage.setItem('dnm_local_reviews', JSON.stringify(updated))
    }
  }

  const approveReview = async (review) => {
    if (isSupabaseConfigured()) {
      await supabase.from('reviews').update({ approved: true }).eq('id', review.id)
      loadReviews()
    } else {
      const updated = reviews.map((r) => (r.id === review.id ? { ...r, approved: true } : r))
      saveReviewsLocally(updated)
    }
  }

  const rejectReview = async (review) => {
    if (isSupabaseConfigured()) {
      await supabase.from('reviews').update({ approved: false }).eq('id', review.id)
      loadReviews()
    } else {
      const updated = reviews.map((r) => (r.id === review.id ? { ...r, approved: false } : r))
      saveReviewsLocally(updated)
    }
  }

  const deleteReview = async (review) => {
    if (!confirm(`Are you sure you want to delete the review by "${review.name}"?`)) return
    if (isSupabaseConfigured()) {
      await supabase.from('reviews').delete().eq('id', review.id)
      loadReviews()
    } else {
      const updated = reviews.filter((r) => r.id !== review.id)
      saveReviewsLocally(updated)
    }
  }

  const openEditModal = (review) => {
    setEditingReview(review)
    setEditForm({
      name: review.name,
      review: review.review,
      rating: review.rating,
      service: review.service || '',
    })
  }

  const handleSaveEdit = async (e) => {
    e.preventDefault()
    if (!editingReview) return

    if (isSupabaseConfigured()) {
      await supabase
        .from('reviews')
        .update({
          name: editForm.name,
          review: editForm.review,
          rating: editForm.rating,
          service: editForm.service,
        })
        .eq('id', editingReview.id)
      loadReviews()
    } else {
      const updated = reviews.map((r) =>
        r.id === editingReview.id
          ? {
              ...r,
              name: editForm.name,
              review: editForm.review,
              rating: editForm.rating,
              service: editForm.service,
            }
          : r
      )
      saveReviewsLocally(updated)
    }

    setEditingReview(null)
  }

  const filtered = reviews.filter((r) => {
    if (filterStatus === 'approved' && !r.approved) return false
    if (filterStatus === 'pending' && r.approved) return false
    if (filterRating !== 'all' && r.rating !== parseInt(filterRating)) return false
    if (filterCategory !== 'all' && r.service !== filterCategory) return false
    return true
  })

  const totalApproved = reviews.filter((r) => r.approved).length
  const totalPending = reviews.filter((r) => !r.approved).length

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Review Moderation</h1>
          <p className="text-charcoal/60 text-xs md:text-sm mt-0.5">
            Moderate, edit and approve community reviews before publishing.
          </p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-border p-4">
          <span className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold">Total Submissions</span>
          <p className="text-2xl font-bold text-navy mt-1">{reviews.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <span className="text-xs text-green uppercase tracking-wider font-semibold">Approved (Live)</span>
          <p className="text-2xl font-bold text-green mt-1">{totalApproved}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <span className="text-xs text-amber-600 uppercase tracking-wider font-semibold">Pending Review</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">{totalPending}</p>
        </div>
      </div>

      {/* Filters: Status, Rating, Category */}
      <div className="bg-white rounded-xl border border-border p-4 mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-charcoal/70">
          <Filter size={14} className="text-saffron" />
          <span>Filters:</span>
        </div>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-1.5 border border-border rounded-lg text-xs md:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-saffron/30"
        >
          <option value="all">All Status ({reviews.length})</option>
          <option value="pending">Pending ({totalPending})</option>
          <option value="approved">Approved ({totalApproved})</option>
        </select>

        {/* Rating Filter */}
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="px-3 py-1.5 border border-border rounded-lg text-xs md:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-saffron/30"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>

        {/* Category Filter */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-1.5 border border-border rounded-lg text-xs md:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-saffron/30"
        >
          <option value="all">All Service Categories</option>
          {SERVICE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {(filterStatus !== 'all' || filterRating !== 'all' || filterCategory !== 'all') && (
          <button
            onClick={() => {
              setFilterStatus('all')
              setFilterRating('all')
              setFilterCategory('all')
            }}
            className="text-xs text-saffron hover:underline font-medium ml-auto"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-light-bg border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-charcoal/70 uppercase">Reviewer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-charcoal/70 uppercase hidden lg:table-cell">Contact (Private)</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-charcoal/70 uppercase">Service</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-charcoal/70 uppercase">Rating</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-charcoal/70 uppercase">Review Content</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-charcoal/70 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-charcoal/70 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((review) => (
                <tr key={review.id} className="border-b border-border last:border-0 hover:bg-gray-50/70 transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-semibold text-navy">{review.name}</p>
                    <p className="text-[11px] text-charcoal/50">
                      {new Date(review.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell text-xs text-charcoal/60">
                    <p>{review.email || '—'}</p>
                    <p>{review.mobile || '—'}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-medium text-navy/80 bg-light-bg px-2 py-0.5 rounded border border-border/60">
                      {review.service}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <StarRating rating={review.rating} size={13} />
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-xs text-charcoal/70 line-clamp-2 max-w-xs leading-relaxed">
                      {review.review}
                    </p>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        review.approved
                          ? 'bg-green/10 text-green border border-green/20'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {review.approved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      {/* Edit Button */}
                      <button
                        onClick={() => openEditModal(review)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-charcoal/60 hover:text-navy transition-colors"
                        title="Edit Review Content"
                      >
                        <Edit3 size={15} />
                      </button>

                      {/* Approve / Reject Toggle */}
                      {!review.approved ? (
                        <button
                          onClick={() => approveReview(review)}
                          className="p-1.5 rounded-lg hover:bg-green/10 text-green transition-colors"
                          title="Approve & Publish Review"
                        >
                          <CheckCircle size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => rejectReview(review)}
                          className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600 transition-colors"
                          title="Unpublish / Move to Pending"
                        >
                          <XCircle size={16} />
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => deleteReview(review)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-charcoal/40 hover:text-red-600 transition-colors"
                        title="Delete Review"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-charcoal/50 text-sm">
                    No reviews match the current filter selection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Review Modal */}
      {editingReview && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-border max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="font-bold text-navy text-lg">Edit Review</h3>
              <button
                onClick={() => setEditingReview(null)}
                className="text-charcoal/50 hover:text-charcoal p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy uppercase mb-1">Reviewer Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy uppercase mb-1">Service Category</label>
                <select
                  value={editForm.service}
                  onChange={(e) => setEditForm({ ...editForm, service: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30"
                >
                  {SERVICE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy uppercase mb-1">Rating</label>
                <StarRating
                  rating={editForm.rating}
                  onRate={(r) => setEditForm({ ...editForm, rating: r })}
                  size={22}
                  interactive
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy uppercase mb-1">Review Text</label>
                <textarea
                  rows={4}
                  required
                  value={editForm.review}
                  onChange={(e) => setEditForm({ ...editForm, review: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-border">
                <Button variant="ghost" onClick={() => setEditingReview(null)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Check size={16} className="mr-1.5" /> Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
