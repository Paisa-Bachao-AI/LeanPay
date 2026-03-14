import { Card } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
}

export function StatCard({ title, value, subtitle, icon: Icon, trend }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-foreground/60 mb-2">{title}</p>
          <p className="text-3xl font-mono-data font-semibold">{value}</p>
          {subtitle && <p className="text-xs text-foreground/50 mt-1">{subtitle}</p>}
          {trend && (
            <p className={`text-xs mt-2 ${trend.direction === 'up' ? 'text-success' : 'text-danger'}`}>
              {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
            </p>
          )}
        </div>
        {Icon && <Icon className="h-6 w-6 text-foreground/30" />}
      </div>
    </Card>
  )
}
