'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    if (!email || !password) {
      toast.error('Please fill all fields')
      return
    }

    try {
      setLoading(true)

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) throw new Error()

      toast.success('Login successful')
      router.replace('/')
    } catch {
      toast.error('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <div className="w-[360px] rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">

        <h1 className="mb-6 text-center text-xl font-semibold text-white">
          Login
        </h1>

        <div className="space-y-4">
          <input
            className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white outline-none focus:border-blue-500"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white outline-none focus:border-blue-500"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        {/* 🔁 SWITCH TO REGISTER */}
        <p className="mt-5 text-center text-sm text-slate-400">
          Don’t have an account?{' '}
          <button
            onClick={() => router.push('/auth/register')}
            className="text-blue-400 hover:underline"
          >
            Create account
          </button>
        </p>
      </div>
    </div>
  )
}
