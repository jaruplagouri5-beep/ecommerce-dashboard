// src/app/page.tsx
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function HomePage() { // 1. Add 'async'
  const cookieStore = await cookies();     // 2. Add 'await'
  const token = cookieStore.get('token');

  if (!token) {
    redirect('/auth/login');
  }

  redirect('/dashboard');
}