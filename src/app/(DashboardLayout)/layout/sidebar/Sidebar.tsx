'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import SimpleBar from 'simplebar-react'
import { Icon } from '@iconify/react'
import {
  AMSidebar,
  AMMenu,
  AMMenuItem,
  AMSubmenu,
} from 'tailwind-sidebar'
import 'tailwind-sidebar/styles.css'

import SidebarContent from './sidebaritems'
import { useEffect, useState } from 'react'

/* ================= TYPES ================= */
interface SidebarItem {
  heading?: string
  id?: number | string
  name?: string
  icon?: string
  url?: string
  children?: SidebarItem[]
  adminOnly?: boolean
  userOnly?: boolean
}

/* ================= RENDER ITEMS ================= */
function renderItems(
  items: SidebarItem[],
  pathname: string,
  role: 'ADMIN' | 'USER'
) {
  return items
    .filter(item => {
      if (item.adminOnly) return role === 'ADMIN'
      if (item.userOnly) return role === 'USER'
      return true
    })
    .map((item, index) => {
      const icon = item.icon ? (
        <Icon icon={item.icon} width={20} />
      ) : null

      if (item.heading) {
        return (
          <div key={item.heading} className="mt-4 mb-2">
            <AMMenu
              subHeading={item.heading}
              ClassName="text-xs uppercase text-slate-400"
            />
          </div>
        )
      }

      if (item.children && item.children.length > 0) {
        return (
          <AMSubmenu
            key={item.id || index}
            title={item.name}
            icon={icon}
          >
            {renderItems(item.children, pathname, role)}
          </AMSubmenu>
        )
      }

      return (
        <AMMenuItem
          key={item.id || index}
          link={item.url}
          component={Link}
          isSelected={pathname === item.url}
          icon={icon}
        >
          {item.name}
        </AMMenuItem>
      )
    })
}

/* ================= SIDEBAR ================= */
export default function Sidebar() {
  const pathname = usePathname()
  const [role, setRole] = useState<'ADMIN' | 'USER' | null>(null)

  // 🔐 READ ROLE FROM COOKIE (SYNC)
  useEffect(() => {
    const roleCookie = document.cookie
      .split('; ')
      .find(c => c.startsWith('role='))
      ?.split('=')[1]

    if (roleCookie === 'ADMIN' || roleCookie === 'USER') {
      setRole(roleCookie)
    }
  }, [])

  // ⛔ Prevent rendering until role is known
  if (!role) return null

  return (
    <AMSidebar
      width="270px"
      collapsible="none"
      showTrigger={false}
      className="fixed left-0 top-0 h-screen bg-slate-900 border-r border-slate-800"
    >
      {/* LOGO */}
      <div className="px-6 py-4 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={36} height={36} />
          <span className="text-white font-semibold">
            <span className="text-blue-400">Admin</span> Panel
          </span>
        </Link>
      </div>

      {/* MENU */}
      <SimpleBar className="h-[calc(100vh-80px)] px-4 py-3">
        {SidebarContent.map((section, index) => (
          <div key={index}>
            {renderItems(
              [
                ...(section.heading
                  ? [{ heading: section.heading }]
                  : []),
                ...(section.children || []),
              ],
              pathname,
              role
            )}
          </div>
        ))}
      </SimpleBar>
    </AMSidebar>
  )
}
