'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CardBoxProps {
  children: ReactNode
  className?: string
}

export default function CardBox({ children, className }: CardBoxProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-700 bg-slate-800 text-white shadow-sm',
        className
      )}
    >
      {children}
    </div>
  )
}
