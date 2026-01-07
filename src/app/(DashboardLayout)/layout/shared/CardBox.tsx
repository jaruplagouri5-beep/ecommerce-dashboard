'use client'

export default function CardBox({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl bg-slate-800 p-4 border border-slate-700">
      {children}
    </div>
  )
}
