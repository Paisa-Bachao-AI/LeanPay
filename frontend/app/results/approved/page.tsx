import Link from 'next/link'
import { MainLayout } from '@/components/layout/main-layout'
import { InvoiceDetailCard } from '@/components/invoice-detail-card'
import { Button } from '@/components/ui/button'
import { mockInvoices } from '@/lib/mockData'
import { CheckCircle2, Upload, ArrowRight } from 'lucide-react'

export default function ApprovedResultPage() {
  // Get the first approved invoice for demo
  const approvedInvoice = mockInvoices.find(inv => inv.status === 'approved')!

  return (
    <MainLayout>
      <div className="p-8">
        {/* Success Banner */}
        <div className="mb-8 flex items-start gap-4 p-6 bg-success/10 border border-success/30 rounded-lg">
          <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h2 className="font-semibold text-lg mb-2">Invoice Approved</h2>
            <p className="text-foreground/70">
              This invoice has passed all compliance checks and is ready for payment processing.
              All required validations have been successful.
            </p>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="mb-8">
          <InvoiceDetailCard invoice={approvedInvoice} />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button className="flex items-center gap-2">
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
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
