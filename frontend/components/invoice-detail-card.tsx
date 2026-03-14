import { Invoice } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCard } from './check-card'
import { FlagBlock } from './flag-block'

interface InvoiceDetailCardProps {
  invoice: Invoice
}

export function InvoiceDetailCard({ invoice }: InvoiceDetailCardProps) {
  const statusColors = {
    approved: "bg-success text-success-foreground",
    blocked: "bg-danger text-danger-foreground",
    processing: "bg-info text-info-foreground",
    disputed: "bg-warning text-warning-foreground",
    pending: "bg-muted text-muted-foreground",
  }

  return (
    <Card className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 pb-8 border-b border-border">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-2xl font-display font-semibold">{invoice.invoiceNumber}</h2>
            <Badge className={statusColors[invoice.status]}>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </Badge>
          </div>
          <p className="text-foreground/60">{invoice.vendorName}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-mono-data font-semibold">{invoice.currency} {invoice.amount.toLocaleString()}</p>
          <p className="text-sm text-foreground/60">Invoice Amount</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-3 gap-8 mb-8 pb-8 border-b border-border">
        <div>
          <p className="text-sm text-foreground/60 mb-1">Invoice Date</p>
          <p className="font-mono-data text-base">{new Date(invoice.invoiceDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-foreground/60 mb-1">Due Date</p>
          <p className="font-mono-data text-base">{new Date(invoice.dueDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-foreground/60 mb-1">PO Number</p>
          <p className="font-mono-data text-base">{invoice.poNumber || "—"}</p>
        </div>
        <div>
          <p className="text-sm text-foreground/60 mb-1">GSTIN</p>
          <p className="font-mono-data text-base">{invoice.gstin || "—"}</p>
        </div>
        <div>
          <p className="text-sm text-foreground/60 mb-1">PAN</p>
          <p className="font-mono-data text-base">{invoice.pan || "—"}</p>
        </div>
        <div>
          <p className="text-sm text-foreground/60 mb-1">Uploaded</p>
          <p className="font-mono-data text-base">{new Date(invoice.uploadedAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Checks */}
      <div className="mb-8">
        <h3 className="text-lg font-display font-semibold mb-4">Compliance Checks</h3>
        <div className="space-y-3">
          {invoice.checks.map((check) => (
            <CheckCard key={check.id} check={check} />
          ))}
        </div>
      </div>

      {/* Flags */}
      {invoice.flags.length > 0 && (
        <div>
          <h3 className="text-lg font-display font-semibold mb-4">Flags</h3>
          <div className="space-y-3">
            {invoice.flags.map((flag) => (
              <FlagBlock key={flag.id} flag={flag} />
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
