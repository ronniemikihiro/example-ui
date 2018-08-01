import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { Lancamento } from './../core/model';
import { AbstractService } from '../service/abstract.service';
import { Util } from '../util/util';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService extends AbstractService {

  /**
   * Construtor da Classe.
   * @param authHttp 
   */
  constructor(private authHttp: AuthHttp) {
    super('/lancamentos');
  }

  /**
   * Realiza a pesquisa paginada dos lancamentos de acordo com o filtro de pesquisa informada.
   * @param filtro 
   */
  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      params.set('dataVencimentoDe', Util.dateToString(filtro.dataVencimentoInicio));
    }
    if (filtro.dataVencimentoFim) {
      params.set('dataVencimentoAte', Util.dateToString(filtro.dataVencimentoFim));
    }

    return this.authHttp.get(this.getUrl(`/filtro/paginacao`), { search: params }).toPromise().then(this.responseJsonDataTablePage);
  }

  /**
   * Exclui um lancamento de acordo com seu código passado.
   * @param codigo 
   */
  excluir(codigo: number): Promise<void> {
    return this.authHttp.delete(this.getUrl(`/${codigo}`)).toPromise().then(() => null);
  }

  /**
   * Adiciona um novo lancamento.
   * @param lancamento 
   */
  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return this.authHttp.post(this.getUrl(), JSON.stringify(lancamento)).toPromise().then(this.responseJsonData);
  }

  /**
   * Atualiza os dados de um lancamento.
   * @param lancamento 
   */
  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.authHttp.put(this.getUrl(`/${lancamento.codigo}`), JSON.stringify(lancamento)).toPromise().then(response => {
      const lancamentoAlterado = response.json() as Lancamento;
      this.converterStringsParaDatas([lancamentoAlterado]);
      return lancamentoAlterado;
    });
  }

  /**
   * Busca um lancamento pelo seu código.
   * @param codigo 
   */
  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.authHttp.get(this.getUrl(`/${codigo}`)).toPromise().then(response => {
      const lancamento = response.json() as Lancamento;
      this.converterStringsParaDatas([lancamento]);
      return lancamento;
    });
  }

  /**
   * Converte as datas em string para Data.
   * @param listLancamentos 
   */
  private converterStringsParaDatas(listLancamentos: Lancamento[]) {
    listLancamentos.forEach(l => {
      l.dataVencimento = Util.stringToDate(l.dataVencimento);
      if (l.dataPagamento) {
        l.dataPagamento = Util.stringToDate(l.dataPagamento);
      }
    });
  }

}
