import { Link } from 'wouter'
import { Button, buttonVariants } from '@/components/ui/button'
import { Menu, Home, LogOut, BarChart3, FileText } from 'lucide-react'
import { useState, ReactNode } from 'react'
import {useServices} from "@/hooks/useServices";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const {authService} = useServices()
  const [open, setOpen] = useState(true)
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr]">
      <aside className={`${open ? 'block' : 'hidden'} md:block border-r bg-white`}>        
        <div className="h-16 flex items-center gap-2 px-4 border-b">
          <div className="h-8 w-8 bg-primary rounded-md" />
          <span className="font-semibold">Tawasul</span>
        </div>
        <nav className="p-2 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent">
            <Home size={18} /> <span>Home</span>
          </Link>
          <Link href="/dashboard/stats" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent">
            <BarChart3 size={18} /> <span>Statistics</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent">
            <FileText size={18} /> <span>Landing Page</span>
          </Link>
        </nav>
      </aside>
      <div className="flex flex-col min-h-screen">
        <header className="h-16 border-b bg-white flex items-center gap-2 px-4">
          <Button variant="outline" size="icon" className="md:hidden" onClick={() => setOpen((v) => !v)}>
            <Menu size={18} />
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/login" className={buttonVariants({ variant: 'outline' })} onClick={async () => await authService.logout()}>
              <span className="inline-flex items-center gap-2"><LogOut size={16} /> Sign out</span>
            </Link>
          </div>
        </header>
        <main className="flex-1 bg-muted/20 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
