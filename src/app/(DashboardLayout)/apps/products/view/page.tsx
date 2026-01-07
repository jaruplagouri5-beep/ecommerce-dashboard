'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Product = {
  _id: string
  name: string
  price: number
  stock: number
  image?: string
}

export default function ProductsViewPage() {
  /* ================= ROLE FROM COOKIE ================= */
  const [role, setRole] = useState<'ADMIN' | 'USER' | null>(null)
  const isAdmin = role === 'ADMIN'

  /* ================= STATE ================= */
  const [products, setProducts] = useState<Product[]>([])
  const [editing, setEditing] = useState<Product | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  /* ================= READ ROLE ================= */
  useEffect(() => {
    const roleCookie = document.cookie
      .split('; ')
      .find(c => c.startsWith('role='))
      ?.split('=')[1]

    if (roleCookie === 'ADMIN' || roleCookie === 'USER') {
      setRole(roleCookie)
    }
  }, [])

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    if (!role) return
    fetchProducts()
  }, [role])

  async function fetchProducts() {
    try {
      setLoading(true)
      const res = await fetch('/api/products')
      if (!res.ok) throw new Error()

      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  /* ================= DELETE (ADMIN ONLY) ================= */
  async function deleteProductConfirmed() {
    if (!deleteId || !isAdmin) return

    const toastId = toast.loading('Deleting product...')
    try {
      const res = await fetch(`/api/products?id=${deleteId}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error()

      toast.success('Product deleted', { id: toastId })
      setDeleteId(null)
      fetchProducts()
    } catch {
      toast.error('Delete failed', { id: toastId })
    }
  }

  /* ================= IMAGE UPLOAD (ADMIN ONLY) ================= */
  async function uploadImage(file: File) {
    if (!isAdmin) return ''

    const toastId = toast.loading('Uploading image...')
    try {
      setUploading(true)

      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error()

      const data = await res.json()
      toast.success('Image uploaded', { id: toastId })
      return data.url as string
    } catch {
      toast.error('Image upload failed', { id: toastId })
      return ''
    } finally {
      setUploading(false)
    }
  }

  /* ================= SAVE EDIT (ADMIN ONLY) ================= */
  async function saveEdit() {
    if (!editing || !isAdmin) return

    const toastId = toast.loading('Saving changes...')
    try {
      setSaving(true)

      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      })

      if (!res.ok) throw new Error()

      toast.success('Product updated', { id: toastId })
      setEditing(null)
      fetchProducts()
    } catch {
      toast.error('Update failed', { id: toastId })
    } finally {
      setSaving(false)
    }
  }

  /* ================= LOADING ================= */
  if (!role || loading) {
    return <p className="text-slate-400">Loading products...</p>
  }

  /* ================= UI ================= */
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {/* ===== PRODUCT CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(p => (
          <div
            key={p._id}
            className="rounded-xl overflow-hidden bg-slate-800 border border-slate-700"
          >
            <img
              src={p.image || '/no-image.png'}
              className="h-36 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold truncate">{p.name}</h3>
              <p className="text-sm text-slate-400">
                Stock: {p.stock}
              </p>
              <p className="font-bold mt-1">₹{p.price}</p>

              {/* 🔐 ADMIN ONLY */}
              {isAdmin && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setEditing(p)}
                    className="flex-1 bg-blue-600 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(p._id)}
                    className="flex-1 bg-red-600 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ===== DELETE MODAL (ADMIN ONLY) ===== */}
      {isAdmin && deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-6 rounded-xl w-[360px]">
            <h3 className="text-lg font-bold mb-3">
              Delete Product?
            </h3>
            <p className="text-slate-400 mb-5">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-slate-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={deleteProductConfirmed}
                className="px-4 py-2 bg-red-600 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== EDIT MODAL (ADMIN ONLY) ===== */}
      {isAdmin && editing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-6 rounded-xl w-[420px]">
            <h2 className="text-xl font-bold mb-4">
              Edit Product
            </h2>

            <img
              src={editing.image || '/no-image.png'}
              className="w-full h-40 object-cover rounded mb-3"
            />

            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="edit-image"
              onChange={async e => {
                if (e.target.files?.[0]) {
                  const url = await uploadImage(e.target.files[0])
                  if (url) {
                    setEditing({ ...editing, image: url })
                  }
                }
              }}
            />

            <button
              onClick={() =>
                document.getElementById('edit-image')?.click()
              }
              className="w-full mb-3 bg-slate-700 py-2 rounded"
            >
              Upload New Image
            </button>

            <input
              value={editing.name}
              onChange={e =>
                setEditing({ ...editing, name: e.target.value })
              }
              className="w-full mb-2 p-2 bg-slate-800 rounded"
            />

            <input
              type="number"
              value={editing.price}
              onChange={e =>
                setEditing({
                  ...editing,
                  price: Number(e.target.value),
                })
              }
              className="w-full mb-2 p-2 bg-slate-800 rounded"
            />

            <input
              type="number"
              value={editing.stock}
              onChange={e =>
                setEditing({
                  ...editing,
                  stock: Number(e.target.value),
                })
              }
              className="w-full mb-4 p-2 bg-slate-800 rounded"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-slate-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 rounded"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
