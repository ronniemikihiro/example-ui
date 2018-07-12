import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { Pessoa } from './../core/model';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl: string;

  /**
   * Construtor da classe.
   *  
   * @param http 
   */
  constructor(private http: AuthHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  /**
   * Realiza a pesquisa das pessoas paginado de acordo com seu filtro de pesquisa.
   * 
   * @param filtro 
   */
  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}/filtro/paginacao`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const pessoas = responseJson.content;

        const resultado = {
          pessoas,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  /**
   * Lista todas as pessoas.
   */
  listarTodas(): Promise<any> {
    return this.http.get(`${this.pessoasUrl}/listar`)
      .toPromise()
      .then(response => response.json());
  }

  /**
   * Exclui uma pessoa de acordo com seu código.
   * 
   * @param codigo 
   */
  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  /**
   * Muda o status da pessoa para ativo/inativo.
   * 
   * @param codigo 
   * @param ativo 
   */
  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.pessoasUrl}/mudarStatus/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  /**
   * Adiciona uma nova pessoa.
   * 
   * @param pessoa 
   */
  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(`${this.pessoasUrl}/`, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());
  }

  /**
   * Atualiza os dados de uma pessoa.
   * 
   * @param pessoa 
   */
  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json() as Pessoa);
  }

  /**
   * Busca uma pessoa por seu código.
   * 
   * @param codigo 
   */
  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => response.json() as Pessoa);
  }

}
