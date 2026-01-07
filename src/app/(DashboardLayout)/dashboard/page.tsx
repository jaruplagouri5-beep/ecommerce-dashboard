'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import AnimatedCounter from '@/components/dashboard/AnimatedCounter'
import RevenueChart from '@/components/dashboard/RevenueChart'
import CategoryPieChart from '@/components/dashboard/CategoryPieChart'
import OrdersTrendChart from '@/components/dashboard/OrdersTrendChart'
import StockTrendChart from '@/components/dashboard/StockTrendChart'

type Role = 'ADMIN' | 'USER'

export default function DashboardPage() {
  const router = useRouter()
  const [role, setRole] = useState<Role | null>(null)

  // 🔐 Read role from cookie
  useEffect(() => {
    const roleCookie = document.cookie
      .split('; ')
      .find(c => c.startsWith('role='))
      ?.split('=')[1] as Role | undefined

    if (!roleCookie) {
      router.replace('/auth/login')
      return
    }

    setRole(roleCookie)
  }, [router])

  if (!role) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-400">
        Loading dashboard...
      </div>
    )
  }

  const isAdmin = role === 'ADMIN'

  return (
    <div className="space-y-8 min-h-screen p-6 bg-slate-900 text-white">

      {/* 👋 ADMIN WELCOME */}
      {isAdmin && (
        <h1 className="text-2xl font-bold text-blue-400">
          Welcome Admin 👋
        </h1>
      )}

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Revenue" prefix="₹" value={96000} />
        <StatCard title="Products" value={248} />
        <StatCard title="Orders" value={1280} />
        <StatCard title="Out of Stock" value={12} />
      </div>

      {/* ===== REVENUE + CATEGORY ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[360px] rounded-xl bg-slate-800 p-4">
          <RevenueChart />
        </div>

        <div className="h-[360px] rounded-xl bg-slate-800 p-4">
          <CategoryPieChart onSelect={() => {}} />
        </div>
      </div>

      {/* ===== ORDERS + STOCK (IMPORTANT FIX) ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[320px] rounded-xl bg-slate-800 p-4">
          <OrdersTrendChart />
        </div>

        <div className="h-[320px] rounded-xl bg-slate-800 p-4">
          <StockTrendChart />
        </div>
      </div>
    </div>
  )
}

/* ===== STAT CARD ===== */
function StatCard({
  title,
  value,
  prefix = '',
}: {
  title: string
  value: number
  prefix?: string
}) {
  return (
    <div className="rounded-xl bg-slate-800 p-5">
      <p className="text-slate-400">{title}</p>
      <h3 className="text-2xl font-bold">
        {prefix}
        <AnimatedCounter value={value} />
      </h3>
    </div>
  )
}
