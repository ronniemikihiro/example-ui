import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { Pessoa } from './../core/model';
import { AbstractService } from './abstract.service';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService extends AbstractService {

  /**
   * Construtor da classe.
   *  
   * @param http 
   */
  constructor(private authHttp: AuthHttp) {
    super(`/pessoas`);
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

    return this.authHttp.get(this.getUrl(`/filtro/paginacao`), { search: params }).toPromise().then(this.responseJsonDataTablePage);
  }

  /**
   * Lista todas as pessoas.
   */
  listarTodas(): Promise<any> {
    return this.authHttp.get(this.getUrl(`/listar`)).toPromise().then(this.responseJsonData);
  }

  /**
   * Exclui uma pessoa de acordo com seu código.
   * 
   * @param codigo 
   */
  excluir(codigo: number): Promise<void> {
    return this.authHttp.delete(this.getUrl(`/${codigo}`)).toPromise().then(() => null);
  }

  /**
   * Muda o status da pessoa para ativo/inativo.
   * 
   * @param codigo 
   * @param ativo 
   */
  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.authHttp.put(this.getUrl(`/mudarStatus/${codigo}/ativo`), ativo).toPromise().then(() => null);
  }

  /**
   * Adiciona uma nova pessoa.
   * 
   * @param pessoa 
   */
  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.authHttp.post(this.getUrl(), JSON.stringify(pessoa)).toPromise().then(this.responseJsonData);
  }

  /**
   * Atualiza os dados de uma pessoa.
   * 
   * @param pessoa 
   */
  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.authHttp.put(this.getUrl(`/${pessoa.codigo}`), JSON.stringify(pessoa)).toPromise().then(response => response.json() as Pessoa);
  }

  /**
   * Busca uma pessoa por seu código.
   * 
   * @param codigo 
   */
  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.authHttp.get(this.getUrl(`/${codigo}`)).toPromise().then(response => response.json() as Pessoa);
  }

}
