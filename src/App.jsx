import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'
import { CONTACT } from './lib/constants'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const HealthCard = lazy(() => import('./pages/HealthCard'))
const Membership = lazy(() => import('./pages/Membership'))
const FutureVision = lazy(() => import('./pages/FutureVision'))
const Contact = lazy(() => import('./pages/Contact'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Reviews = lazy(() => import('./pages/Reviews'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'))
const AdminAlbums = lazy(() => import('./pages/admin/AdminAlbums'))
const AdminReviews = lazy(() => import('./pages/admin/AdminReviews'))

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-saffron border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

// Public layout with header, footer and floating WhatsApp action
function PublicLayout({ children }) {
  const cleanWa = CONTACT.whatsapp.replace(/[^0-9]/g, '')

  return (
    <>
      <Header />
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
      <Footer />
      {/* Floating WhatsApp Quick Action */}
      <a
        href={`https://wa.me/${cleanWa}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:bg-[#20ba59] transition-all duration-300 flex items-center gap-2 group hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="Chat on WhatsApp"
        title="Chat with Dhirendra Nath Mishra Seva Trust on WhatsApp"
      >
        <MessageCircle size={22} className="fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-semibold">
          Chat on WhatsApp
        </span>
      </a>
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/health-card" element={<PublicLayout><HealthCard /></PublicLayout>} />
        <Route path="/membership" element={<PublicLayout><Membership /></PublicLayout>} />
        <Route path="/future-vision" element={<PublicLayout><FutureVision /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
        <Route path="/reviews" element={<PublicLayout><Reviews /></PublicLayout>} />
        <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
        <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminLogin />
            </Suspense>
          }
        />
        <Route
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route path="/admin/dashboard" element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>} />
          <Route path="/admin/gallery" element={<Suspense fallback={<PageLoader />}><AdminGallery /></Suspense>} />
          <Route path="/admin/albums" element={<Suspense fallback={<PageLoader />}><AdminAlbums /></Suspense>} />
          <Route path="/admin/reviews" element={<Suspense fallback={<PageLoader />}><AdminReviews /></Suspense>} />
        </Route>
      </Routes>
    </>
  )
}
