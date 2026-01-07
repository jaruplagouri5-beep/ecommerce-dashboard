import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Admin from '@/models/Admin'

/* ================= GET ================= */
export async function GET() {
  await dbConnect()
  const admins = await Admin.find().sort({ createdAt: -1 })
  return NextResponse.json(admins)
}

/* ================= POST (ADD) ================= */
export async function POST(req: Request) {
  await dbConnect()
  const body = await req.json()

  const admin = await Admin.create(body)
  return NextResponse.json(admin, { status: 201 })
}

/* ================= PUT (EDIT) ================= */
export async function PUT(req: Request) {
  await dbConnect()
  const body = await req.json()

  const updated = await Admin.findByIdAndUpdate(body._id, body, {
    new: true,
  })

  return NextResponse.json(updated)
}

/* ================= DELETE ================= */
export async function DELETE(req: Request) {
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  await Admin.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
