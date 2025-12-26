import { Link } from "wouter";

export function NotFound() {

    return (
        <div className="flex min-h-screen items-center justify-center text-center p-8">
            <div>
                <h1 className="text-2xl font-semibold">Page not found</h1>
                <p className="text-muted-foreground mt-2">The page you are looking for does not exist.</p>
                <Link href='/dashboard' className="text-primary underline inline-block mt-4">Go to home</Link>
            </div>
        </div>
    )
}