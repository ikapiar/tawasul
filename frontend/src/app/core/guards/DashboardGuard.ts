import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync, RedirectCommand,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {firstValueFrom} from 'rxjs';
import {Globals} from '../../shared/globals';

@Injectable()
export class DashboardGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly globals: Globals,
  ) {}

  async canActivate(): Promise<GuardResult> {
    const user = await firstValueFrom(this.authService.currentUserInfo()).catch(() => {
      return null
    });
    if (!user) {
      const loginPath = this.router.parseUrl("/login");
      return new RedirectCommand(loginPath, {
        skipLocationChange: true,
      });
    }
    this.globals.setUser(user);
    return true
  }
}
