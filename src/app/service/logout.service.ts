import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

import { AbstractService } from '../service/abstract.service';
import { AuthService } from '../service/auth.service';

@Injectable()
export class LogoutService extends AbstractService {

  constructor(private authHttp: AuthHttp, private authService: AuthService) {
    super("/tokens/revoke");
  }

  /**
   * Realiza o logout do sistema, limpando o token.
   */
  logout() {
    return this.authHttp.delete(this.getUrl(), { withCredentials: true }).toPromise().then(() => {
      this.authService.clearAccessToken();
    });
  }

}
