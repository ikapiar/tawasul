# 01 — Getting Started

This guide helps you set up the Tawasul frontend quickly.

Our frontend is a client-side Angular SPA that compiles to static HTML/CSS/JS. You can host the build output on any static host (GitHub Pages, Netlify, Cloudflare Pages, S3, Nginx, etc.).

## Prerequisites
- Bun ≥ 1.1.0
- Chrome (for running unit tests with Karma)

Check your versions:
```bash
bun -v
```

## Install dependencies
```bash
cd frontend
bun install
```

## Run the app (dev)
```bash
bun run start
# opens http://localhost:4200
```

Hot reload is enabled. The terminal shows build status.

## Build (prod)
```bash
bun run build
# output in dist/frontend/browser (static assets)
```

## Preview the static build locally
```bash
bun run preview
# serves dist/frontend/browser at http://localhost:4201
```

## Project uses
- Angular 20 (standalone components)
- Angular Material 20 (M3)
- Reactive Forms
- Signals for local state
- Prettier for formatting

## Formatting
We use Prettier. Format all files before committing:
```bash
bunx --yes prettier --write .
```

## Troubleshooting
- If Material styles look missing, ensure `src/custom-theme.scss` is included in `angular.json` (it is by default).
- If icons don’t render, confirm the Material Icons link exists in `src/index.html`.
- Clear cache when in doubt: `rm -rf node_modules bun.lockb && bun install`.


## Official docs & references
- Angular overview: https://angular.dev/overview
- Angular CLI (commands): https://angular.dev/cli
- Dev server (`ng serve`): https://angular.dev/tools/cli/serve
- Build for production (`ng build`): https://angular.dev/tools/cli/build
- Angular workspaces and configuration: https://angular.dev/tools/workspace
- Angular Material — Getting started: https://material.angular.io/guide/getting-started
- Image optimization (`NgOptimizedImage`): https://angular.dev/guide/image-directive
- Prettier — Documentation: https://prettier.io/docs/en/
