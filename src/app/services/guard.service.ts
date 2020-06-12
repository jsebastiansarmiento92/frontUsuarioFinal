import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TokenService } from '../services/auth/token.service';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  realRol: string;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data.expectedRol;
    const roles = this.tokenService.getAuthorities();

    this.realRol = 'user';
    roles.forEach(rol => {
      if (rol === 'ADMINISTRADOR') {
        this.realRol = 'admin';
      }
    });
    //|| expectedRol.indexOf(this.realRol) === -1 pendiente por implementar en el if cuando se tenga que restringir acceso dependiendo los roles
  
    if (!this.tokenService.getToken() ) {
      console.log("error no se ha podido realizar login");
      this.router.navigate(['/login']);
      return false;

    }
    console.log("login completo");
    return true;
  }

  constructor(private tokenService: TokenService, private router: Router) { }
}