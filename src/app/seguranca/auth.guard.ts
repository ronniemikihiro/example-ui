import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Realiza a validação do token válido ou expierado, tentando obter um novo, se mesmo assim
   * vier inválido, retorna para a tela de login.
   * 
   * @param next 
   * @param state 
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isInvalidAccessToken()) {
      console.log('Navegação com access token inválido. Obtendo novo token...');

      return this.authService.getNewAccessToken().then(() => {
        if (this.authService.isInvalidAccessToken()) {
          this.router.navigate(['/login']);
          return false;
        }

        return true;
      });
    } else if (next.data.roles && !this.authService.hasAnyRole(next.data.roles)) {
      this.router.navigate(['/nao-autorizado']);
      return false;
    }

    return true;
  }

}
