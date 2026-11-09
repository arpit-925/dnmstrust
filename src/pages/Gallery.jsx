import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Calendar, Filter, Folder, Image as ImageIcon } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { GALLERY_CATEGORIES } from '../lib/constants'

// Initial authentic demo data showcasing trust activities
const demoPhotos = [
  {
    id: 1,
    title: 'Free Community Health Camp',
    description: 'General health checkups, blood pressure monitoring, and basic medicine distribution for rural families.',
    category: 'Healthcare Camps',
    event_date: '2024-03-15',
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80',
    album_name: 'Healthcare Camps 2024',
    album_id: 'a1',
  },
  {
    id: 2,
    title: 'Environmental Tree Plantation Drive',
    description: 'Community sapling plantation drive across village roads and school premises to promote ecological balance.',
    category: 'Tree Plantation & Environment',
    event_date: '2024-02-20',
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80',
    album_name: 'Environment Initiatives',
    album_id: 'a2',
  },
  {
    id: 3,
    title: 'Community Marriage Assistance Ceremony',
    description: 'Financial aid and essential household kits gifted to underprivileged couples at a community wedding.',
    category: 'Marriage & Family Welfare',
    event_date: '2024-01-10',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80',
    album_name: 'Marriage Welfare Support',
    album_id: 'a3',
  },
  {
    id: 4,
    title: 'Gaushala Fodder & Medical Care Visit',
    description: 'Periodic health checkup for cows and donation of green fodder at the community gaushala.',
    category: 'Animal Welfare',
    event_date: '2024-04-05',
    url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=900&q=80',
    album_name: 'Animal Care & Gaushala',
    album_id: 'a4',
  },
  {
    id: 5,
    title: 'Cultural Heritage & Community Utsav',
    description: 'Traditional cultural event and spiritual discourse organized for local elders and families.',
    category: 'Cultural & Religious Events',
    event_date: '2024-05-12',
    url: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=900&q=80',
    album_name: 'Cultural Celebrations',
    album_id: 'a5',
  },
  {
    id: 6,
    title: 'Essential Ration & Warm Cloth Distribution',
    description: 'Distributing warm blankets and dry food rations to elderly and underprivileged residents.',
    category: 'Social Welfare Activities',
    event_date: '2024-06-18',
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80',
    album_name: 'Social Welfare 2024',
    album_id: 'a6',
  },
  {
    id: 7,
    title: 'Senior Citizen Health & Wellness Camp',
    description: 'Specialist eye examinations, geriatric counselling, and free reading glasses distribution.',
    category: 'Healthcare Camps',
    event_date: '2024-07-22',
    url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=900&q=80',
    album_name: 'Healthcare Camps 2024',
    album_id: 'a1',
  },
  {
    id: 8,
    title: 'Youth Skill & Educational Book Distribution',
    description: 'Study materials, notebooks and career mentoring provided for students from rural backgrounds.',
    category: 'Social Welfare Activities',
    event_date: '2024-08-14',
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
    album_name: 'Social Welfare 2024',
    album_id: 'a6',
  },
]

const demoAlbums = [
  { id: 'all', name: 'All Albums' },
  { id: 'a1', name: 'Healthcare Camps 2024' },
  { id: 'a2', name: 'Environment Initiatives' },
  { id: 'a3', name: 'Marriage Welfare Support' },
  { id: 'a4', name: 'Animal Care & Gaushala' },
  { id: 'a5', name: 'Cultural Celebrations' },
  { id: 'a6', name: 'Social Welfare 2024' },
]

export default function Gallery() {
  const [photos, setPhotos] = useState([])
  const [albums, setAlbums] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeAlbum, setActiveAlbum] = useState('all')
  const [lightbox, setLightbox] = useState(null)
  const [visibleCount, setVisibleCount] = useState(12)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    if (isSupabaseConfigured()) {
      try {
        const [photosRes, albumsRes] = await Promise.all([
          supabase
            .from('gallery_photos')
            .select('*, albums:album_id(name)')
            .eq('published', true)
            .order('event_date', { ascending: false }),
          supabase.from('albums').select('*').order('name'),
        ])

        if (!photosRes.error && photosRes.data && photosRes.data.length > 0) {
          setPhotos(
            photosRes.data.map((p) => ({
              ...p,
              album_name: p.albums?.name || '',
            }))
          )
        } else {
          setPhotos(demoPhotos)
        }

        if (!albumsRes.error && albumsRes.data && albumsRes.data.length > 0) {
          setAlbums([{ id: 'all', name: 'All Albums' }, ...albumsRes.data])
        } else {
          setAlbums(demoAlbums)
        }
      } catch {
        setPhotos(demoPhotos)
        setAlbums(demoAlbums)
      }
    } else {
      setPhotos(demoPhotos)
      setAlbums(demoAlbums)
    }
    setLoading(false)
  }

  const categories = ['All', ...GALLERY_CATEGORIES]

  const filteredPhotos = photos.filter((p) => {
    const matchCategory = activeCategory === 'All' || p.category === activeCategory
    const matchAlbum = activeAlbum === 'all' || p.album_id === activeAlbum || p.album_name === activeAlbum
    return matchCategory && matchAlbum
  })

  const displayedPhotos = filteredPhotos.slice(0, visibleCount)

  const openLightbox = (index) => setLightbox(index)
  const closeLightbox = () => setLightbox(null)
  const prevPhoto = () => setLightbox((prev) => (prev > 0 ? prev - 1 : displayedPhotos.length - 1))
  const nextPhoto = () => setLightbox((prev) => (prev < displayedPhotos.length - 1 ? prev + 1 : 0))

  return (
    <main>
      {/* Page Header */}
      <section className="bg-light-bg py-12 md:py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 bg-saffron/10 text-saffron text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
            Activities & Initiatives
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">Photo Gallery</h1>
          <p className="text-charcoal/70 text-base md:text-lg max-w-2xl mx-auto">
            A visual journey of our social welfare camps, healthcare initiatives, family support, and community development.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Controls: Category Filter + Album Filter */}
          <div className="space-y-4 mb-10">
            {/* Category pills */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-charcoal/60 uppercase tracking-wide">
                <Filter size={14} className="text-saffron" />
                <span>Filter by Category:</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat)
                      setVisibleCount(12)
                    }}
                    className={`px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                      activeCategory === cat
                        ? 'bg-saffron text-white shadow-sm'
                        : 'bg-light-bg text-charcoal/80 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Album pills */}
            {albums.length > 1 && (
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-charcoal/60 uppercase tracking-wide">
                  <Folder size={14} className="text-green" />
                  <span>Filter by Album:</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {albums.map((alb) => (
                    <button
                      key={alb.id}
                      onClick={() => {
                        setActiveAlbum(alb.id)
                        setVisibleCount(12)
                      }}
                      className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        activeAlbum === alb.id
                          ? 'bg-navy text-white'
                          : 'bg-white border border-border text-charcoal/70 hover:bg-light-bg'
                      }`}
                    >
                      <Folder size={12} className={activeAlbum === alb.id ? 'text-white' : 'text-charcoal/40'} />
                      {alb.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Counter */}
          <div className="flex justify-between items-center mb-6 text-xs text-charcoal/60 border-b border-border pb-3">
            <p>
              Showing <span className="font-semibold text-navy">{displayedPhotos.length}</span> of{' '}
              <span className="font-semibold text-navy">{filteredPhotos.length}</span> photos
            </p>
            {(activeCategory !== 'All' || activeAlbum !== 'all') && (
              <button
                onClick={() => {
                  setActiveCategory('All')
                  setActiveAlbum('all')
                }}
                className="text-saffron hover:underline text-xs font-medium"
              >
                Reset Filters
              </button>
            )}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-3 border-saffron border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-charcoal/50 text-sm">Loading gallery photos...</p>
            </div>
          ) : displayedPhotos.length === 0 ? (
            <div className="text-center py-20 bg-light-bg rounded-2xl border border-dashed border-border p-8">
              <ImageIcon size={36} className="text-charcoal/30 mx-auto mb-3" />
              <p className="text-navy font-semibold text-base mb-1">No photos found</p>
              <p className="text-charcoal/60 text-sm mb-4">No photos match the selected filter combination.</p>
              <button
                onClick={() => {
                  setActiveCategory('All')
                  setActiveAlbum('all')
                }}
                className="px-4 py-2 bg-saffron text-white text-xs font-semibold rounded-lg hover:bg-saffron-dark transition-colors"
              >
                Show All Photos
              </button>
            </div>
          ) : (
            <>
              {/* Photo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    onClick={() => openLightbox(index)}
                    className="group cursor-pointer rounded-xl overflow-hidden border border-border bg-white hover:shadow-md hover:border-saffron/40 transition-all duration-200 flex flex-col"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
                      {photo.url ? (
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-light-bg text-charcoal/40 text-xs">
                          {photo.title}
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium rounded">
                          {photo.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-navy text-sm line-clamp-1 group-hover:text-saffron transition-colors">
                          {photo.title}
                        </h3>
                        {photo.description && (
                          <p className="text-xs text-charcoal/60 line-clamp-2 mt-1 leading-relaxed">
                            {photo.description}
                          </p>
                        )}
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px] text-charcoal/50">
                        {photo.event_date ? (
                          <span className="flex items-center gap-1">
                            <Calendar size={11} className="text-saffron" />
                            {new Date(photo.event_date).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        ) : (
                          <span />
                        )}
                        {photo.album_name && (
                          <span className="truncate max-w-[120px] text-charcoal/60">
                            {photo.album_name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Option */}
              {visibleCount < filteredPhotos.length && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="px-8 py-2.5 bg-light-bg text-charcoal hover:bg-gray-200 border border-border font-medium text-sm rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    Load More Photos ({filteredPhotos.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox !== null && displayedPhotos[lightbox] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 z-10 transition-colors"
            aria-label="Close"
          >
            <X size={26} />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevPhoto()
            }}
            className="absolute left-3 md:left-6 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 z-10 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextPhoto()
            }}
            className="absolute right-3 md:right-6 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 z-10 transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={36} />
          </button>

          {/* Modal Content */}
          <div
            className="max-w-4xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[68vh] bg-black flex items-center justify-center overflow-hidden">
              {displayedPhotos[lightbox].url ? (
                <img
                  src={displayedPhotos[lightbox].url}
                  alt={displayedPhotos[lightbox].title}
                  className="max-h-[68vh] w-auto max-w-full object-contain"
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center text-white/40">
                  {displayedPhotos[lightbox].title}
                </div>
              )}
            </div>
            <div className="p-5 bg-white border-t border-border">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-semibold px-2 py-0.5 bg-saffron/10 text-saffron rounded">
                  {displayedPhotos[lightbox].category}
                </span>
                {displayedPhotos[lightbox].event_date && (
                  <span className="text-xs text-charcoal/50 flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(displayedPhotos[lightbox].event_date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                )}
              </div>
              <h2 className="font-bold text-navy text-lg">{displayedPhotos[lightbox].title}</h2>
              {displayedPhotos[lightbox].description && (
                <p className="text-sm text-charcoal/70 mt-1 leading-relaxed">
                  {displayedPhotos[lightbox].description}
                </p>
              )}
              {displayedPhotos[lightbox].album_name && (
                <p className="text-xs text-charcoal/50 mt-2 flex items-center gap-1">
                  <Folder size={12} className="text-green" /> Album: {displayedPhotos[lightbox].album_name}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
