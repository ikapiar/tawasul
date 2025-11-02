# 12 — Checklists

Use these checklists to ensure consistency and quality.

## Feature checklist (copy‑paste into your PR description)
- [ ] Routes: Added/updated feature routes and top‑level lazy route if needed
- [ ] Components: Standalone, `ChangeDetectionStrategy.OnPush`, small and focused
- [ ] State: Signals for local state, `computed()` for derived, no `mutate`
- [ ] Forms: Reactive Forms with `mat-form-field` + `matInput`, inline `mat-error`
- [ ] UI: Angular Material first (buttons, cards, lists, toolbar, sidenav, dialogs)
- [ ] CSS: Minimal; uses tokens from `src/styles.css`; no heavy custom styling
- [ ] Accessibility: Keyboard reachable, visible focus, `aria-label` on icon buttons, labels and errors for fields, `alt` on images
- [ ] Images: `NgOptimizedImage` for static images
- [ ] Imports: Only necessary Material modules imported in `imports` array
- [ ] Services: In `src/app/services/` for shared; feature‑specific under the feature; `providedIn: 'root'` for singletons
- [ ] Routing fragments: Use `fragment` for in‑page nav where applicable
- [ ] Tests: Added/updated basic unit tests for new logic (where reasonable)
- [ ] Formatting: Ran Prettier and fixed linting/build warnings
- [ ] Static‑safe: No Node‑only APIs in browser code; assets referenced via `public/` or `assets/`; deep links work with SPA fallback

## PR checklist
- [ ] Clear title and description; links to issue/ticket
- [ ] Screenshots/GIFs for UI changes (desktop + mobile if applicable)
- [ ] Kept changes focused and small; split into multiple PRs if large
- [ ] Verified build locally (`bun run build`) and ran tests (`bun run test`)
- [ ] Verified a11y basics (keyboard/focus/labels/contrast)
- [ ] Double‑checked routes and navigation (deep links, back/forward)

## When to use custom CSS
- Marketing/brand areas (hero, footer visuals) or small spacing tweaks
- When Material doesn’t provide a component or API for a specific need
- Keep styles localized to the component and use project tokens (`var(--space-*)`, `var(--radius-*)`, `var(--shadow-*)`)

If you are unsure, default to Material components and open a discussion in the PR.


## Official docs & references
- Angular style guide: https://angular.dev/style-guide
- Angular components overview: https://angular.dev/guide/components
- Signals overview: https://angular.dev/guide/signals
- Reactive Forms guide: https://angular.dev/guide/forms
- Angular Material — Getting started: https://material.angular.io/guide/getting-started
- Router guide (lazy loading, fragments): https://angular.dev/guide/routing
- HttpClient guide: https://angular.dev/guide/http
- Image directive (`NgOptimizedImage`): https://angular.dev/guide/image-directive
- Accessibility (Material a11y): https://material.angular.io/guide/a11y
- Testing overview: https://angular.dev/guide/testing
