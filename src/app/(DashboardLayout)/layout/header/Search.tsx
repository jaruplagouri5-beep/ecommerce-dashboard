'use client'

import { useState, useMemo, useEffect } from 'react'
import { Icon } from '@iconify/react'
import SidebarContent, { MenuItem } from '../sidebar/sidebaritems'
import SimpleBar from 'simplebar-react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

interface SearchResult {
  name: string
  url: string
  path?: string
  icon?: string
}

function Search() {
  const [query, setQuery] = useState('')
  const [role, setRole] = useState<'ADMIN' | 'USER' | null>(null)

  /* 🔐 READ ROLE FROM COOKIE */
  useEffect(() => {
    const match = document.cookie
      .split('; ')
      .find(row => row.startsWith('role='))

    if (match) {
      setRole(match.split('=')[1] as 'ADMIN' | 'USER')
    }
  }, [])

  /* 🔍 RECURSIVE SEARCH WITH ROLE FILTER */
  const searchItems = (
    items: MenuItem[],
    q: string,
    parentPath = ''
  ): SearchResult[] => {
    let results: SearchResult[] = []

    items.forEach(item => {
      // 🔐 ROLE CHECK
      if (item.adminOnly && role !== 'ADMIN') return

      const currentPath = parentPath
        ? `${parentPath} → ${item.name}`
        : item.name

      if (
        item.name &&
        item.url &&
        item.name.toLowerCase().includes(q.toLowerCase())
      ) {
        results.push({
          name: item.name,
          url: item.url,
          path: currentPath,
          icon: item.icon,
        })
      }

      if (item.children) {
        results.push(
          ...searchItems(item.children, q, currentPath)
        )
      }
    })

    return results
  }

  /* 📌 MEMOIZED RESULTS */
  const results = useMemo(() => {
    if (!query.trim() || !role) return []
    return searchItems(SidebarContent, query)
  }, [query, role])

  return (
    <div className="relative w-full">
      {/* INPUT */}
      <div className="relative lg:w-xs mx-auto">
        <Icon
          icon="solar:magnifer-linear"
          width={18}
          height={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <Input
          placeholder="Search..."
          className="rounded-xl pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* RESULTS */}
      {query && (
        <div className="absolute w-full bg-background rounded-md top-11 z-10 shadow-md border border-border">
          <SimpleBar className="h-72 p-3">
            {results.length ? (
              results.map((item, i) => (
                <Link
                  key={i}
                  href={item.url}
                  onClick={() => setQuery('')}
                  className="p-2 mb-1 flex items-center gap-3 rounded-md text-sm hover:bg-primary/15"
                >
                  <Icon
                    icon={item.icon || 'iconoir:component'}
                    width={18}
                    height={18}
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    {item.path && (
                      <p className="text-xs text-muted-foreground truncate">
                        {item.path}
                      </p>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                No results found
              </div>
            )}
          </SimpleBar>
        </div>
      )}
    </div>
  )
}

export default Search
