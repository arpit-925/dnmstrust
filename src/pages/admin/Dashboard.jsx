import { useState, useEffect } from 'react'
import { Image, FolderOpen, MessageSquare, CheckCircle, Clock, ExternalLink, Settings, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { TRUST_NAME, CONTACT } from '../../lib/constants'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPhotos: 0,
    totalAlbums: 0,
    totalReviews: 0,
    approvedReviews: 0,
    pendingReviews: 0,
  })

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    if (isSupabaseConfigured()) {
      try {
        const [photosRes, albumsRes, reviewsRes, approvedRes, pendingRes] = await Promise.all([
          supabase.from('gallery_photos').select('id', { count: 'exact', head: true }),
          supabase.from('albums').select('id', { count: 'exact', head: true }),
          supabase.from('reviews').select('id', { count: 'exact', head: true }),
          supabase.from('reviews').select('id', { count: 'exact', head: true }).eq('approved', true),
          supabase.from('reviews').select('id', { count: 'exact', head: true }).eq('approved', false),
        ])
        setStats({
          totalPhotos: photosRes.count || 0,
          totalAlbums: albumsRes.count || 0,
          totalReviews: reviewsRes.count || 0,
          approvedReviews: approvedRes.count || 0,
          pendingReviews: pendingRes.count || 0,
        })
      } catch (err) {
        console.error('Error loading stats from Supabase:', err)
      }
    } else {
      // Dynamic calculation from localStorage demo storage
      const photos = JSON.parse(localStorage.getItem('dnm_local_photos') || '[]')
      const albums = JSON.parse(localStorage.getItem('dnm_local_albums') || '[]')
      const reviews = JSON.parse(localStorage.getItem('dnm_local_reviews') || '[]')

      setStats({
        totalPhotos: photos.length || 4,
        totalAlbums: albums.length || 3,
        totalReviews: reviews.length || 5,
        approvedReviews: reviews.filter((r) => r.approved).length || 4,
        pendingReviews: reviews.filter((r) => !r.approved).length || 1,
      })
    }
  }

  const statCards = [
    {
      icon: Image,
      label: 'Gallery Photos',
      value: stats.totalPhotos,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      link: '/admin/gallery',
    },
    {
      icon: FolderOpen,
      label: 'Photo Albums',
      value: stats.totalAlbums,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      link: '/admin/albums',
    },
    {
      icon: MessageSquare,
      label: 'Total Reviews',
      value: stats.totalReviews,
      color: 'bg-saffron/10 text-saffron border-saffron/20',
      link: '/admin/reviews',
    },
    {
      icon: CheckCircle,
      label: 'Approved Reviews',
      value: stats.approvedReviews,
      color: 'bg-green/10 text-green border-green/20',
      link: '/admin/reviews',
    },
    {
      icon: Clock,
      label: 'Pending Reviews',
      value: stats.pendingReviews,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      link: '/admin/reviews',
    },
  ]

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Trust Management Dashboard</h1>
          <p className="text-charcoal/60 text-xs md:text-sm mt-0.5">
            Centralized portal for managing photos, albums, and reviewing community feedback.
          </p>
        </div>
        <Link
          to="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-border text-charcoal/80 text-xs font-semibold rounded-lg hover:text-navy hover:bg-light-bg transition-colors"
        >
          <span>View Live Website</span>
          <ExternalLink size={14} />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((stat, i) => (
          <Link
            key={i}
            to={stat.link}
            className={`bg-white rounded-xl border p-4 hover:shadow-sm transition-all ${stat.color.split(' ')[2] || 'border-border'}`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${stat.color.split(' ').slice(0, 2).join(' ')}`}>
              <stat.icon size={18} />
            </div>
            <p className="text-2xl font-bold text-navy">{stat.value}</p>
            <p className="text-xs text-charcoal/60 mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Main Panels */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {/* Quick Management Actions */}
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
          <h2 className="text-base font-bold text-navy mb-4 flex items-center gap-2">
            <Settings size={18} className="text-saffron" /> Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              to="/admin/gallery"
              className="flex items-center justify-between p-3.5 bg-light-bg rounded-lg hover:bg-gray-100/80 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-saffron/10 flex items-center justify-center text-saffron">
                  <Image size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-navy group-hover:text-saffron transition-colors">
                    Upload & Manage Gallery Photos
                  </p>
                  <p className="text-[11px] text-charcoal/50">Add event pictures, captions, categories and dates</p>
                </div>
              </div>
              <span className="text-xs text-charcoal/40 font-semibold group-hover:text-navy">→</span>
            </Link>

            <Link
              to="/admin/albums"
              className="flex items-center justify-between p-3.5 bg-light-bg rounded-lg hover:bg-gray-100/80 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-purple-50 flex items-center justify-center text-purple-600">
                  <FolderOpen size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-navy group-hover:text-purple-600 transition-colors">
                    Manage Photo Albums
                  </p>
                  <p className="text-[11px] text-charcoal/50">Create, organize and edit albums</p>
                </div>
              </div>
              <span className="text-xs text-charcoal/40 font-semibold group-hover:text-navy">→</span>
            </Link>

            <Link
              to="/admin/reviews"
              className="flex items-center justify-between p-3.5 bg-light-bg rounded-lg hover:bg-gray-100/80 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-green/10 flex items-center justify-center text-green">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-navy group-hover:text-green transition-colors">
                    Moderate Community Reviews
                  </p>
                  <p className="text-[11px] text-charcoal/50">
                    Approve, edit or reject submitted testimonials ({stats.pendingReviews} pending)
                  </p>
                </div>
              </div>
              <span className="text-xs text-charcoal/40 font-semibold group-hover:text-navy">→</span>
            </Link>
          </div>
        </div>

        {/* Content Management & System Info */}
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
          <h2 className="text-base font-bold text-navy mb-4 flex items-center gap-2">
            <ShieldCheck size={18} className="text-green" /> Organization & Website Config
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-charcoal/70">Trust Organization</span>
              <span className="font-semibold text-navy">{TRUST_NAME}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-charcoal/70">Database & Storage Engine</span>
              <span
                className={`font-semibold px-2 py-0.5 rounded ${
                  isSupabaseConfigured()
                    ? 'bg-green/10 text-green'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {isSupabaseConfigured() ? 'Supabase Connected' : 'Local Storage Mode'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-charcoal/70">Trust Contact Phone</span>
              <span className="font-medium text-navy">{CONTACT.phone}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-charcoal/70">Official Email</span>
              <span className="font-medium text-navy">{CONTACT.email}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-charcoal/70">Review Moderation Policy</span>
              <span className="font-semibold text-green">Admin Approval Required Before Public Display</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
