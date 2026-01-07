'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Button } from '@/components/ui/button'

type RangeType = '7D' | '30D' | '12M'

const dataMap: Record<RangeType, any[]> = {
  '7D': [
    { label: 'Mon', orders: 24 },
    { label: 'Tue', orders: 32 },
    { label: 'Wed', orders: 28 },
    { label: 'Thu', orders: 35 },
    { label: 'Fri', orders: 41 },
    { label: 'Sat', orders: 38 },
    { label: 'Sun', orders: 45 },
  ],
  '30D': [
    { label: 'Week 1', orders: 180 },
    { label: 'Week 2', orders: 220 },
    { label: 'Week 3', orders: 260 },
    { label: 'Week 4', orders: 310 },
  ],
  '12M': [
    { label: 'Jan', orders: 820 },
    { label: 'Mar', orders: 980 },
    { label: 'May', orders: 1100 },
    { label: 'Jul', orders: 1250 },
    { label: 'Sep', orders: 1380 },
    { label: 'Nov', orders: 1500 },
  ],
}

function getDateRangeText(range: RangeType) {
  const end = new Date()
  const start = new Date()

  if (range === '7D') start.setDate(end.getDate() - 6)
  if (range === '30D') start.setDate(end.getDate() - 29)
  if (range === '12M') start.setMonth(end.getMonth() - 11)

  const format = (d: Date) =>
    d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })

  return `${format(start)} – ${format(end)}`
}

export default function OrdersTrendChart() {
  const [range, setRange] = useState<RangeType>('7D')

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-white">Orders Trend</h3>
          <p className="text-xs text-slate-400">
            {getDateRangeText(range)}
          </p>
        </div>

        <div className="flex gap-2">
          {(['7D', '30D', '12M'] as RangeType[]).map((r) => (
            <Button
              key={r}
              size="sm"
              variant={range === r ? 'default' : 'outline'}
              onClick={() => setRange(r)}
            >
              {r}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataMap[range]}>
            <XAxis dataKey="label" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#60a5fa"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
