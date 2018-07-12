import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { NotAuthenticatedError } from './../seguranca/seguranca-http';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private toasty: ToastyService,
    private router: Router
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    const status = errorResponse.status;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou! Favor, logar novamente!';
      this.router.navigate(['/login']);

    } else {
      try {
        let errors = errorResponse.json();
        msg = errors.mensagem;
      } catch (e) {}

      if (status === 403) {
        msg = 'Você não tem permissão para executar esta ação';
      }
    }
    
    if(status >= 400 && status <= 499) {
      this.toasty.warning(msg == null ? 'Ocorreu um erro ao processar a sua solicitação' : msg);
    } else {
      console.log('Ocorreu um erro:', errorResponse);
      this.toasty.error(msg == null ? 'Erro ao processar serviço remoto. Tente novamente.' : msg);
    }
  }
}
