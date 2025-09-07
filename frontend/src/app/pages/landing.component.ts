import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  year = new Date().getFullYear();
  user = toSignal(this.auth.user$, { initialValue: null });
  login() { this.auth.login().subscribe(() => this.router.navigateByUrl('/onboarding')); }
}
