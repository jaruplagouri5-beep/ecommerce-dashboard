'use client'

import { useEffect, useState } from 'react'
import ClientOnly from '@/components/ClientOnly'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Bell } from 'lucide-react'

export default function Notifications() {
  /* ================= ROLE FROM COOKIE ================= */
  const [role, setRole] = useState<'ADMIN' | 'USER' | null>(null)

  useEffect(() => {
    const roleCookie = document.cookie
      .split('; ')
      .find(c => c.startsWith('role='))
      ?.split('=')[1]

    if (roleCookie === 'ADMIN' || roleCookie === 'USER') {
      setRole(roleCookie)
    }
  }, [])

  // ❌ Normal USER ki icon kanipinchakudadhu
  if (role !== 'ADMIN') return null

  return (
    <ClientOnly>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative text-slate-300 hover:text-white transition">
            <Bell className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem>No notifications</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ClientOnly>
  )
}
