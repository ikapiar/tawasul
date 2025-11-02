# Tawasul Frontend

Welcome to the Tawasul frontend. This app uses Angular 20 with standalone components and Angular Material (M3). We keep custom CSS minimal so anyone can contribute without deep CSS knowledge.

- Docs index: [`frontend/docs/README.md`](./docs/README.md)
- App source: [`src/app`](./src/app)

This project is built and run with Bun, and compiles to static HTML/CSS/JS suitable for any static host.

## Quickstart (Bun)
```bash
# from repository root
cd frontend
bun install
bun run start
# open http://localhost:4200
```

Build, test, and preview static output:
```bash
bun run build     # production build -> dist/frontend/browser (static assets)
bun run test      # unit tests
bun run preview   # serve static build at http://localhost:4201
```

## Add a page in 5 minutes
Example: Add a new `profile` feature with a `profile-page`.

1) Create files
```
src/app/features/profile/
  pages/
    profile-page/
      profile-page.component.ts
  profile.routes.ts
```

2) Page component (Material‑first)
```ts
// src/app/features/profile/pages/profile-page/profile-page.component.ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile-page',
  imports: [MatCardModule, MatButtonModule],
  template: `
    <mat-card>
      <h1 class="title">My Profile</h1>
      <p class="subtitle">Edit your personal information</p>
      <button mat-raised-button color="primary">Edit profile</button>
    </mat-card>
  `,
  styles: [
    `.title{margin:0 0 var(--space-xs)}
     .subtitle{margin:0 0 var(--space-md);color:var(--muted-foreground)}
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {}
```

3) Feature routes
```ts
// src/app/features/profile/profile.routes.ts
import { Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

export const ProfileRoutes: Routes = [
  { path: '', component: ProfilePageComponent }
];
```

4) Register lazy route
```ts
// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  // ...
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.routes').then(m => m.ProfileRoutes)
  },
  // ...
];
```

Visit http://localhost:4200/profile

More patterns and copy‑paste snippets: see [`03 — Feature Development Guide`](./docs/03-feature-development-guide.md).

## Conventions at a glance
- Standalone components; do not create NgModules; don’t set `standalone: true` (default).
- Always set `changeDetection: ChangeDetectionStrategy.OnPush`.
- Use Angular Material for UI (buttons, cards, inputs, toolbar, sidenav, lists, dialogs).
- Use signals for local state; `computed()` for derived state.
- Use Reactive Forms; show validation with `mat-error`.
- Use native control flow in templates (`@if`, `@for`, `@switch`).
- Avoid `ngClass`/`ngStyle`; use explicit `[class.foo]` / `[style.bar.px]`.
- Put shared services in `src/app/services/`; feature‑only services under the feature folder; `providedIn: 'root'` for singletons.
- Use `NgOptimizedImage` for static images (no base64 inline).

If in doubt, prefer Angular Material over custom CSS.

## Static build and hosting
- The app builds to static assets under `dist/frontend/browser` (see `angular.json` with `outputMode: "static"`).
- You can deploy the contents of that folder to any static host (GitHub Pages, Netlify, Cloudflare Pages, S3, Nginx, etc.).
- For SPA routing, configure a fallback to `index.html`.
- See the deployment guide: [`docs/13-deployment-static-hosting.md`](./docs/13-deployment-static-hosting.md)

## Need more?
Start with the docs: [`frontend/docs/README.md`](./docs/README.md)
