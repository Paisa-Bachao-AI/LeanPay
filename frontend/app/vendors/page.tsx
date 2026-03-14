import { MainLayout } from '@/components/layout/main-layout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockVendors } from '@/lib/mockData'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'

export default function VendorsPage() {
  const getRiskColor = (score: number) => {
    if (score < 20) return 'text-success'
    if (score < 50) return 'text-warning'
    return 'text-danger'
  }

  const getRiskBg = (score: number) => {
    if (score < 20) return 'bg-success/10 border-success/30'
    if (score < 50) return 'bg-warning/10 border-warning/30'
    return 'bg-danger/10 border-danger/30'
  }

  const getStatusIcon = (status: string) => {
    if (status === 'active') return <CheckCircle2 className="h-4 w-4 text-success" />
    return <AlertTriangle className="h-4 w-4 text-warning" />
  }

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-semibold mb-2">Vendor Ledger</h1>
          <p className="text-foreground/60">Monitor vendor details and risk profiles</p>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 gap-4">
          {mockVendors.map((vendor) => (
            <Card key={vendor.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{vendor.name}</h3>
                    {getStatusIcon(vendor.status)}
                    <Badge variant={vendor.status === 'active' ? 'default' : 'destructive'}>
                      {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground/60">{vendor.category}</p>
                </div>
                <div className={`px-4 py-2 rounded-lg border font-mono-data font-semibold ${getRiskBg(vendor.riskScore)} ${getRiskColor(vendor.riskScore)}`}>
                  Risk: {vendor.riskScore}%
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-foreground/60 mb-1">GSTIN</p>
                  <p className="font-mono-data text-sm font-semibold break-all">{vendor.gstin}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 mb-1">PAN</p>
                  <p className="font-mono-data text-sm font-semibold">{vendor.pan || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 mb-1">Total Invoices</p>
                  <p className="font-mono-data text-sm font-semibold">{vendor.totalInvoices}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 mb-1">Total Amount</p>
                  <p className="font-mono-data text-sm font-semibold">₹{(vendor.totalAmount / 100000).toFixed(1)}L</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 mb-1">Avg Invoice</p>
                  <p className="font-mono-data text-sm font-semibold">
                    ₹{(vendor.totalAmount / vendor.totalInvoices / 100000).toFixed(1)}L
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
