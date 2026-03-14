import { InvoiceFlag } from '@/lib/types'
import { AlertTriangle, Copy, DollarSign, Building2, Calendar } from 'lucide-react'

interface FlagBlockProps {
  flag: InvoiceFlag
}

export function FlagBlock({ flag }: FlagBlockProps) {
  const typeIcons = {
    fraud: <AlertTriangle className="h-5 w-5" />,
    duplicate: <Copy className="h-5 w-5" />,
    amount: <DollarSign className="h-5 w-5" />,
    vendor: <Building2 className="h-5 w-5" />,
    date: <Calendar className="h-5 w-5" />,
  }

  const severityColors = {
    low: "bg-warning/10 border-warning/30 text-warning",
    medium: "bg-warning/20 border-warning/50 text-warning",
    high: "bg-danger/10 border-danger/30 text-danger",
  }

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${severityColors[flag.severity]}`}>
      <div className="flex-shrink-0 mt-0.5">
        {typeIcons[flag.type]}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-sm capitalize">
          {flag.type} {flag.severity === 'high' && '⚠'}
        </p>
        <p className="text-sm opacity-90 mt-1">{flag.message}</p>
      </div>
    </div>
  )
}
