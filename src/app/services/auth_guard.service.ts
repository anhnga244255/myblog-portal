/**
 * Created by phuongho on 11/12/16.
 */
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { UserIdentityService } from './user_identity.service';
import { Observable } from 'rxjs';
import { PlatformHelper } from '../helpers/platform.helper';
import { SESSION } from '../modules/constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let isValid = true;
    let profile = UserIdentityService.getProfile();
    let routeData: any = route.data;
    if (!UserIdentityService.isLoggedIn()) {
      this._router.navigate(['login'], {queryParams: { return: state.url }});
      isValid = false;
    } else if (profile) {
      if (routeData && routeData.privileges && profile && profile.role
        && routeData.privileges.indexOf(profile.role.keyword) >= 0) {
        isValid = true;
      } else {
        isValid = false;
      }

      if (isValid === false) {
        this._router.navigate(['admin/dashboard']);
      }
    }
    return isValid;
  }
}
