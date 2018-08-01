import 'rxjs/add/observable/throw';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

/**
 * Classe abstract Service.
 *
 * @author Ronnie Mikihiro
 */
export abstract class AbstractService {

  private baseUrl: string;

  /**
   * Consturtor da classe.
   *
   * @param baseUrl
   */
  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Retorna a url absoluta considerando o 'contexto'  e a 'url relativa'.
   *
   * @param relativeUrl
   * @returns string
   */
  protected getUrl(relativeUrl?: string): string {
    let absoluteUrl = environment.apiUrl + this.baseUrl;

    if (relativeUrl !== null && relativeUrl !== undefined) {
      absoluteUrl += relativeUrl;
    }
    return absoluteUrl;
  }

  /**
   * Recupera o objeto 'Json' disponível no 'body' da 'Response'.
   *
   * @param response
   */
  protected resolveJsonData(response: Response) {
    return response.json();
  }

  /**
   * Recupera o objeto 'Json' disponível no 'body' da 'Response' de um Page Datatable.
   * 
   * @param response
   */
  protected resolveJsonDataTablePage(response: Response) {
    const responseJson = response.json();
    return {
      dados: responseJson.content,
      total: responseJson.totalElements
    };
  }

  /**
   * Recupera a 'mensagem de erro' disponível no 'body' da 'Response'.
   *
   * @param response
   */
  protected resolveError(response: any): Observable<any> {
    let value = undefined;

    if (response instanceof Response) {

      // Solução para evitar a apresentação das descrições de erro de Autenticação/Permissão: "Unauthorized" ou "Forbidden".
      if (response.status === 403 || response.status === 401) {
        value = undefined;
      } else {
        value = response.status === 0 ? 'MSG_FALHA_CONEXAO_API' : response.json();
      }
    } else {
      value = response.toString();
    }
    return Observable.throw(value);
  }
}