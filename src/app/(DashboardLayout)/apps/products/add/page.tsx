'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { z } from 'zod'

/* ================= ZOD SCHEMA ================= */
const productSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  price: z.preprocess(
    (v) => Number(v),
    z.number().gt(0, 'Price must be greater than zero')
  ),
  stock: z.preprocess(
    (v) => Number(v),
    z.number().min(0, 'Stock cannot be negative')
  ),
})

export default function AddProductPage() {
  const router = useRouter()

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // FORM STATE (strings only)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [image, setImage] = useState('')

  /* ================= IMAGE UPLOAD ================= */
  async function uploadImage(file: File) {
    const toastId = toast.loading('Uploading image...')
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error()

      const data = await res.json()
      setImage(data.url)
      toast.success('Image uploaded successfully', { id: toastId })
    } catch {
      toast.error('Image upload failed', { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  /* ================= STEP 1 ================= */
  function goToStep2() {
    const result = productSchema.safeParse({ name, price, stock })

    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    setError(null)
    setStep(2)
  }

  /* ================= STEP 2 ================= */
  function goToStep3() {
    if (!image) {
      setError('Please upload product image')
      return
    }

    setError(null)
    setStep(3)
  }

  /* ================= SUBMIT ================= */
  async function submitProduct() {
    const toastId = toast.loading('Saving product...')
    setLoading(true)

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          price: Number(price),
          stock: Number(stock),
          image,
        }),
      })

      if (!res.ok) throw new Error()

      toast.success('Product added successfully', { id: toastId })
      router.push('/apps/products/view')
    } catch {
      toast.error('Failed to add product', { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      {/* ================= PROGRESS ================= */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded ${
              step >= s ? 'bg-blue-600' : 'bg-slate-700'
            }`}
          />
        ))}
      </div>

      {/* ================= STEP 1 ================= */}
      {step === 1 && (
        <div className="space-y-4">
          <input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-800 border px-4 py-2 rounded"
          />

          <input
            type="number"
            placeholder="Price"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-slate-800 border px-4 py-2 rounded"
          />

          <input
            type="number"
            placeholder="Stock"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full bg-slate-800 border px-4 py-2 rounded"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            disabled={loading}
            onClick={goToStep2}
            className="bg-blue-600 px-6 py-2 rounded text-white disabled:opacity-60"
          >
            Next
          </button>
        </div>
      )}

      {/* ================= STEP 2 ================= */}
      {step === 2 && (
        <div>
          <Image
            src={image || '/no-image.png'}
            alt="Preview"
            width={400}
            height={200}
            className="rounded mb-4"
          />

          <input
            type="file"
            accept="image/*"
            disabled={loading}
            onChange={(e) =>
              e.target.files && uploadImage(e.target.files[0])
            }
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep(1)}>Back</button>
            <button
              disabled={loading}
              onClick={goToStep3}
              className="bg-blue-600 px-6 py-2 rounded text-white disabled:opacity-60"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3 ================= */}
      {step === 3 && (
        <div className="bg-slate-800 p-6 rounded-xl">
          <Image
            src={image || '/no-image.png'}
            alt={name}
            width={200}
            height={200}
            className="rounded mb-4"
          />

          <p><b>Name:</b> {name}</p>
          <p><b>Price:</b> ₹{price}</p>
          <p><b>Stock:</b> {stock}</p>

          <div className="flex gap-4 mt-6">
            <button onClick={() => setStep(2)}>Back</button>
            <button
              disabled={loading}
              onClick={submitProduct}
              className="bg-green-600 px-6 py-2 rounded text-white disabled:opacity-60"
            >
              {loading ? 'Saving...' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
