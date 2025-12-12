import { Link } from 'wouter'
import {useEffect} from "react";
import { buttonVariants } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import {useAuthStore} from "../stores/authStore";
import {useServices} from "../hooks/useServices";

export default function LandingPage() {
    const {fetchUser, isLoading} = useAuthStore()
    const {authService} = useServices()
    useEffect(() => {
        fetchUser(authService).catch()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }
  return (
    <div>
      {/* Hero */}
      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Stay connected with your alumni network
            </h1>
            <p className="text-muted-foreground mt-4 max-w-prose">
              Tawasul helps alumni connect, share updates, and discover opportunities. Join the community and never miss a story.
            </p>
            <div className="mt-8 flex gap-3">
              {/*<Link href="/login" className={buttonVariants({ variant: 'success', size: 'lg' })}>Get Started</Link>*/}
              <a href="#feed" className={buttonVariants({ variant: 'outline', size: 'lg' })}>Explore</a>
            </div>
          </div>
          <div className="rounded-xl border bg-gradient-to-br from-primary/10 via-white to-success/10 aspect-video" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Articles', desc: 'Read alumni-written articles and insights.' },
            { title: 'News', desc: 'Stay updated with the latest alumni news.' },
            { title: 'Events', desc: 'Discover and join upcoming events.' },
          ].map((f) => (
            <Card key={f.title}>
              <CardHeader>
                <CardTitle>{f.title}</CardTitle>
                <CardDescription>{f.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-28 rounded-md bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Feed preview */}
      <section id="feed" className="container py-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Latest from alumni</h2>
          <Link href="/" className={buttonVariants({ variant: 'link' })}>View all</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge>Article</Badge>
                  <span className="text-xs text-muted-foreground">Dec 5, 2025</span>
                </div>
                <CardTitle>Sample alumni story {i}</CardTitle>
                <CardDescription>Short description of the alumni article or news item.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-28 rounded-md bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container py-12">
        <div className="rounded-xl border p-6 md:p-10 bg-white">
          <h3 className="text-xl font-semibold">Have something to share?</h3>
          <p className="text-muted-foreground mt-2">Submit your article, news, or event to reach the alumni network.</p>
          <div className="mt-4">
            <Link href="/login" className={buttonVariants({ variant: 'default' })}>Submit content</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
