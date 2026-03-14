'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { Card } from '@/components/ui/card'
import { mockMonthlyData } from '@/lib/mockData'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

export default function ReportsPage() {
  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-semibold mb-2">Reports</h1>
          <p className="text-foreground/60">Financial summaries and payment analytics</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <p className="text-sm text-foreground/60 mb-2">Total YTD Amount</p>
            <p className="text-3xl font-mono-data font-semibold mb-2">₹3.76 Cr</p>
            <p className="text-xs text-success">↑ 12% from last year</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-foreground/60 mb-2">Monthly Average</p>
            <p className="text-3xl font-mono-data font-semibold mb-2">₹31.3 L</p>
            <p className="text-xs text-foreground/50">Last 12 months</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-foreground/60 mb-2">Approval Rate (YTD)</p>
            <p className="text-3xl font-mono-data font-semibold mb-2">94.4%</p>
            <p className="text-xs text-success">↑ 2.1% from Q1</p>
          </Card>
        </div>

        {/* Chart */}
        <Card className="p-6">
          <h2 className="text-lg font-display font-semibold mb-6">Monthly Payment Trend</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--color-foreground) / 0.5)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="hsl(var(--color-foreground) / 0.5)"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `₹${(value / 1000000).toFixed(0)}M`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [
                        `₹${(Number(value) / 1000000).toFixed(2)}M`,
                        'Amount',
                      ]}
                    />
                  }
                />
                <Bar
                  dataKey="amount"
                  fill="hsl(var(--color-chart-1))"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-display font-semibold mb-4">Top Vendors by Amount</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm">TechFlow Solutions</span>
                <span className="font-mono-data font-semibold">₹52.0 L</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm">Supply Chain Co</span>
                <span className="font-mono-data font-semibold">₹67.0 L</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm">Software House</span>
                <span className="font-mono-data font-semibold">₹48.0 L</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Consulting Plus</span>
                <span className="font-mono-data font-semibold">₹31.0 L</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-display font-semibold mb-4">Invoice Status Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm">Approved</span>
                <span className="font-mono-data font-semibold text-success">389 (94.4%)</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm">Blocked</span>
                <span className="font-mono-data font-semibold text-danger">12 (2.9%)</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm">Disputed</span>
                <span className="font-mono-data font-semibold text-warning">8 (1.9%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Processing</span>
                <span className="font-mono-data font-semibold text-info">3 (0.7%)</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
