import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const roles = route.data['roles'];

    const allowed =
      this.authService.isUserLoggedIn() && this.checkAuthorities(roles);
    if (!allowed) {
      this.authService.logout();
      this.router.navigate(['']);
      return false;
    }

    return true;
  }

  checkAuthorities(roles: string[]): boolean {
    const authoritiesString = sessionStorage.getItem('authorities');
    if (authoritiesString) {
      const authorities = JSON.parse(authoritiesString) as {
        authority: string;
      }[];
      return roles.every((role) =>
        authorities.some((auth) => auth.authority === role)
      );
    }
    return false;
  }
}
