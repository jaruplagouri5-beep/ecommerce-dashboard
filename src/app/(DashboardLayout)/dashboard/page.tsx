// 'use client'

// import { motion } from 'framer-motion'
// import Image from 'next/image'

// import { useCurrentUser } from '@/lib/useCurrentUser'

// import AnimatedCounter from '@/components/dashboard/AnimatedCounter'
// import RevenueChart from '@/components/dashboard/RevenueChart'
// import CategoryPieChart from '@/components/dashboard/CategoryPieChart'
// import OrdersTrendChart from '@/components/dashboard/OrdersTrendChart'
// import StockTrendChart from '@/components/dashboard/StockTrendChart'

// export default function DashboardPage() {
//   const user = useCurrentUser()
//   const isAdmin = user?.role === 'admin'

//   return (
//     <div className="space-y-8 min-h-screen pb-10">

//       {/* ================= WELCOME BAR (ADMIN ONLY) ================= */}
//       {isAdmin && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="flex items-center gap-4 bg-slate-800 border border-slate-700 rounded-2xl p-6"
//         >
//           <Image
//             src="/images/profile/user-9.jpg"
//             alt="Admin"
//             width={56}
//             height={56}
//             className="rounded-full"
//           />

//           <div>
//             <h2 className="text-xl font-semibold">
//               Welcome back,{' '}
//               <span className="text-blue-400">
//                 {user?.name ?? 'Admin'}
//               </span>{' '}
//               👋
//             </h2>
//             <p className="text-slate-400 text-sm">
//               Here’s what’s happening with your store today
//             </p>
//           </div>
//         </motion.div>
//       )}

//       {/* ================= STAT CARDS ================= */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard title="Revenue" prefix="₹" value={96000} />
//         <StatCard title="Products" value={248} />
//         <StatCard title="Orders" value={1280} />
//         <StatCard title="Out of Stock" value={12} />
//       </div>

//       {/* ================= REVENUE + CATEGORY ================= */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* Revenue Chart */}
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.4 }}
//           className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-6"
//         >
//           <h3 className="font-semibold mb-4">Revenue Overview</h3>

//           {/* 🔑 HEIGHT REQUIRED */}
//           <div className="h-[360px]">
//             <RevenueChart />
//           </div>
//         </motion.div>

//         {/* Products by Category */}
//         <motion.div
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.4 }}
//           className="bg-slate-800 border border-slate-700 rounded-xl p-6"
//         >
//           <CategoryPieChart onSelect={() => {}} />
//         </motion.div>
//       </div>

//       {/* ================= ORDERS + STOCK ================= */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Orders Trend */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="bg-slate-800 border border-slate-700 rounded-xl p-6"
//         >
//           <h3 className="font-semibold mb-2">Orders Trend</h3>

//           {/* 🔑 HEIGHT REQUIRED */}
//           <div className="h-[320px]">
//             <OrdersTrendChart />
//           </div>
//         </motion.div>

//         {/* Stock Trend */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="bg-slate-800 border border-slate-700 rounded-xl p-6"
//         >
//           <h3 className="font-semibold mb-2">Stock Trend</h3>

//           {/* 🔑 HEIGHT REQUIRED */}
//           <div className="h-[320px]">
//             <StockTrendChart />
//           </div>
//         </motion.div>

//       </div>
//     </div>
//   )
// }

// /* ================= STAT CARD ================= */
// function StatCard({
//   title,
//   value,
//   prefix = '',
// }: {
//   title: string
//   value: number
//   prefix?: string
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.25 }}
//       className="bg-slate-800 border border-slate-700 rounded-xl p-5"
//     >
//       <p className="text-slate-400 text-sm">{title}</p>
//       <h3 className="text-2xl font-bold mt-2">
//         {prefix}
//         <AnimatedCounter value={value} />
//       </h3>
//     </motion.div>
//   )
// }
