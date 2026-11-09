import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit3, X, Check, Folder } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import Button from '../../components/ui/Button'

const initialAlbums = [
  {
    id: 'a1',
    name: 'Healthcare Camps 2024',
    description: 'Medical checkup drives, eye camps and medicine distribution activities across villages.',
    created_at: '2024-03-01T10:00:00Z',
  },
  {
    id: 'a2',
    name: 'Environment Initiatives',
    description: 'Sapling plantation, rural green drives and water conservation awareness events.',
    created_at: '2024-02-15T11:30:00Z',
  },
  {
    id: 'a3',
    name: 'Marriage Welfare Support',
    description: 'Financial assistance and community wedding ceremonies organized for underprivileged couples.',
    created_at: '2024-01-10T09:00:00Z',
  },
]

export default function AdminAlbums() {
  const [albums, setAlbums] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ name: '', description: '' })

  useEffect(() => {
    loadAlbums()
  }, [])

  async function loadAlbums() {
    if (isSupabaseConfigured()) {
      const { data } = await supabase.from('albums').select('*').order('created_at', { ascending: false })
      if (data && data.length > 0) setAlbums(data)
      else setAlbums(initialAlbums)
    } else {
      const stored = localStorage.getItem('dnm_local_albums')
      if (stored) {
        try {
          setAlbums(JSON.parse(stored))
        } catch {
          setAlbums(initialAlbums)
        }
      } else {
        setAlbums(initialAlbums)
        localStorage.setItem('dnm_local_albums', JSON.stringify(initialAlbums))
      }
    }
  }

  const saveAlbums = (updated) => {
    setAlbums(updated)
    if (!isSupabaseConfigured()) {
      localStorage.setItem('dnm_local_albums', JSON.stringify(updated))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSupabaseConfigured()) {
      if (editingId) {
        await supabase.from('albums').update({ name: form.name, description: form.description }).eq('id', editingId)
      } else {
        await supabase.from('albums').insert([{ name: form.name, description: form.description }])
      }
      loadAlbums()
    } else {
      if (editingId) {
        const updated = albums.map((a) => (a.id === editingId ? { ...a, ...form } : a))
        saveAlbums(updated)
      } else {
        const newAlbum = {
          id: `alb-${Date.now()}`,
          name: form.name,
          description: form.description,
          created_at: new Date().toISOString(),
        }
        saveAlbums([newAlbum, ...albums])
      }
    }
    setForm({ name: '', description: '' })
    setShowForm(false)
    setEditingId(null)
  }

  const handleEdit = (album) => {
    setForm({ name: album.name, description: album.description || '' })
    setEditingId(album.id)
    setShowForm(true)
  }

  const handleDelete = async (album) => {
    if (!confirm(`Are you sure you want to delete the album "${album.name}"?`)) return
    if (isSupabaseConfigured()) {
      await supabase.from('albums').delete().eq('id', album.id)
      loadAlbums()
    } else {
      const updated = albums.filter((a) => a.id !== album.id)
      saveAlbums(updated)
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Album Management</h1>
          <p className="text-charcoal/60 text-xs md:text-sm mt-0.5">
            Group related gallery photos into albums for intuitive public browsing.
          </p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setForm({ name: '', description: '' })
          }}
        >
          <Plus size={16} className="mr-1.5" /> Create New Album
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-border p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
            <h2 className="text-base font-bold text-navy flex items-center gap-2">
              <Folder size={18} className="text-saffron" />
              {editingId ? 'Edit Album' : 'Create New Album'}
            </h2>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
              }}
              className="text-charcoal/40 hover:text-charcoal"
            >
              <X size={18} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy uppercase mb-1">
                Album Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30"
                placeholder="e.g. Healthcare Camps 2024"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy uppercase mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full px-3.5 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 resize-none"
                placeholder="Brief summary of what this album contains..."
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Check size={16} className="mr-1.5" /> {editingId ? 'Update Album' : 'Save Album'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Album List */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-light-bg border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-charcoal/70 uppercase">Album Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-charcoal/70 uppercase hidden md:table-cell">
                Description
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-charcoal/70 uppercase hidden md:table-cell">
                Created
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-charcoal/70 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album) => (
              <tr key={album.id} className="border-b border-border last:border-0 hover:bg-gray-50/70 transition-colors">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-saffron/10 flex items-center justify-center text-saffron shrink-0">
                      <Folder size={16} />
                    </div>
                    <p className="text-sm font-semibold text-navy">{album.name}</p>
                  </div>
                </td>
                <td className="px-4 py-3.5 hidden md:table-cell">
                  <p className="text-xs text-charcoal/60 truncate max-w-sm">{album.description || '—'}</p>
                </td>
                <td className="px-4 py-3.5 hidden md:table-cell">
                  <span className="text-xs text-charcoal/50">
                    {album.created_at
                      ? new Date(album.created_at).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : '—'}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleEdit(album)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-charcoal/60 hover:text-navy transition-colors"
                      title="Edit Album"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(album)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-charcoal/40 hover:text-red-600 transition-colors"
                      title="Delete Album"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {albums.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-charcoal/50 text-sm">
                  No albums created yet. Click "Create New Album" to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
