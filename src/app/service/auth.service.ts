import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { AbstractService } from '../service/abstract.service';

@Injectable()
export class AuthService extends AbstractService {

  jwtPayload: any;

  /**
   * Construtor.
   * 
   * @param http 
   * @param jwtHelper 
   */
  constructor(private http: Http, private jwtHelper: JwtHelper) {
    super('/oauth/token');
    this.loadToken();
  }

  /**
   * Realiza o login do usuário com seu login, obtendo o token e armazenando-o.
   * 
   * @param usuario 
   * @param senha 
   */
  login(usuario: string, senha: string): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.getUrl(), body, { headers, withCredentials: true }).toPromise().then(response => {
      this.saveToken(response.json().access_token);
    }).catch(response => {
      if (response.status === 400) {
        const responseJson = response.json();

        if (responseJson.error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválida!');
        }
      }

      return Promise.reject(response);
    });
  }

  /**
   * Obtém novo token, fazendo o seu refresh quando expirar o antigo.
   */
  getNewAccessToken(): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.getUrl(), body, { headers, withCredentials: true }).toPromise().then(response => {
      this.saveToken(response.json().access_token);
      console.log('Novo access token criado!');
      return Promise.resolve(null);
    }).catch(response => {
      console.error('Erro ao renovar token.', response);
      return Promise.resolve(null);
    });
  }

  /**
   * Limpa o token do jwt.
   */
  clearAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  /**
   * Retorna se o token é inválido ou está expirado.
   */
  isInvalidAccessToken() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  /**
   * Retorna as permissões(authorities) do usuário.
   * 
   * @param permissao
   */
  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  /**
   * Retorna true se o usuário tem a role de permissão.
   * 
   * @param roles 
   */
  temQualquerPermissao(roles: Array<string>) {
    return roles.findIndex(role => this.temPermissao(role)) > -1 ? true : false;
  }

  /**
   * Armazena o token jwt.
   * 
   * @param token
   */
  private saveToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  /**
   * Carrega o token e armazena-o.
   */
  private loadToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.saveToken(token);
    }
  }

}
