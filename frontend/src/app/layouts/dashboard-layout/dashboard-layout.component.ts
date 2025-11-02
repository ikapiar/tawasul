import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, RouterLink, MatSidenavModule, MatToolbarModule, MatListModule, MatButtonModule, MatIconModule],
  template: `
    <mat-sidenav-container class="shell">
      <mat-sidenav #sidenav mode="side" opened>
        <a routerLink="/dashboard" class="logo">Tawasul</a>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Home</span>
          </a>
          <a mat-list-item routerLink="/dashboard/profile">
            <mat-icon matListItemIcon>person</mat-icon>
            <span matListItemTitle>Profile</span>
          </a>
          <a mat-list-item routerLink="/dashboard/settings">
            <mat-icon matListItemIcon>settings</mat-icon>
            <span matListItemTitle>Settings</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button type="button" class="menu-button" (click)="sidenav.toggle()" aria-label="Toggle menu">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="spacer"></span>
          <a mat-button routerLink="/">
            <mat-icon>home</mat-icon>
            <span class="hide-sm">Back to site</span>
          </a>
        </mat-toolbar>
        <main class="main">
          <router-outlet />
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `:host{display:block;min-height:100dvh;background:var(--app-bg)}
     .shell{min-height:100dvh}
     .logo{display:inline-block;margin:var(--space-md);font-weight:800;text-decoration:none}
     .spacer{flex:1 1 auto}
     .main{padding:var(--space-xl)}
     @media (min-width: 961px){ .menu-button{ display:none } }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'dashboard-layout'
  }
})
export class DashboardLayoutComponent {}
