# 05 — Routing and Layouts

This project uses lazy‑loaded feature routes and three primary layouts.

- Landing layout: public marketing site (toolbar + footer)
- Auth layout: simple shell for auth pages
- Dashboard layout: app shell with sidenav

## Top‑level routes
Defined in `src/app/app.routes.ts` and lazy‑load feature routes:
```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./features/landing/landing.routes').then(m => m.LandingRoutes) },
  { path: 'login', loadChildren: () => import('./features/auth/auth.routes').then(m => m.AuthRoutes) },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DashboardRoutes) }
];
```

## Feature routes
Each feature exports a `Routes` array, e.g. `src/app/features/auth/auth.routes.ts`:
```ts
import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const AuthRoutes: Routes = [
  { path: '', component: LoginPageComponent }
];
```

## Layouts
Layouts live in `src/app/layouts/` and are plain standalone components used by pages.

- Landing: `landing-layout/landing-layout.component.*`
  - Uses `MatToolbar` for the top nav and a custom footer.
- Auth: `auth-layout/auth-layout.component.ts`
  - Primary toolbar + centered outlet for auth pages.
- Dashboard: `dashboard-layout/dashboard-layout.component.ts`
  - `MatSidenavContainer` shell with nav list and top toolbar.

Pages render inside the layout components via their templates. To use a layout, simply include it in a page template or design the page to assume the layout’s shell around it (as done for landing and dashboard).

## Fragment links and scrolling
We enable in‑memory scrolling in `app.config.ts` with `withInMemoryScrolling`.
- Use router links with `fragment`: `<a routerLink="/" fragment="about">About</a>`
- Sections in the landing page use `id`, and `scroll-margin-top` is set in CSS to offset the sticky toolbar.

## Lazy loading: do’s
- Keep feature bundles small; import only needed Material modules in each page.
- Move feature‑specific services under the feature if they aren’t shared.

See also: 02 — Project Architecture.


## Official docs & references
- Angular Router — Guide: https://angular.dev/guide/routing
- Route configuration (API): https://angular.dev/api/router/Routes
- Lazy loading: https://angular.dev/guide/routing#lazy-loading
- RouterLink directive: https://angular.dev/api/router/RouterLink
- Scrolling and fragments (`withInMemoryScrolling`): https://angular.dev/guide/routing#configure-scrolling
- Provide the router (API): https://angular.dev/api/router/provideRouter
- Material layout components: Toolbar https://material.angular.io/components/toolbar/overview, Sidenav https://material.angular.io/components/sidenav/overview, List https://material.angular.io/components/list/overview
