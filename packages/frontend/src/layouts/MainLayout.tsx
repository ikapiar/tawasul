import type { ReactNode } from 'react'
import { Link, useLocation } from 'wouter'
import { buttonVariants } from '../components/ui/button'

export default function MainLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation()
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary" />
            <span className="font-semibold">Tawasul</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className={`hover:text-primary ${location === '/' ? 'text-primary' : ''}`}>Home</Link>
            <Link href="#features" className="hover:text-primary">Features</Link>
            <Link href="#contact" className="hover:text-primary">Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className={buttonVariants({ variant: 'outline' })}>Sign in</Link>
            <Link href="/dashboard" className={buttonVariants({ variant: 'success' })}>Dashboard</Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t">
        <div className="container py-6 text-sm text-muted-foreground">© {new Date().getFullYear()} Tawasul</div>
      </footer>
    </div>
  )
}
