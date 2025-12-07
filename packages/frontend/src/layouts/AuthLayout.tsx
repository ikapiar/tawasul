import { Link } from 'wouter'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-success/10">
        <div className="max-w-md p-10 text-center">
          <div className="h-10 w-10 rounded-lg bg-primary mx-auto mb-4" />
          <h2 className="text-3xl font-semibold">Welcome to Tawasul</h2>
          <p className="text-muted-foreground mt-2">Connect alumni, share stories, and explore opportunities.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-md bg-primary" />
            <span className="font-semibold">Tawasul</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  )
}
