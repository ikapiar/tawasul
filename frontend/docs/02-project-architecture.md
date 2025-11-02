# 02 — Project Architecture

This section explains how the frontend is organized so you know exactly where new code should go.

We use Angular 20 with standalone components and lazy‑loaded feature routes. Angular Material is the primary UI library.

## Build & hosting model
- This project compiles to static HTML/CSS/JS using the Angular builder with `outputMode: "static"` (see `angular.json`).
- There is no server‑side rendering (SSR) or Node.js runtime required.
- The output folder is `dist/frontend/browser`, which can be deployed to any static host.
- For SPA routing to work on static hosts, configure a fallback to `index.html` for unknown routes.

## High‑level layout

- `src/app/layouts/` — Application shells (landing, auth, dashboard) that render toolbars, nav, and page slots.
- `src/app/features/` — Feature areas, each with its own routes and pages.
- `src/app/services/` — Cross‑feature singleton services (e.g., auth).
- `src/custom-theme.scss` — Angular Material theme (M3).
- `src/styles.css` — Global CSS tokens and minimal reset.

```
src/app/
  app.config.ts        // global providers (router, animations)
  app.routes.ts        // top-level, lazy routes per feature
  layouts/
    landing-layout/
    auth-layout/
    dashboard-layout/
  features/
    landing/
      landing.routes.ts
      pages/
        landing-page/
    auth/
      auth.routes.ts
      pages/
        login-page/
    dashboard/
      dashboard.routes.ts
      pages/
        dashboard-home/
  services/
    auth.service.ts
```

## Conventions

- Standalone components: do not add NgModules; declare dependencies via the `imports` array in `@Component`.
- Do not set `standalone: true`; standalone is the default in this project.
- Use one folder per page component: `pages/<name>-page/<name>-page.component.ts`.
- Put small reusable UI bits next to the page in a `ui/` folder. Larger cross‑feature UI goes to `src/app/shared/` (create if needed).
- Services live in `src/app/services/` unless they are strictly feature‑specific (then put them under `features/<feature>/services/`). Always `providedIn: 'root'` for singletons.
- Use Angular Material components for inputs, buttons, lists, nav, cards, dialogs, menus, etc. Prefer Material over custom CSS.
- Use signals for local component state; avoid global state libraries unless explicitly introduced.
- Use reactive forms over template forms.
- Use native control flow in templates (`@if`, `@for`, `@switch`).
- Avoid `ngClass`/`ngStyle`; use `[class.foo]` or `[style.color]` bindings.
- Avoid `@HostBinding`/`@HostListener`; use the `host` object in the decorator.
- Use `NgOptimizedImage` for static images (no inline base64 images).

## Routing overview

- Top‑level routes are in `src/app/app.routes.ts`. Each path lazy loads a feature’s routes file.
- Each feature has `<feature>.routes.ts` exporting a `Routes` array.
- Layouts are composed in pages or feature shells (e.g., dashboard uses `MatSidenav`).

See 05 — Routing & Layouts for examples.


## Official docs & references
- Angular components: https://angular.dev/guide/components
- Standalone components (concepts): https://angular.dev/guide/components#standalone-components
- Routing overview: https://angular.dev/guide/routing
- Lazy loading: https://angular.dev/guide/routing#lazy-loading
- Angular workspaces and configuration: https://angular.dev/tools/workspace
- Deployment (static hosting): https://angular.dev/guide/deployment
- Angular Material — Getting started: https://material.angular.io/guide/getting-started
