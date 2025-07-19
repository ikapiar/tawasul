import { createI18nServer } from 'next-international/server';

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale, getScopedStaticParams } = createI18nServer({
  en: () => import('./en'),
  id: () => import('./id'),
});

export type Locale = 'en' | 'id';
export type ScopedT<T extends string> = string & { _?: T };
