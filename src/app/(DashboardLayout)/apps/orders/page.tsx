'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

/* ================= TYPES ================= */
interface Order {
  id: number
  customer: string
  product: string
  amount: number
  status: 'Pending' | 'Shipped' | 'Delivered'
}

/* ================= PAGE ================= */
export default function OrdersPage() {
  const [orders] = useState<Order[]>([
    {
      id: 101,
      customer: 'Rahul Sharma',
      product: 'iPhone 15',
      amount: 79999,
      status: 'Pending',
    },
    {
      id: 102,
      customer: 'Ananya Verma',
      product: 'Samsung S24',
      amount: 69999,
      status: 'Shipped',
    },
    {
      id: 103,
      customer: 'Karthik Reddy',
      product: 'OnePlus 12',
      amount: 64999,
      status: 'Delivered',
    },
  ])

  const [filter, setFilter] = useState<'All' | Order['status']>('All')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  /* ================= STATUS BADGE ================= */
  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="lightWarning">Pending</Badge>
      case 'Shipped':
        return <Badge variant="lightInfo">Shipped</Badge>
      case 'Delivered':
        return <Badge variant="lightSuccess">Delivered</Badge>
    }
  }

  /* ================= FILTERED ORDERS ================= */
  const filteredOrders =
    filter === 'All'
      ? orders
      : orders.filter((o) => o.status === filter)

  /* ================= EXPORT CSV ================= */
  const exportToCSV = () => {
    if (!filteredOrders.length) return

    const headers = ['Order ID', 'Customer', 'Product', 'Amount', 'Status']

    const rows = filteredOrders.map((o) => [
      `#${o.id}`,
      o.customer,
      o.product,
      o.amount,
      o.status,
    ])

    const csv =
      [headers, ...rows].map((r) => r.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'orders.csv'
    a.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Orders</h1>

        <div className="flex gap-3">
          {/* STATUS FILTER */}
          <Select value={filter} onValueChange={(v) => setFilter(v as any)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Orders</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>

          {/* EXPORT */}
          <Button variant="outline" onClick={exportToCSV}>
            Export
          </Button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount (₹)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>
                    {order.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(order.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ================= VIEW MODAL ================= */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-3 text-sm">
              <p><b>Order ID:</b> #{selectedOrder.id}</p>
              <p><b>Customer:</b> {selectedOrder.customer}</p>
              <p><b>Product:</b> {selectedOrder.product}</p>
              <p>
                <b>Amount:</b> ₹{selectedOrder.amount.toLocaleString()}
              </p>
              <p>
                <b>Status:</b>{' '}
                {getStatusBadge(selectedOrder.status)}
              </p>

              <div className="pt-4 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
