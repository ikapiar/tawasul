'use client';
import { IkapiarLogo } from '@/components/app/ikapiar-logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useI18n } from '@/locales/client';
import Image from 'next/image';
import { ThemeToggle } from '@/components/app/theme-toggle';
import { Twitter, Linkedin, Instagram } from 'lucide-react';
import { useCurrentLocale } from '@/locales/client';

export default function LandingPage() {
  const t = useI18n();
  const locale = useCurrentLocale();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center gap-2 mr-6">
            <IkapiarLogo className="w-8 h-8" />
            <span className="font-bold font-headline">IKAPIAR</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#about" className="text-muted-foreground transition-colors hover:text-foreground">
              {t('landing.nav.about')}
            </Link>
          </nav>
          <div className="flex flex-1 items-center justify-end gap-2">
             <ThemeToggle />
            <Button asChild>
              <Link href={`/${locale}/connect`}>{t('landing.nav.login')}</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
               <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-primary">
                {t('landing.hero.title')}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('landing.hero.subtitle')}
              </p>
              <Button size="lg" asChild>
                <Link href={`/${locale}/connect`}>{t('landing.hero.cta')}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="about" className="py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">{t('landing.about.title')}</h2>
                <p className="text-muted-foreground">
                 {t('landing.about.paragraph1')}
                </p>
                 <p className="text-muted-foreground">
                 {t('landing.about.paragraph2')}
                </p>
              </div>
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://placehold.co/600x400.png"
                  alt={t('landing.about.image_alt')}
                  fill
                  className="object-cover"
                  data-ai-hint="university campus"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 border-t bg-secondary">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
           <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} IKAPIAR. {t('landing.footer.rights')}</p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
