import { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Image, MessageSquare, FolderOpen, LogOut, Menu, X, ChevronLeft
} from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Image, label: 'Gallery', path: '/admin/gallery' },
  { icon: FolderOpen, label: 'Albums', path: '/admin/albums' },
  { icon: MessageSquare, label: 'Reviews', path: '/admin/reviews' },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    if (isSupabaseConfigured()) {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/admin')
        return
      }
      setUser(user)
    } else {
      // Demo mode
      const isDemo = localStorage.getItem('dnm_admin_demo')
      if (!isDemo) {
        navigate('/admin')
        return
      }
      setUser({ email: 'demo@admin.com' })
    }
  }

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut()
    } else {
      localStorage.removeItem('dnm_admin_demo')
    }
    navigate('/admin')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-light-bg flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-border transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-border">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="DNM Seva Trust Logo"
                className="w-9 h-9 object-contain rounded-full bg-white shadow-xs shrink-0"
              />
              <div>
                <p className="text-navy font-bold text-sm leading-tight">DNM Seva Trust</p>
                <p className="text-xs text-charcoal/50">Admin Panel</p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-saffron/10 text-saffron'
                    : 'text-charcoal/70 hover:bg-gray-50 hover:text-navy'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-3 border-t border-border">
            <div className="px-3 py-2 mb-2">
              <p className="text-xs text-charcoal/50 truncate">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-border px-4 py-3 flex items-center gap-3 lg:px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1 text-charcoal">
            <Menu size={22} />
          </button>
          <Link to="/" className="text-sm text-charcoal/50 hover:text-saffron flex items-center gap-1">
            <ChevronLeft size={14} /> Back to Website
          </Link>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
