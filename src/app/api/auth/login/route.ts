import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/models/user'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  await connectDB()

  const user = await User.findOne({ email })

  if (!user || user.password !== password) {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    )
  }

  // ✅ SUCCESS
  const response = NextResponse.json({ success: true })

  // 🔐 AUTH TOKEN
  response.cookies.set({
    name: 'token',
    value: user._id.toString(),
    httpOnly: true,
    path: '/',
  })

  // 🔐 ROLE COOKIE (VERY IMPORTANT)
  response.cookies.set({
    name: 'role',
    value: user.role.toUpperCase(), // ADMIN | USER
    httpOnly: false, // client can read
    path: '/',
  })

  return response
}
