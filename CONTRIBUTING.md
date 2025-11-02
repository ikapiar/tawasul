# Contributing to Tawasul

Thanks for your interest in contributing! This document helps you get productive fast. If you’re working on the frontend UI, please start with the Frontend Developer Docs.

- Frontend docs index: `frontend/docs/README.md`
- Frontend quickstart: `frontend/README.md`

## Frontend: What goes where
- Layouts (nav/shells): `frontend/src/app/layouts/`
- Features (pages, routes): `frontend/src/app/features/<feature>/`
- Shared services: `frontend/src/app/services/`
- Global styles: `frontend/src/styles.css`
- Angular Material theme: `frontend/src/custom-theme.scss`

## Frontend rules (short version)
- Standalone components only (do not create NgModules); don’t set `standalone: true`.
- Use Angular Material components for UI; keep custom CSS minimal.
- Use signals for local state; `computed()` for derived; `set()`/`update()`; avoid `mutate`.
- Always set `changeDetection: ChangeDetectionStrategy.OnPush`.
- Use Reactive Forms and show validation with `mat-error`.
- Use native template control flow (`@if`, `@for`, `@switch`).
- Avoid `ngClass`/`ngStyle`; use explicit class/style bindings.
- Avoid `@HostBinding`/`@HostListener`; use the `host` object in the decorator.
- Prefer `inject()` over constructor injection; services should be `providedIn: 'root'`.
- Use `NgOptimizedImage` for static images (no base64 inline).

If in doubt, default to Angular Material and check the docs under `frontend/docs/`.

## Getting started (frontend)
```bash
cd frontend
npm install
npm start
# open http://localhost:4200
```
See the "Add a page in 5 minutes" walkthrough in `frontend/README.md`.

## Pull Requests
- Keep PRs small and focused.
- Include screenshots/GIFs for UI changes.
- Run `npm run build` and `npm test` locally.
- Use the checklists in `frontend/docs/12-checklists.md`.

## Code of Conduct
Be respectful and constructive. We want a welcoming environment for everyone.
