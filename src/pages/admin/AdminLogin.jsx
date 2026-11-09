import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import Button from '../../components/ui/Button'
import { TRUST_NAME } from '../../lib/constants'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!isSupabaseConfigured()) {
      // Demo mode: allow any login
      localStorage.setItem('dnm_admin_demo', 'true')
      navigate('/admin/dashboard')
      return
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
      } else if (data.user) {
        navigate('/admin/dashboard')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-light-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="DNM Seva Trust Logo"
            className="w-20 h-20 object-contain rounded-full mx-auto mb-4 bg-white shadow-md p-1 border border-border"
          />
          <h1 className="text-2xl font-bold text-navy">Admin Login</h1>
          <p className="text-charcoal/60 text-sm mt-1">{TRUST_NAME}</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-border p-6 md:p-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          {!isSupabaseConfigured() && (
            <div className="bg-saffron/10 border border-saffron/20 rounded-lg px-4 py-3 text-saffron text-sm">
              Demo mode: Supabase not configured. Enter any credentials to access the demo dashboard.
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </main>
  )
}
