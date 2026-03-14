'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { BarChart3, FileText, Users, TrendingUp, Inbox } from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()
  
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/queue', label: 'Invoice Queue', icon: Inbox },
    { href: '/vendors', label: 'Vendors', icon: Users },
    { href: '/reports', label: 'Reports', icon: TrendingUp },
  ]
  
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="px-6 py-8 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-sidebar-primary" />
          <h1 className="text-xl font-display font-semibold text-sidebar-foreground tracking-tight">
            LeanPay
          </h1>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:bg-opacity-50"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      
      {/* Footer */}
      <div className="border-t border-sidebar-border px-6 py-4 text-sm text-sidebar-foreground/60">
        <p>© 2025 LeanPay</p>
      </div>
    </aside>
  )
}
