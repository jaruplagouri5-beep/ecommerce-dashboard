'use client'

import { useEffect, useState } from 'react'
import Notifications from './Notifications'
import Profile from './Profile'
import Search from './Search'

export default function Header() {
  /* ================= ROLE FROM COOKIE ================= */
  const [role, setRole] = useState<'ADMIN' | 'USER' | null>(null)
  const isAdmin = role === 'ADMIN'

  useEffect(() => {
    const roleCookie = document.cookie
      .split('; ')
      .find(c => c.startsWith('role='))
      ?.split('=')[1]

    if (roleCookie === 'ADMIN' || roleCookie === 'USER') {
      setRole(roleCookie)
    }
  }, [])

  // ⛔ Prevent flicker
  if (!role) return null

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
      
      {/* 🔍 Search – ALL USERS */}
      <Search />

      {/* 🔐 RIGHT SIDE – ADMIN ONLY */}
      {isAdmin && (
        <div className="flex items-center gap-4">
          <Notifications />
          <Profile />
        </div>
      )}
    </header>
  )
}
