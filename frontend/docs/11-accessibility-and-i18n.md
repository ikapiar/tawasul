# 11 — Accessibility and i18n

Accessibility (a11y) is a first‑class requirement. Angular Material provides solid defaults, but we must follow a few rules to keep the UI inclusive. Internationalization (i18n) can be introduced progressively.

## Accessibility essentials
- Keyboard: All interactive elements must be reachable and operable via keyboard (Tab/Shift+Tab/Enter/Space/Arrow keys).
- Focus: Use visible focus. We have a default outline in `src/styles.css`. Do not remove it.
- Labels:
  - Icon buttons must have `aria-label`.
  - Form fields must have a visible label (`<mat-label>`) and useful error messages.
- Color contrast: Prefer Material defaults. If you add custom colors, ensure AA contrast.
- Semantics:
  - Use native elements when possible (`<button>`, `<a>`, `<header>`, `<nav>`, `<main>`, `<footer>`).
  - Avoid `div` soup for interactive controls.
- Images: Provide `alt` text. Use `NgOptimizedImage` for static images.
- Live regions: For dynamic status messages, consider `aria-live="polite"`.

## Material tips
- Icon buttons: always set `aria-label`.
  ```html
  <button mat-icon-button aria-label="Open menu"><mat-icon>menu</mat-icon></button>
  ```
- Form field hints and errors use `mat-hint` and `mat-error` inside `mat-form-field`.
- Dialogs/menus: Material handles focus trap and roles; make sure you give meaningful titles/labels.

## Routing and landmarks
- Only one `<main>` landmark per page.
- Sticky toolbars should not steal focus; programmatic focus should land in the primary content for modals/dialogs.

## i18n (Internationalization)
We currently have a single locale (English). When introducing i18n:
- Use Angular’s built‑in i18n or a message library of your choice.
- Extract user‑visible copy to a messages file.
- Keep messages short and avoid string concatenation.

Example using Angular i18n markers:
```html
<h1 i18n>Welcome back</h1>
<p i18n="@@loginSubtitle">Sign in to continue to Tawasul</p>
```

## Accessibility checklist (per page)
- Interactive controls are reachable and operable with keyboard.
- Visible focus is present and not obstructed.
- Icon buttons and links have `aria-label` when text is not visible.
- Form fields have labels and error messages.
- Images have descriptive `alt` text.
- Color contrast meets AA (use a contrast checker if you add colors).


## Official docs & references
- Angular i18n guide: https://angular.dev/guide/i18n
- Angular image directive (`NgOptimizedImage`): https://angular.dev/guide/image-directive
- Angular Material — Accessibility guide: https://material.angular.io/guide/a11y
- CDK Accessibility (a11y) overview: https://material.angular.io/cdk/a11y/overview
- WAI-ARIA Authoring Practices 1.2 (W3C): https://www.w3.org/TR/wai-aria-practices-1.2/
- WCAG 2.2 (W3C): https://www.w3.org/TR/WCAG22/
