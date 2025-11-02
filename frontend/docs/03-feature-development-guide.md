# 03 — Feature Development Guide

This is the fastest path to add a new feature or page without touching complex CSS. We use Angular Material for UI and keep custom CSS minimal.

## Add a new feature with one page
Below we add a `profile` feature with a `profile-page`.

1) Create folders
```
src/app/features/profile/
  pages/
    profile-page/
  profile.routes.ts
```

2) Create the page component
Create `src/app/features/profile/pages/profile-page/profile-page.component.ts`:
```ts
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

3) Create feature routes
Create `src/app/features/profile/profile.routes.ts`:
```ts
import { Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

export const ProfileRoutes: Routes = [
  { path: '', component: ProfilePageComponent }
];
```

4) Register top‑level lazy route
Add a new entry to `src/app/app.routes.ts`:
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

Now visit `/profile`.

## Add a second page in the same feature
Add `settings-page` under `features/profile/pages/` and update `profile.routes.ts`:
```ts
import { Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

export const ProfileRoutes: Routes = [
  { path: '', component: ProfilePageComponent },
  { path: 'settings', component: SettingsPageComponent }
];
```
Navigate to `/profile/settings`.

## Forms pattern (Material + Reactive Forms)
Use Reactive Forms and Material form fields. Example skeleton:
```ts
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-example-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
      <mat-form-field class="full-width" appearance="outline">
        <mat-label>Name</mat-label>
        <input matInput formControlName="name" required>
        @if (form.controls.name.touched && form.controls.name.hasError('required')) {
          <mat-error>Name is required</mat-error>
        }
      </mat-form-field>

      <button mat-raised-button color="primary" [disabled]="form.invalid || submitting()">Save</button>
    </form>
  `,
  styles: [`.form{display:grid;gap:var(--space-md)} .full-width{width:100%}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFormComponent {
  private readonly fb = inject(FormBuilder);
  protected readonly submitting = signal(false);
  readonly form = this.fb.nonNullable.group({ name: ['', Validators.required]});
  onSubmit(){ if(this.form.invalid) return; this.submitting.set(true); }
}
```

## Minimal CSS only when needed
- Prefer Material components for layout and inputs.
- Use our CSS tokens from `src/styles.css` for spacing/radius/shadows.
- Avoid `ngClass`/`ngStyle`. Use `[class.x]` and `[style.y.px]` instead.

See 04 — UI & Angular Material and 08 — Theming & Styles for more patterns.


## Official docs & references
- Angular components overview: https://angular.dev/guide/components
- Standalone components: https://angular.dev/guide/components#standalone-components
- Routing fundamentals: https://angular.dev/guide/routing
- Reactive Forms guide: https://angular.dev/guide/forms
- Reactive Forms API (FormBuilder, Validators): https://angular.dev/api/forms
- Signals overview: https://angular.dev/guide/signals
- Change detection (OnPush): https://angular.dev/guide/change-detection
- Angular Material — Components: https://material.angular.io/components/categories
