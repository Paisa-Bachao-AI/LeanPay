import { Invoice } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface InvoiceTableProps {
  invoices: Invoice[]
  onRowClick?: (invoice: Invoice) => void
}

export function InvoiceTable({ invoices, onRowClick }: InvoiceTableProps) {
  const statusColors = {
    approved: "bg-success text-success-foreground",
    blocked: "bg-danger text-danger-foreground",
    processing: "bg-info text-info-foreground",
    disputed: "bg-warning text-warning-foreground",
    pending: "bg-muted text-muted-foreground",
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-6 font-semibold text-foreground/70 text-sm">Invoice #</th>
            <th className="text-left py-4 px-6 font-semibold text-foreground/70 text-sm">Vendor</th>
            <th className="text-right py-4 px-6 font-semibold text-foreground/70 text-sm">Amount</th>
            <th className="text-left py-4 px-6 font-semibold text-foreground/70 text-sm">Date</th>
            <th className="text-left py-4 px-6 font-semibold text-foreground/70 text-sm">Status</th>
            <th className="text-left py-4 px-6 font-semibold text-foreground/70 text-sm">Flags</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onRowClick?.(invoice)}
            >
              <td className="py-4 px-6 font-mono-data font-semibold text-foreground">{invoice.invoiceNumber}</td>
              <td className="py-4 px-6 text-foreground">{invoice.vendorName}</td>
              <td className="py-4 px-6 text-right font-mono-data font-semibold text-foreground">
                {invoice.currency} {invoice.amount.toLocaleString()}
              </td>
              <td className="py-4 px-6 font-mono-data text-sm text-foreground/70">
                {new Date(invoice.invoiceDate).toLocaleDateString()}
              </td>
              <td className="py-4 px-6">
                <Badge className={statusColors[invoice.status]}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </Badge>
              </td>
              <td className="py-4 px-6">
                {invoice.flags.length > 0 && (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-danger/20 text-danger text-xs font-semibold">
                    {invoice.flags.length}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
