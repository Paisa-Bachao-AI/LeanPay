'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { StatCard } from '@/components/stat-card'
import { InvoiceTable } from '@/components/invoice-table'
import { Card } from '@/components/ui/card'
import { mockDashboardStats, mockInvoices } from '@/lib/mockData'
import { TrendingUp, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Invoice } from '@/lib/types'

export default function DashboardPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const recentInvoices = mockInvoices.slice(0, 5)

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-semibold mb-2">Dashboard</h1>
          <p className="text-foreground/60">Welcome back. Here's your invoice overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Processed"
            value={mockDashboardStats.totalProcessed}
            icon={TrendingUp}
            trend={{ value: 12, direction: 'up' }}
          />
          <StatCard
            title="Total Approved"
            value={mockDashboardStats.totalApproved}
            icon={CheckCircle2}
            trend={{ value: 8, direction: 'up' }}
          />
          <StatCard
            title="Approval Rate"
            value={`${mockDashboardStats.approvalRate}%`}
            subtitle="This month"
            trend={{ value: 2, direction: 'up' }}
          />
          <StatCard
            title="Total Amount"
            value={`₹${(mockDashboardStats.totalAmount / 1000000).toFixed(1)}M`}
            icon={TrendingUp}
          />
        </div>

        {/* Recent Invoices */}
        <Card>
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-display font-semibold">Recent Invoices</h2>
          </div>
          <InvoiceTable invoices={recentInvoices} onRowClick={setSelectedInvoice} />
        </Card>
      </div>
    </MainLayout>
  )
}
