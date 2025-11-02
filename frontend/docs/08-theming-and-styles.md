# 08 — Theming and Styles

We use Angular Material 3 theming plus a small set of global CSS tokens. The goal is to rely on Material for most styling and only add minimal, predictable CSS when needed.

## Material theme
- File: `src/custom-theme.scss`
- We include Material’s theme mixin `mat.theme()` to emit CSS variables.
- Default color scheme: light; typography: Roboto; density: 0.

How to adjust primary/tertiary palettes or density:
```scss
@use '@angular/material' as mat;

html {
  @include mat.theme((
    color: (
      primary: mat.$azure-palette,
      tertiary: mat.$blue-palette,
    ),
    typography: Roboto,
    density: 0, // -1 (denser) to +1 (spacious)
  ));
}
```

Prefer updating theme tokens over writing custom CSS.

## Global CSS tokens
- File: `src/styles.css`
- Provides design tokens for spacing, radii, shadows, and a few colors to help with light layout styling.
- Use these tokens for minimal custom CSS:
  - Spacing: `var(--space-md)`
  - Corners: `var(--radius-lg)`
  - Shadows: `var(--shadow-sm)`

## CSS rules of engagement
- Keep component CSS small; prefer Material components for structure (cards, lists, toolbar, nav, dialogs).
- Avoid deep CSS overrides on Material components; prefer input APIs (e.g., `appearance="outline"` on `mat-form-field`).
- Do not use `ngClass`/`ngStyle`; use explicit `[class.foo]` and `[style.width.px]` bindings.
- Use the `host` object in `@Component` for host classes instead of `@HostBinding`.
- Use `NgOptimizedImage` for static images, never inline base64.

## Examples
Card spacing with tokens:
```css
.card {
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
```

Toolbar with bottom border using CSS vars:
```css
.navbar {
  background: var(--panel-bg);
  border-bottom: 1px solid var(--border-color);
}
```

## Dark mode (future)
- We can support dark mode by switching `color-scheme` to `light dark` and adding a `dark` class variant if needed.
- Keep custom CSS minimal to allow Material tokens to handle most color choices.


## Official docs & references
- Angular Material — Theming (Material 3): https://material.angular.io/guide/theming
- Typography: https://material.angular.io/guide/typography
- Density: https://material.angular.io/guide/density
- Angular image directive (`NgOptimizedImage`): https://angular.dev/guide/image-directive
- Material components overview: https://material.angular.io/components/categories
