/**
 * Interface provider responsável por permitir a centralização de 'descrições/mensagens' utilizadas na aplicação em um unico local.
 *
 * @author Ronnie Mikihiro
 */
export interface MessageResource {

  /**
   * Retorna a 'descrição' conforme a 'chave' informada.
   *
   * @param key
   * @returns
   */
  getDescription(key: string): string;
}

/**
 * Interface 'Provider' responsável por prover instâncias de 'MessageResource'.
 *
 * @author Ronnie Mikihiro
 */
export interface MessageResourceProvider {

  /**
   * Fabrica de instância de MessageResource.
   */
  new (): MessageResource;
}

/**
 * Classe 'Provider' responsável por prover instâncias de 'MessageResource'.
 *
 * @author Ronnie Mikihiro
 */
export class MessageResourceProvider implements MessageResourceProvider { }