'use client'

export function getUserRole(): 'ADMIN' | 'USER' | null {
  if (typeof document === 'undefined') return null

  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith('role='))

  if (!match) return null

  return match.split('=')[1] as 'ADMIN' | 'USER'
}
