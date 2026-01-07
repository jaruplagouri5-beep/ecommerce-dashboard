'use client'

import { useEffect, useState } from 'react'

export default function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 800
    const step = Math.ceil(value / (duration / 16))

    const interval = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(interval)
      } else {
        setCount(start)
      }
    }, 16)

    return () => clearInterval(interval)
  }, [value])

  return <span>{count.toLocaleString()}</span>
}
