import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, firstValueFrom, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserAccount } from '../interfaces/user-account.model';
import { UserRole } from '../enums/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const expectedRole = route.data['role'];
    const expectedRoles = route.data['roles'];
    return this.authService.userAccount$.pipe(
      take(1),
      map((account) => {
        if (!account) {
          console.log('Guard: not logged in');
          return this.router.parseUrl('/login');
        }
        if (expectedRole) {
          if (account?.role !== expectedRole) {
            console.log('Guard: user not authorized');
            switch (account?.role) {
              case UserRole.ADMIN:
                return this.router.parseUrl('/admin');
              case UserRole.STUDENT:
                return this.router.parseUrl('/home');
              default:
                return this.router.parseUrl('/home');
            }
          }
        } else if (expectedRoles) {
          if (!expectedRoles.includes(account?.role)) {
            console.log('Guard: user not authorized');
            switch (account?.role) {
              case UserRole.ADMIN:
                return this.router.parseUrl('/admin');
              case UserRole.STUDENT:
                return this.router.parseUrl('/home');
              default:
                return this.router.parseUrl('/home');
            }
          }
        }

        // All good, the use is logged in and have access.
        return true;
      })
    );
  }
}
