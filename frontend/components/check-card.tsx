import { InvoiceCheck } from '@/lib/types'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

interface CheckCardProps {
  check: InvoiceCheck
}

export function CheckCard({ check }: CheckCardProps) {
  const icons = {
    pass: <CheckCircle2 className="h-5 w-5 text-success" />,
    fail: <XCircle className="h-5 w-5 text-danger" />,
    warning: <AlertCircle className="h-5 w-5 text-warning" />,
  }

  const bgColors = {
    pass: "bg-success/10 border-success/30",
    fail: "bg-danger/10 border-danger/30",
    warning: "bg-warning/10 border-warning/30",
  }

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${bgColors[check.status]}`}>
      {icons[check.status]}
      <div className="flex-1">
        <p className="font-semibold text-sm">{check.name}</p>
        <p className="text-sm text-foreground/70">{check.message}</p>
      </div>
    </div>
  )
}
