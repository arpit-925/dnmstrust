import { useState, useEffect } from 'react'
import { Upload, Trash2, Eye, EyeOff, X, Plus, Edit3, Image as ImageIcon, Check, Folder } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { GALLERY_CATEGORIES } from '../../lib/constants'
import Button from '../../components/ui/Button'

const initialPhotos = [
  {
    id: 1,
    title: 'Free Community Health Camp',
    description: 'General health checkups, blood pressure monitoring, and basic medicine distribution.',
    category: 'Healthcare Camps',
    event_date: '2024-03-15',
    published: true,
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80',
    album_id: 'a1',
  },
  {
    id: 2,
    title: 'Environmental Tree Plantation Drive',
    description: 'Community sapling plantation drive across village roads and school premises.',
    category: 'Tree Plantation & Environment',
    event_date: '2024-02-20',
    published: true,
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80',
    album_id: 'a2',
  },
  {
    id: 3,
    title: 'Community Marriage Assistance Ceremony',
    description: 'Financial aid and essential household kits gifted to underprivileged couples.',
    category: 'Marriage & Family Welfare',
    event_date: '2024-01-10',
    published: true,
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80',
    album_id: 'a3',
  },
  {
    id: 4,
    title: 'Draft Health Camp Photos (Review Required)',
    description: 'Awaiting final verification before publishing to public album.',
    category: 'Healthcare Camps',
    event_date: '2024-06-05',
    published: false,
    url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=900&q=80',
    album_id: 'a1',
  },
]

export default function AdminGallery() {
  const [photos, setPhotos] = useState([])
  const [albums, setAlbums] = useState([])
  const [showUpload, setShowUpload] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewPhoto, setPreviewPhoto] = useState(null)
  const [editingPhoto, setEditingPhoto] = useState(null)
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    category: '',
    event_date: '',
    album_id: '',
  })
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    event_date: '',
    album_id: '',
    files: [],
  })

  useEffect(() => {
    loadPhotos()
    loadAlbums()
  }, [])

  async function loadPhotos() {
    if (isSupabaseConfigured()) {
      const { data } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('created_at', { ascending: false })
      if (data && data.length > 0) {
        setPhotos(data)
      } else {
        setPhotos(initialPhotos)
      }
    } else {
      const stored = localStorage.getItem('dnm_local_photos')
      if (stored) {
        try {
          setPhotos(JSON.parse(stored))
        } catch {
          setPhotos(initialPhotos)
        }
      } else {
        setPhotos(initialPhotos)
        localStorage.setItem('dnm_local_photos', JSON.stringify(initialPhotos))
      }
    }
  }

  async function loadAlbums() {
    if (isSupabaseConfigured()) {
      const { data } = await supabase.from('albums').select('*').order('name')
      if (data) setAlbums(data)
    } else {
      const stored = localStorage.getItem('dnm_local_albums')
      if (stored) {
        try {
          setAlbums(JSON.parse(stored))
        } catch {
          setAlbums([
            { id: 'a1', name: 'Healthcare Camps 2024' },
            { id: 'a2', name: 'Environment Initiatives' },
            { id: 'a3', name: 'Marriage Welfare Support' },
          ])
        }
      } else {
        const initialAlbums = [
          { id: 'a1', name: 'Healthcare Camps 2024' },
          { id: 'a2', name: 'Environment Initiatives' },
          { id: 'a3', name: 'Marriage Welfare Support' },
        ]
        setAlbums(initialAlbums)
        localStorage.setItem('dnm_local_albums', JSON.stringify(initialAlbums))
      }
    }
  }

  const savePhotos = (updated) => {
    setPhotos(updated)
    if (!isSupabaseConfigured()) {
      localStorage.setItem('dnm_local_photos', JSON.stringify(updated))
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    setUploading(true)

    if (isSupabaseConfigured() && form.files.length > 0) {
      for (const file of form.files) {
        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`
        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(fileName, file, { cacheControl: '3600', upsert: false })

        if (!uploadError) {
          const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName)
          await supabase.from('gallery_photos').insert([
            {
              title: form.title || file.name,
              description: form.description,
              category: form.category || 'Other Activities',
              event_date: form.event_date || null,
              album_id: form.album_id || null,
              url: urlData.publicUrl,
              published: false,
            },
          ])
        }
      }
      loadPhotos()
    } else {
      // Demo mode: Create object URLs for instant display
      const newItems = []
      if (form.files.length > 0) {
        for (let i = 0; i < form.files.length; i++) {
          const f = form.files[i]
          const objUrl = URL.createObjectURL(f)
          newItems.push({
            id: Date.now() + i,
            title: form.files.length > 1 ? `${form.title || 'Photo'} (${i + 1})` : form.title || f.name,
            description: form.description,
            category: form.category || 'Other Activities',
            event_date: form.event_date,
            album_id: form.album_id || null,
            published: false,
            url: objUrl,
          })
        }
      } else {
        newItems.push({
          id: Date.now(),
          title: form.title || 'New Activity Photo',
          description: form.description,
          category: form.category || 'Other Activities',
          event_date: form.event_date,
          album_id: form.album_id || null,
          published: false,
          url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80',
        })
      }
      savePhotos([...newItems, ...photos])
    }

    setForm({ title: '', description: '', category: '', event_date: '', album_id: '', files: [] })
    setShowUpload(false)
    setUploading(false)
  }

  const togglePublish = async (photo) => {
    if (isSupabaseConfigured()) {
      await supabase.from('gallery_photos').update({ published: !photo.published }).eq('id', photo.id)
      loadPhotos()
    } else {
      const updated = photos.map((p) => (p.id === photo.id ? { ...p, published: !p.published } : p))
      savePhotos(updated)
    }
  }

  const deletePhoto = async (photo) => {
    if (!confirm(`Are you sure you want to delete photo "${photo.title}"?`)) return
    if (isSupabaseConfigured()) {
      await supabase.from('gallery_photos').delete().eq('id', photo.id)
      loadPhotos()
    } else {
      const updated = photos.filter((p) => p.id !== photo.id)
      savePhotos(updated)
    }
  }

  const openEditModal = (photo) => {
    setEditingPhoto(photo)
    setEditForm({
      title: photo.title,
      description: photo.description || '',
      category: photo.category || '',
      event_date: photo.event_date || '',
      album_id: photo.album_id || '',
    })
  }

  const handleSaveEdit = async (e) => {
    e.preventDefault()
    if (!editingPhoto) return

    if (isSupabaseConfigured()) {
      await supabase
        .from('gallery_photos')
        .update({
          title: editForm.title,
          description: editForm.description,
          category: editForm.category,
          event_date: editForm.event_date || null,
          album_id: editForm.album_id || null,
        })
        .eq('id', editingPhoto.id)
      loadPhotos()
    } else {
      const updated = photos.map((p) =>
        p.id === editingPhoto.id
          ? {
              ...p,
              title: editForm.title,
              description: editForm.description,
              category: editForm.category,
              event_date: editForm.event_date,
              album_id: editForm.album_id,
            }
          : p
      )
      savePhotos(updated)
    }

    setEditingPhoto(null)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Gallery Management</h1>
          <p className="text-charcoal/60 text-xs md:text-sm mt-0.5">
            Upload, categorize, preview and publish photos for the public gallery.
          </p>
        </div>
        <Button onClick={() => setShowUpload(!showUpload)}>
          <Plus size={16} className="mr-1.5" /> Upload Photos
        </Button>
      </div>

      {/* Upload Modal / Drawer */}
      {showUpload && (
        <div className="bg-white rounded-xl border border-border p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
            <h2 className="text-base font-bold text-navy flex items-center gap-2">
              <Upload size={18} className="text-saffron" /> Upload New Photos
            </h2>
            <button onClick={() => setShowUpload(false)} className="text-charcoal/40 hover:text-charcoal">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy uppercase mb-1">
                  Photo Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30"
                  placeholder="e.g. Free Eye Checkup Camp"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy uppercase mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3.5 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30"
                >
                  <option value="">Select Category</option>
                  {GALLERY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy uppercase mb-1">Event Date</label>
                <input
                  type="date"
                  value={form.event_date}
                  onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                  className="w-full px-3.5 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy uppercase mb-1">Album (Optional)</label>
                <select
                  value={form.album_id}
                  onChange={(e) => setForm({ ...form, album_id: e.target.value })}
                  className="w-full px-3.5 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30"
                >
                  <option value="">No Album Assigned</option>
                  {albums.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy uppercase mb-1">Description / Caption</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full px-3.5 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 resize-none"
                placeholder="Brief caption describing the social welfare activity or event..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy uppercase mb-1">
                Select Photo Files (Multiple Supported)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setForm({ ...form, files: Array.from(e.target.files) })}
                className="w-full text-xs text-charcoal file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-saffron/10 file:text-saffron hover:file:bg-saffron/20 cursor-pointer"
              />
              <p className="text-[11px] text-charcoal/50 mt-1">
                Images are automatically optimized for fast loading across desktop and mobile.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={() => setShowUpload(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={uploading}>
                <Upload size={16} className="mr-2" />
                {uploading ? 'Uploading & Optimizing...' : 'Upload & Save to Drafts'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Photos Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-light-bg border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-charcoal/70 uppercase">Photo</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-charcoal/70 uppercase">Title & Details</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-charcoal/70 uppercase hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-charcoal/70 uppercase hidden md:table-cell">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-charcoal/70 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-charcoal/70 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {photos.map((photo) => (
                <tr key={photo.id} className="border-b border-border last:border-0 hover:bg-gray-50/70 transition-colors">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setPreviewPhoto(photo)}
                      className="w-14 h-11 bg-light-bg rounded-lg overflow-hidden border border-border group relative flex items-center justify-center shrink-0 cursor-zoom-in"
                      title="Click to Preview"
                    >
                      {photo.url ? (
                        <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={18} className="text-charcoal/30" />
                      )}
                      <div className="absolute inset-0 bg-navy/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Eye size={14} className="text-white" />
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-navy">{photo.title}</p>
                    {photo.description && (
                      <p className="text-xs text-charcoal/60 truncate max-w-xs">{photo.description}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs text-charcoal/70">{photo.category}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs text-charcoal/60">{photo.event_date || '—'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        photo.published
                          ? 'bg-green/10 text-green border border-green/20'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {photo.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* Preview Button */}
                      <button
                        onClick={() => setPreviewPhoto(photo)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-charcoal/60 hover:text-navy"
                        title="Preview Photo"
                      >
                        <Eye size={15} />
                      </button>

                      {/* Edit Caption Button */}
                      <button
                        onClick={() => openEditModal(photo)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-charcoal/60 hover:text-navy"
                        title="Edit Caption & Details"
                      >
                        <Edit3 size={15} />
                      </button>

                      {/* Toggle Publish Button */}
                      <button
                        onClick={() => togglePublish(photo)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          photo.published
                            ? 'hover:bg-amber-50 text-green hover:text-amber-600'
                            : 'hover:bg-green/10 text-charcoal/50 hover:text-green'
                        }`}
                        title={photo.published ? 'Unpublish (Make Draft)' : 'Publish to Gallery'}
                      >
                        {photo.published ? <EyeOff size={15} /> : <Check size={15} />}
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => deletePhoto(photo)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-charcoal/40 hover:text-red-600"
                        title="Delete Photo"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {photos.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-charcoal/50 text-sm">
                    No photos found. Click "Upload Photos" to add your first photo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Photo Caption Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-border max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="font-bold text-navy text-lg">Edit Photo Caption & Info</h3>
              <button onClick={() => setEditingPhoto(null)} className="text-charcoal/50 hover:text-charcoal">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy uppercase mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-navy uppercase mb-1">Category</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30"
                  >
                    {GALLERY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy uppercase mb-1">Event Date</label>
                  <input
                    type="date"
                    value={editForm.event_date}
                    onChange={(e) => setEditForm({ ...editForm, event_date: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy uppercase mb-1">Caption / Description</label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-border">
                <Button variant="ghost" onClick={() => setEditingPhoto(null)}>
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

      {/* Preview Photo Modal */}
      {previewPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPreviewPhoto(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] bg-black flex items-center justify-center">
              {previewPhoto.url ? (
                <img src={previewPhoto.url} alt={previewPhoto.title} className="max-h-full max-w-full object-contain" />
              ) : (
                <p className="text-white/40">No image URL</p>
              )}
              <button
                onClick={() => setPreviewPhoto(null)}
                className="absolute top-3 right-3 text-white/80 hover:text-white p-1 rounded-full bg-black/50"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-2 py-0.5 bg-saffron/10 text-saffron rounded">
                  {previewPhoto.category}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    previewPhoto.published ? 'bg-green/10 text-green' : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {previewPhoto.published ? 'Currently Published' : 'Draft (Not visible publicly)'}
                </span>
              </div>
              <h3 className="font-bold text-navy text-lg">{previewPhoto.title}</h3>
              {previewPhoto.description && (
                <p className="text-sm text-charcoal/70 mt-1 leading-relaxed">{previewPhoto.description}</p>
              )}
              {previewPhoto.event_date && (
                <p className="text-xs text-charcoal/50 mt-2">Event Date: {previewPhoto.event_date}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
