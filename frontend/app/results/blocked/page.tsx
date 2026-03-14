import Link from 'next/link'
import { MainLayout } from '@/components/layout/main-layout'
import { InvoiceDetailCard } from '@/components/invoice-detail-card'
import { Button } from '@/components/ui/button'
import { mockInvoices } from '@/lib/mockData'
import { AlertTriangle, Upload } from 'lucide-react'

export default function BlockedResultPage() {
  // Get the first blocked invoice for demo
  const blockedInvoice = mockInvoices.find(inv => inv.status === 'blocked')!

  return (
    <MainLayout>
      <div className="p-8">
        {/* Alert Banner */}
        <div className="mb-8 flex items-start gap-4 p-6 bg-danger/10 border border-danger/30 rounded-lg">
          <AlertTriangle className="h-6 w-6 text-danger flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h2 className="font-semibold text-lg mb-2">Invoice Blocked</h2>
            <p className="text-foreground/70">
              This invoice has been flagged for manual review due to failed compliance checks and potential issues.
              Please review the details below before taking action.
            </p>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="mb-8">
          <InvoiceDetailCard invoice={blockedInvoice} />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link href="/queue">
            <Button variant="outline">Review Similar Invoices</Button>
          </Link>
          <Link href="/upload">
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload More
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}
