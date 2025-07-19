import { createI18nMiddleware } from 'next-international/middleware';
import type { NextRequest } from 'next/server';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'id'],
  defaultLocale: 'en',
  resolveLocaleFromRequest: request => {
    const country = request.geo?.country;
    if (country === 'ID') {
      return 'id';
    }
    return 'en';
  }
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};
