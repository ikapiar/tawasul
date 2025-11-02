# 10 — Code Style and Tools

Our goal is readable, maintainable, and consistent code. Follow these rules and you’ll fit right in.

## TypeScript
- Strict types; prefer inference when obvious.
- Avoid `any`. If unsure, use `unknown` and narrow.
- Favor small, typed interfaces for request/response models.

## Angular conventions
- Standalone components only; do not create NgModules.
- Do not set `standalone: true` in decorators (it’s the default here).
- Use `ChangeDetectionStrategy.OnPush` on all components.
- Use signals for local state; `computed()` for derived state.
- Use `input()` and `output()` functions instead of decorators when adding inputs/outputs to components.
- Use Reactive Forms instead of template-driven forms.
- Use native template control flow (`@if`, `@for`, `@switch`).
- Avoid `ngClass` and `ngStyle`; use `[class.foo]` and `[style.bar.px]` instead.
- Avoid `@HostBinding`/`@HostListener`; place host bindings in the `host` object of the decorator.
- Prefer `inject()` over constructor injection for services and HttpClient.

## UI
- Angular Material first. Use Material components before writing custom CSS.
- Use `NgOptimizedImage` for static images (no inline base64).
- Keep CSS minimal; use tokens from `src/styles.css` (spacing, radius, shadow).

## File structure and naming
- Pages live under `features/<feature>/pages/<name>-page/`.
- Component files use `kebab-case`, e.g. `login-page.component.ts`.
- Services in `src/app/services/` for shared; feature-only services under the feature folder.

## Formatting
- Prettier is configured in `package.json`.
- Format before commit:
```bash
bunx --yes prettier --write .
```

## Useful scripts
```bash
# dev server
bun run start

# production build
bun run build

# unit tests
bun run test

# preview static build locally
bun run preview
```

## Commit messages
- Use present tense, imperative mood: "Add profile page", "Fix login error".
- Reference issues when relevant, e.g., "feat(profile): add edit form (#123)".

## Reviews
- Keep PRs small and focused.
- Include screenshots/GIFs for UI changes.
- Check the PR checklist in 12 — Checklists before requesting review.


## Official docs & references
- Angular style guide: https://angular.dev/style-guide
- Components and change detection best practices: https://angular.dev/guide/change-detection
- Inputs/Outputs functions: https://angular.dev/guide/components/inputs-outputs
- Template control flow (`@if`, `@for`, `@switch`): https://angular.dev/guide/templates/control-flow
- Signals overview: https://angular.dev/guide/signals
- TypeScript Handbook (official): https://www.typescriptlang.org/docs/handbook/intro.html
- ESLint — User Guide: https://eslint.org/docs/latest/
- Prettier — Documentation: https://prettier.io/docs/en/
- Angular CLI — Commands: https://angular.dev/cli
