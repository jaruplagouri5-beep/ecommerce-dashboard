'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    document.cookie = 'auth=; Max-Age=0; path=/'
    document.cookie = 'role=; Max-Age=0; path=/'
    router.push('/auth/login')
  }, [])

  return null
}
