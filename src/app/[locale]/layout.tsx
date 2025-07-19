import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './../globals.css';
import { I18nProviderClient } from '@/locales/client';
import type { Locale } from '@/locales/server';
import { ThemeProvider } from '@/components/app/theme-provider';

export const metadata: Metadata = {
  title: 'ikapiar Connect',
  description: 'A professional web app for high school alumni networking.',
};

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale }
}>) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <I18nProviderClient locale={locale}>
            {children}
            <Toaster />
          </I18nProviderClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
