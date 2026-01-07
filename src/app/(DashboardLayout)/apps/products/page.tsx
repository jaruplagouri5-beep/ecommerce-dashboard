'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ProductsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Products</h1>

      <div className="flex gap-4">
        {/* FIXED ROUTE */}
        <Link href="/apps/products/add">
          <Button>+ Add Product</Button>
        </Link>

        <Link href="/apps/products/view">
          <Button variant="secondary">View Products</Button>
        </Link>
      </div>
    </div>
  )
}
