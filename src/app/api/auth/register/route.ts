import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/user';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: 'User already exists' },
      { status: 400 }
    );
  }

  await User.create({
    email,
    password, // ✅ plain text
  });

  return NextResponse.json({ success: true });
}
