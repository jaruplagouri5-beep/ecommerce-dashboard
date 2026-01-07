'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function EditProductPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    if (!id) return

    async function fetchProduct() {
      const res = await fetch(`/api/products?id=${id}`)
      const data = await res.json()

      setName(data.name)
      setPrice(data.price)
      setStock(data.stock)
      setImage(data.image || '')
    }

    fetchProduct()
  }, [id])

  /* ================= IMAGE UPLOAD ================= */
  async function handleImageUpload(file: File) {
    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    setImage(data.url)

    setUploading(false)
  }

  /* ================= UPDATE PRODUCT ================= */
  async function updateProduct() {
    await fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        name,
        price: Number(price),
        stock: Number(stock),
        image,
      }),
    })

    router.push('/apps/products/view')
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      {/* Name */}
      <input
        className="w-full mb-3 px-3 py-2 border rounded"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Price */}
      <input
        className="w-full mb-3 px-3 py-2 border rounded"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* Stock */}
      <input
        className="w-full mb-4 px-3 py-2 border rounded"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      {/* Image Preview */}
      <div className="mb-4">
        <img
          src={image || '/no-image.png'}
          className="w-40 h-40 object-cover rounded border"
        />
      </div>

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleImageUpload(e.target.files[0])
          }
        }}
      />

      {uploading && <p className="text-sm mt-2">Uploading image...</p>}

      {/* Save */}
      <button
        onClick={updateProduct}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  )
}
