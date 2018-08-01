import { MessageResource } from './message/message.resource';

/**
 * Implementação do Provider responsável por prover as 'descrições' e 'mensagens' utilizadas na aplicação em um único local.
 *
 * @author Ronnie Mikihiro
 */
export class AppMessage implements MessageResource {
  private resource: Object;

  /**
   * Construtor da classe.
   */
  constructor() {
    this.resource = {
      'required': 'Campo de preenchimento obrigatório.',
      
      'LABEL_LOGIN': 'Login',
      'LABEL_SENHA': 'Senha',
      'LABEL_ENTRAR': 'Entrar',
      'LABEL_NOME': 'Nome',
      'LABEL_ESTADO': 'Estado',
      'LABEL_CIDADE': 'Cidade',
      'LABEL_STATUS': 'Status',
      'LABEL_ACAO': 'Ação',
      'LABEL_SAIR': 'Sair',
      'LABEL_PESSOAS': 'Pessoas',
      'LABEL_ATIVO': 'Ativo',
      'LABEL_INATIVO': 'Inativo',
      'LABEL_INCLUIR': 'Incluir',
      'LABEL_VISUALIZAR': 'Visualizar',
      'LABEL_ALTERAR': 'Alterar',
      'LABEL_ATIVAR': 'Ativar',
      'LABEL_INATIVAR': 'Inativar',
      'LABEL_CONFIRM_OK': 'Ok',
      'LABEL_CONFIRM_YES': 'Sim',
      'LABEL_CONFIRM_NO': 'Não',
      'LABEL_LOGRADOURO': 'Logradouro',
      'LABEL_NUMERO': 'Número',
      'LABEL_COMPLEMENTO': 'Complemento',
      'LABEL_BAIRRO': 'Bairro',
      'LABEL_CEP': 'CEP',
      'LABEL_CANCELAR': 'Cancelar',
      'LABEL_SALVAR': 'Salvar',
      'LABEL_VOLTAR': 'Voltar',
      'LABEL_DESCRICAO': 'Descrição',
      'LABEL_TIPO': 'Tipo',
      'LABEL_VENCIMENTO': 'Vencimento',
      'LABEL_PAGAMENTO': 'Pagamento',
      'LABEL_VALOR': 'Valor',
      
      'TITLE_LANCAMENTOS' : 'Lançamentos',
      'TITLE_CONTROLE_ACESSO': 'Controle de Acesso',
      'TITLE_PESSOA_LISTAR': 'LISTAR PESSOA',
      'TITLE_PESSOA_INCLUIR': 'INCLUIR PESSOA',
      'TITLE_PESSOA_ALTERAR': 'ALTERAR PESSOA',
      'TITLE_PESSOA_VISUALIZAR': 'VISUALIZAR PESSOA',
      'TITLE_CONFIRMACAO' : 'Confirmação',

      'MSG_FALHA_CONEXAO_API': 'Verifique sua conexão com a internet ou tente mais tarde.',
      'MSG_CAMPO_OBRIGATORIO': '* Campo Obrigatório',
      'MSG_NENHUM_REGISTRO_ENCONTRADO': 'Nenhum registro encontrado',
      'MSG_DESEJA_SAIR_SISTEMA': 'Deseja realmente sair do sistema?',

      'MSG_PESSOA_INCLUSAO': 'Pessoa incluído com sucesso!',
      'MSG_PESSOA_ALTERACAO': 'Pessoa alterado com sucesso!',
      'MSG_PESSOA_ATIVADA': 'Pessoa ativada com sucesso!',
      'MSG_PESSOA_INATIVADA': 'Pessoa inativada com sucesso!',
      'MSG_PESSOA_EXCLUIR': 'Pessoa excluído com sucesso!',
      'MSG_PESSOA_CONFIRM_ATIVACAO': 'Deseja realmente ativar a pessoa selecionada?',
      'MSG_PESSOA_CONFIRM_INATIVACAO': 'Deseja realmente inativar a pessoa selecionada?',
      'MSG_PESSOA_CONFIRM_EXCLUSAO': 'Deseja realmente excluir a pessoa?',
      'MSG_CONFIRM_EXCLUSAO' : 'Tem certeza que deseja excluir?'
    };
  }

  /**
   * Retorna a 'descrição' conforme a 'chave' informada.
   *
   * @param key
   * @returns
   */
  getDescription(key: string): string {
    return this.resource[key];
  }

  /**
   * Retorna a 'mensagem' conforme a 'chave' informada.
   *
   * @param key
   * @returns
   */
  getMessage(key: string): string {
    return this.getDescription(key);
  }
}