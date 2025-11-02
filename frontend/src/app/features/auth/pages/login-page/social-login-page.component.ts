import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-social-login-page',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatButton,
    RouterLink
  ],
  template: `
    <mat-card class="card">
      <mat-card-header>
        <mat-card-title class="title">Alumni Area</mat-card-title>
        <mat-card-subtitle class="subtitle">Sign in to continue to Tawasul</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <div class="row">
          <a mat-button routerLink="/">Back to landing page</a>
          <span class="spacer"></span>
          <button mat-raised-button color="primary">
            Sign in with Google
          </button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `:host{display:block;width:min(480px,100%)}
    .card{padding:var(--space-xl);border-radius:var(--radius-lg);box-shadow:var(--shadow-md);}
    .title{margin:0 0 var(--space-2xs);font-size:1.75rem;font-weight:700}
    .subtitle{margin:0;color:var(--muted-foreground)}
     mat-card-header{margin-bottom:var(--space-md)}
    .row{display:flex;align-items:center;gap:var(--space-md)}
    .row .spacer{flex:1 1 auto}
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialLoginPageComponent {}
