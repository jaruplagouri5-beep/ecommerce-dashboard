'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Button } from '@/components/ui/button'

type RangeType = '7D' | '30D' | '12M'

/* ================= DATA ================= */
const stockData: Record<RangeType, any[]> = {
  '7D': [
    { label: 'Mon', inStock: 240, outStock: 20 },
    { label: 'Tue', inStock: 235, outStock: 25 },
    { label: 'Wed', inStock: 230, outStock: 30 },
    { label: 'Thu', inStock: 225, outStock: 35 },
    { label: 'Fri', inStock: 220, outStock: 40 },
    { label: 'Sat', inStock: 215, outStock: 45 },
    { label: 'Sun', inStock: 210, outStock: 50 },
  ],

  '30D': [
    { label: 'Week 1', inStock: 260, outStock: 15 },
    { label: 'Week 2', inStock: 245, outStock: 25 },
    { label: 'Week 3', inStock: 230, outStock: 35 },
    { label: 'Week 4', inStock: 210, outStock: 50 },
  ],

  // ✅ FULL 12 MONTHS
  '12M': [
    { label: 'Jan', inStock: 300, outStock: 10 },
    { label: 'Feb', inStock: 290, outStock: 15 },
    { label: 'Mar', inStock: 280, outStock: 20 },
    { label: 'Apr', inStock: 270, outStock: 25 },
    { label: 'May', inStock: 260, outStock: 30 },
    { label: 'Jun', inStock: 250, outStock: 35 },
    { label: 'Jul', inStock: 240, outStock: 40 },
    { label: 'Aug', inStock: 230, outStock: 45 },
    { label: 'Sep', inStock: 220, outStock: 50 },
    { label: 'Oct', inStock: 210, outStock: 55 },
    { label: 'Nov', inStock: 200, outStock: 60 },
    { label: 'Dec', inStock: 190, outStock: 65 },
  ],
}

/* ================= DATE RANGE TEXT ================= */
function getDateRangeText(range: RangeType) {
  const end = new Date()
  const start = new Date()

  if (range === '7D') start.setDate(end.getDate() - 6)
  if (range === '30D') start.setDate(end.getDate() - 29)
  if (range === '12M') start.setMonth(end.getMonth() - 11)

  const format = (d: Date) =>
    d.toLocaleDateString('en-IN', {
      month: 'short',
      year: 'numeric',
    })

  return `${format(start)} – ${format(end)}`
}

/* ================= COMPONENT ================= */
export default function StockTrendChart() {
  const [range, setRange] = useState<RangeType>('12M')

  return (
    <div className="h-full flex flex-col">
      {/* HEADER */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-white">Stock Trend</h3>
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

      {/* CHART */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stockData[range]}>
            <XAxis dataKey="label" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="inStock"
              name="In Stock"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="outStock"
              name="Out of Stock"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
