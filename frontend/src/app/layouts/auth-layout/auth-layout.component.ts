import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary" class="auth-header">
      <a routerLink="/" class="brand">Tawasul</a>
      <span class="spacer"></span>
      <a mat-button routerLink="/">Home</a>
    </mat-toolbar>
    <main class="auth-main">
      <router-outlet />
    </main>
    <footer class="auth-footer">© 2025 IKAPIAR</footer>
  `,
  styles: [
    `:host{display:block;min-height:100dvh;}
     .auth-header{}
     .brand{text-decoration:none;color:inherit;font-weight:700;}
     .spacer{flex:1 1 auto}
     .auth-main{min-height:calc(100dvh - 110px);display:grid;place-items:center;padding:var(--space-xl);}
     .auth-footer{padding:var(--space-md);text-align:center;color:var(--muted-foreground);border-top:1px solid var(--border-color);}
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'auth-layout'
  }
})
export class AuthLayoutComponent {}
