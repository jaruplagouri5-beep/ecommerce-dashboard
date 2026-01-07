'use client'

import Header from './layout/header/Header'
import Sidebar from './layout/sidebar/Sidebar'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen w-full bg-background">

      {/* ================= SIDEBAR (DESKTOP ONLY) ================= */}
      <div className="hidden xl:block fixed left-0 top-0 h-screen w-[270px] z-30">
        <Sidebar />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex flex-col w-full xl:ml-[270px]">

        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 px-6 py-6">
          {children}
        </main>

      </div>

    </div>
  )
}
