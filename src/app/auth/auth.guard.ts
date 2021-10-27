import { CONTENT_ATTR } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
 
  constructor(private authService : AuthService, private router : Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkLoggedUser(next, url);
  }
 
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  checkLoggedUser(route : ActivatedRouteSnapshot, url : any) : boolean {  
    if(this.authService.isLogged()) {
      const role = this.authService.getRole();
      if(route.data.role && route.data.role.indexOf(role) === -1) {
        switch(role) {
          case 'cliente':
            this.router.navigate(['/client']);
          break;
          case 'cajero':
            this.router.navigate(['/bank_teller']);
          break;
          case 'administrador':
            this.router.navigate(['/admin']);
        }
        
        return false;    
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}