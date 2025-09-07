import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../services/auth.service';
import { OnboardingService } from '../services/onboarding.service';

@Component({
  selector: 'app-connect',
  imports: [CommonModule, RouterLink],
  templateUrl: './connect.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private onboarding = inject(OnboardingService);
  user = toSignal(this.auth.user$, { initialValue: null });
  constructor(){
    setTimeout(() => {
      if (!this.onboarding.profileSig()) {
        this.router.navigateByUrl('/onboarding');
      }
    }, 0);
  }
  logout(){ this.auth.logout().subscribe(() => { this.onboarding.clear(); this.router.navigateByUrl('/'); }); }
}
