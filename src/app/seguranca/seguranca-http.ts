import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';

import { AuthConfig, AuthHttp, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

export class NotAuthenticatedError {}

@Injectable()
export class SegurancaHttp extends AuthHttp {

  /**
   * Construtor.
   * 
   * @param auth
   * @param options 
   * @param http 
   * @param defOpts 
   */
  constructor(
    private auth: AuthService,
    options: AuthConfig,
    http: Http, defOpts?: RequestOptions
  ) {
    super(options, http, defOpts);
  }

  /**
   * Realiza a verificação de token válido ou expirado para requisições "DELETE". 
   * @param url 
   * @param options 
   */
  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.delete(url, options));
  }

  /**
   * Realiza a verificação de token válido ou expirado para requisições "PATCH". 
   * 
   * @param url 
   * @param body 
   * @param options 
   */
  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.patch(url, options));
  }

  /**
   * Realiza a verificação de token válido ou expirado para requisições "HEAD". 
   * 
   * @param url 
   * @param body 
   * @param options 
   */
  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.head(url, options));
  }

  /**
   * Realiza a verificação de token válido ou expirado para requisições "OPTIONS".
   * 
   * @param url 
   * @param options 
   */
  public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.options(url, options));
  }

  /**
   * Realiza a verificação de token válido ou expirado para requisições "GET".
   * 
   * @param url 
   * @param options 
   */
  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.get(url, options));
  }

  /**
   * Realiza a verificação de token válido ou expirado para requisições "POST".
   * 
   * @param url 
   * @param body 
   * @param options 
   */
  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.post(url, body, options));
  }

  /**
   * Realiza a verificação de token válido ou expirado para requisições "PUT".
   * 
   * @param url 
   * @param body 
   * @param options 
   */
  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.put(url, body, options));
  }

  /**
   * Realiza a requisição verificando se o token é válido, se não tenta obter um novo token,
   * se for inválido retorna um erro de autenticação.
   * 
   * @param fn
   */
  private fazerRequisicao(fn: Function): Observable<Response> {
    if (this.auth.isAccessTokenInvalido()) {
      console.log('Requisição HTTP com access token inválido. Obtendo novo token...');

      const chamadaNovoAccessToken = this.auth.obterNovoAccessToken()
        .then(() => {
          if (this.auth.isAccessTokenInvalido()) {
            throw new NotAuthenticatedError();
          }

          return fn().toPromise();
        });

      return Observable.fromPromise(chamadaNovoAccessToken);
    } else {
      return fn();
    }
  }

}
