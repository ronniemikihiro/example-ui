import { Injectable } from '@angular/core';
import { InternacionalizacaoPipe } from './internacionalizacao.pipe';

/**
 * Classe de representação de 'Item de Mensagem'.
 *
 * @author Ronnie Mikihiro
 */
export class MessageItem {

  private msg: string;

  /**
   * Construtor da classe.
   *
   * @param msg
   */
  constructor(msg: string) {
    this.msg = msg;
  }

  /**
   * @returns msg
   */
  public getMsg(): string {
    return this.msg;
  }

}


/**
 * Classe 'service' responsável por prover o recurso de mensagem da aplicação.
 *
 * @author Ronnie Mikihiro
 */
@Injectable()
export class MessageService {

  private i18nPipe: InternacionalizacaoPipe;

  /**
   * Construtor da classe.
   *
   * @param i18nPipe
   */
  constructor(i18nPipe: InternacionalizacaoPipe) {
    this.i18nPipe = i18nPipe;
  }

  /**
   * Retorna a descrição da mensagem conforme os parâmetros informados.
   *
   * @param msg
   */
  public getDescription(msg: string, params?: any): string {
    let description = undefined;

    if (msg !== null && msg !== undefined) {
      description = typeof msg === 'object' ? msg['mensagem'] : this.i18nPipe.transform(msg, params);
      description = description === undefined ? msg : description;
    }
    return description;
  }

}
