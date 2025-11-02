# 04 — UI and Angular Material

We use Angular Material (M3) for almost all UI. This lets contributors build features without writing much CSS.

Principles:
- Prefer Material components (buttons, cards, form fields, sidenav, toolbar, list, menu, dialog, tabs, chips, progress, etc.).
- Keep templates simple, use native control flow (`@if`, `@for`, `@switch`).
- Use our CSS tokens from `src/styles.css` for spacing, radii, and shadows when needed.

## Imports in standalone components
Declare Material modules directly in the component `imports` array:
```ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-example',
  imports: [MatButtonModule, MatCardModule],
  template: `
    <mat-card>
      <h2>Example</h2>
      <button mat-raised-button color="primary">Action</button>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {}
```

Notes:
- Do not add NgModules; standalone is the default (do not set `standalone: true`).
- Import only what you use to keep bundles lean.

## Forms
Use Reactive Forms + `MatFormField` + `matInput`:
```ts
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// in @Component imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
// template snippet:
// <form [formGroup]="form" (ngSubmit)="onSubmit()">
//   <mat-form-field appearance="outline" class="full-width">
//     <mat-label>Email</mat-label>
//     <input matInput type="email" formControlName="email" required>
//     @if(form.controls.email.touched && form.controls.email.hasError('required')) { <mat-error>Email is required</mat-error> }
//   </mat-form-field>
//   <button mat-raised-button color="primary" [disabled]="form.invalid">Submit</button>
// </form>
```

## Layout
- Landing shell: `MatToolbar` for navbar, Material buttons for actions.
- Dashboard shell: `MatSidenavContainer` + `MatSidenav` + `MatToolbar` + `MatNavList`.
- Use Material elevations by default (`mat-card`, `mat-menu`, `mat-dialog`).

## Icons
- We use Material Icons (ligature) via the link in `src/index.html`.
- In templates use: `<mat-icon>home</mat-icon>`.

## When custom CSS is allowed
- Marketing/brand areas (hero, footer visuals)
- Light layout spacers: use tokens from `src/styles.css` (e.g., `var(--space-md)`).
Avoid deep customization of Material unless required.

## Accessibility defaults
- Material components ship with accessible roles and keyboard interactions.
- Always provide `aria-label` for icon buttons and external links.

See also: 08 — Theming & Styles.


## Official docs & references
- Angular Material — Getting started: https://material.angular.io/guide/getting-started
- Components overview: https://material.angular.io/components/categories
- Theming (Material 3): https://material.angular.io/guide/theming
- Typography: https://material.angular.io/guide/typography
- Density: https://material.angular.io/guide/density
- Icons: https://material.angular.io/components/icon/overview
- Form field: https://material.angular.io/components/form-field/overview
- Input: https://material.angular.io/components/input/overview
- Card: https://material.angular.io/components/card/overview
- Toolbar: https://material.angular.io/components/toolbar/overview
- Sidenav: https://material.angular.io/components/sidenav/overview
- List: https://material.angular.io/components/list/overview
- Menu: https://material.angular.io/components/menu/overview
- Dialog: https://material.angular.io/components/dialog/overview
- Tabs: https://material.angular.io/components/tabs/overview
