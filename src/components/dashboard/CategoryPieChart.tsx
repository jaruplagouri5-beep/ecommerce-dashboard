'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { name: 'Electronics', value: 40 },
  { name: 'Fashion', value: 25 },
  { name: 'Grocery', value: 20 },
  { name: 'Books', value: 15 },
]

const COLORS = ['#60A5FA', '#34D399', '#FBBF24', '#F87171']

export default function CategoryPieChart({
  onSelect,
}: {
  onSelect: (category: string) => void
}) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <h3 className="font-semibold mb-4">Products by Category</h3>

      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            onClick={(d) => onSelect(d.name)}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <p className="text-xs text-slate-400 mt-3">
        Click a slice to filter products
      </p>
    </div>
  )
}
