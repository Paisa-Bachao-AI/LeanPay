import { Sidebar } from './sidebar'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 bg-background">
        {children}
      </main>
    </div>
  )
}
