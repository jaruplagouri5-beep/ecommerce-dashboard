'use client'

import { useState } from 'react'
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { motion } from 'framer-motion'

/* ================= DATA ================= */
const FULL_DATA = [
  { month: 'Jan', revenue: 1200, profit: 300, lastYear: 900 },
  { month: 'Feb', revenue: 2200, profit: 800, lastYear: 1800 },
  { month: 'Mar', revenue: 1800, profit: -200, lastYear: 1500 },
  { month: 'Apr', revenue: 2600, profit: 900, lastYear: 2000 },
  { month: 'May', revenue: 1400, profit: -150, lastYear: 1200 },
  { month: 'Jun', revenue: 900, profit: 100, lastYear: 800 },
  { month: 'Jul', revenue: 1300, profit: 400, lastYear: 1100 },
  { month: 'Aug', revenue: 2400, profit: 1000, lastYear: 1900 },
  { month: 'Sep', revenue: 1900, profit: 600, lastYear: 1600 },
  { month: 'Oct', revenue: 2300, profit: 850, lastYear: 1800 },
  { month: 'Nov', revenue: 1500, profit: 300, lastYear: 1200 },
  { month: 'Dec', revenue: 1100, profit: -100, lastYear: 900 },
]

/* ================= TOOLTIP ================= */
function CustomTooltip({ active, payload, label, metric }: any) {
  if (active && payload?.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm">
        <p className="text-slate-400">{label}</p>
        <p
          className={
            payload[0].value < 0 ? 'text-red-400' : 'text-blue-400'
          }
        >
          {metric}: ₹{payload[0].value}
        </p>
      </div>
    )
  }
  return null
}

export default function RevenueChart() {
  const [range, setRange] = useState(12)
  const [metric, setMetric] = useState<'revenue' | 'profit'>(
    'revenue'
  )

  const data = FULL_DATA.slice(12 - range)

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">
          {metric === 'revenue'
            ? 'Revenue Overview'
            : 'Profit Overview'}
        </h3>

        <div className="flex items-center gap-3">
          {/* TOGGLE */}
          <div className="flex bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setMetric('revenue')}
              className={`px-4 py-1 text-sm ${
                metric === 'revenue'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400'
              }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setMetric('profit')}
              className={`px-4 py-1 text-sm ${
                metric === 'profit'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400'
              }`}
            >
              Profit
            </button>
          </div>

          {/* RANGE */}
          {[3, 6, 12].map((m) => (
            <button
              key={m}
              onClick={() => setRange(m)}
              className={`px-3 py-1 rounded text-sm border
                ${
                  range === m
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
            >
              {m}M
            </button>
          ))}
        </div>
      </div>

      {/* ================= BAR + LINE ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} barCategoryGap={20}>
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={false}
              content={<CustomTooltip metric={metric} />}
            />

            {/* BAR WITH NEGATIVE HIGHLIGHT */}
            <Bar
              dataKey={metric}
              radius={[6, 6, 0, 0]}
              barSize={18}
              activeBar={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    entry[metric] < 0 ? '#ef4444' : '#3b82f6'
                  }
                />
              ))}
            </Bar>

            {/* LAST YEAR COMPARISON LINE */}
            <Line
              type="monotone"
              dataKey="lastYear"
              stroke="#22c55e"
              strokeWidth={3}
              dot={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
