import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import { cookies } from 'next/headers'

/* ================= GET (USER + ADMIN) ================= */
export async function GET() {
  await connectDB()

  // 🔓 Everyone who is logged in can view products
  const products = await Product.find().sort({ createdAt: -1 })
  return NextResponse.json(products)
}

/* ================= ADD (ADMIN ONLY) ================= */
export async function POST(req: Request) {
  const role = (await cookies()).get('role')?.value

  // 🔒 Admin check
  if (role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    )
  }

  try {
    const body = await req.json()
    const { name, price, stock, image } = body

    await connectDB()

    const product = await Product.create({
      name,
      price,
      stock,
      image: image || '',
    })

    return NextResponse.json(product, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { error: 'Create failed' },
      { status: 400 }
    )
  }
}

/* ================= UPDATE (ADMIN ONLY) ================= */
export async function PUT(req: Request) {
  const role = (await cookies()).get('role')?.value

  // 🔒 Admin check
  if (role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    )
  }

  try {
    const body = await req.json()
    const { _id, name, price, stock, image } = body

    if (!_id) {
      return NextResponse.json(
        { error: 'Product ID required' },
        { status: 400 }
      )
    }

    await connectDB()

    const updated = await Product.findByIdAndUpdate(
      _id,
      {
        name,
        price,
        stock,
        image,
      },
      { new: true }
    )

    return NextResponse.json(updated)
  } catch (err) {
    return NextResponse.json(
      { error: 'Update failed' },
      { status: 500 }
    )
  }
}

/* ================= DELETE (ADMIN ONLY) ================= */
export async function DELETE(req: Request) {
  const role = (await cookies()).get('role')?.value

  // 🔒 Admin check
  if (role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    )
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { error: 'Product ID required' },
      { status: 400 }
    )
  }

  await connectDB()
  await Product.findByIdAndDelete(id)

  return NextResponse.json({ success: true })
}
