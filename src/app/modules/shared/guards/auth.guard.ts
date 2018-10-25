import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from './../services/nodejs/authentication.service'; 

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    

    if(!sessionStorage.getItem('access_token')) {
      this.router.navigate(['/login']);
    }

    return true;
  }
}
