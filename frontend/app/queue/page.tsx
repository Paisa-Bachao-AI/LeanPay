'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { InvoiceTable } from '@/components/invoice-table'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockInvoices } from '@/lib/mockData'
import { Invoice, InvoiceStatus } from '@/lib/types'
import { Filter } from 'lucide-react'

export default function QueuePage() {
  const [filter, setFilter] = useState<InvoiceStatus | 'all'>('all')

  const statuses: Array<{ value: InvoiceStatus | 'all'; label: string }> = [
    { value: 'all', label: 'All Invoices' },
    { value: 'approved', label: 'Approved' },
    { value: 'blocked', label: 'Blocked' },
    { value: 'processing', label: 'Processing' },
    { value: 'disputed', label: 'Disputed' },
  ]

  const filteredInvoices = filter === 'all' 
    ? mockInvoices 
    : mockInvoices.filter(inv => inv.status === filter)

  const blockedCount = mockInvoices.filter(inv => inv.status === 'blocked').length
  const approvedCount = mockInvoices.filter(inv => inv.status === 'approved').length

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-semibold mb-2">Invoice Queue</h1>
          <p className="text-foreground/60">Manage and review all processed invoices</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-4 bg-card rounded-lg border border-border">
            <p className="text-sm text-foreground/60 mb-1">Approved</p>
            <p className="text-2xl font-mono-data font-semibold">{approvedCount}</p>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border">
            <p className="text-sm text-foreground/60 mb-1">Blocked</p>
            <p className="text-2xl font-mono-data font-semibold text-danger">{blockedCount}</p>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border">
            <p className="text-sm text-foreground/60 mb-1">Total</p>
            <p className="text-2xl font-mono-data font-semibold">{mockInvoices.length}</p>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border">
            <p className="text-sm text-foreground/60 mb-1">This Month</p>
            <p className="text-2xl font-mono-data font-semibold">{mockInvoices.length}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-2">
          <Filter className="h-5 w-5 text-foreground/40 flex-shrink-0" />
          {statuses.map((status) => (
            <Button
              key={status.value}
              variant={filter === status.value ? 'default' : 'outline'}
              onClick={() => setFilter(status.value)}
              className="flex-shrink-0"
            >
              {status.label}
            </Button>
          ))}
        </div>

        {/* Invoice Table */}
        <Card>
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-display font-semibold">
              {filter === 'all' ? 'All Invoices' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Invoices`}
            </h2>
          </div>
          <InvoiceTable invoices={filteredInvoices} />
        </Card>
      </div>
    </MainLayout>
  )
}
