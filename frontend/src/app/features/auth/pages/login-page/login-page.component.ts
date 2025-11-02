import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {GoogleLoginButtonComponent} from '../../components/google-login-button.component';

@Component({
  selector: 'app-login-page',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    GoogleLoginButtonComponent
  ],
  template: `
    <mat-card class="card">
      <mat-card-header>
        <mat-card-title class="title">Alumni Area</mat-card-title>
        <mat-card-subtitle class="subtitle">Sign in to continue to Tawasul</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <span class="spacer"></span>
        <google-login-button class="login-button"/>
        <span class="spacer"></span>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `:host{display:block;width:min(480px,100%)}
     .card{padding:var(--space-xl);border-radius:var(--radius-lg);box-shadow:var(--shadow-md);}
     .title{margin:0 0 var(--space-2xs);font-size:1.75rem;font-weight:700}
     .subtitle{margin:0;color:var(--muted-foreground)}
     mat-card-header{margin-bottom:var(--space-md)}
     .login-button{margin: 0 auto}
     .spacer {flex: 1 1 auto}
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {

}
