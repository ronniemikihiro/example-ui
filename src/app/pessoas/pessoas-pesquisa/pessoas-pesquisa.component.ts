import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaFiltro, PessoaService } from '../../service/pessoa.service';
import { MessageService } from '../../message/message.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') grid;

  /**
   * Construtor.
   * 
   * @param pessoaService
   * @param errorHandler 
   * @param confirmation 
   * @param toasty 
   * @param title 
   */
  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  /**
   * Construtor init.
   */
  ngOnInit() {
    this.title.setTitle('Pesquisa de pessoas');
  }

  /**
   * Realiza a pesquisa das pessoas de acordo com o filtro de pesquisa.
   * 
   * @param pagina
   */
  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro).then(resultado => {
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.dados;
    }).catch(erro => {
      this.errorHandler.handle(erro)
    });
  }

  /**
   * Realiza os eventos de pesquisa ao mudar página.
   * 
   * @param event 
   */
  mudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  /**
   * Abre o popup de confirmar exclusão.
   * 
   * @param pessoa
   */
  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({message: this.messageService.getDescription('MSG_CONFIRM_EXCLUSAO'),
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  /**
   * Realiza a exclusão da pessoa.
   * 
   * @param pessoa 
   */
  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo).then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }

      this.toasty.success('Pesssoa excluída com sucesso!');
    }).catch(erro => { 
      this.errorHandler.handle(erro)
    });
  }

  /**
   * Realiza a alteração do status da pessoa.
   * 
   * @param pessoa 
   */
  alterarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus).then(() => {
      const acao = novoStatus ? 'ativada' : 'desativada';
      pessoa.ativo = novoStatus;
      this.toasty.success(`Pessoa ${acao} com sucesso!`);
    }).catch(erro => {
      this.errorHandler.handle(erro)
    });
  }

}
