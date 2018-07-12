import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../../core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  /**
   * Construtor.
   * 
   * @param pessoaService 
   * @param toasty 
   * @param errorHandler 
   * @param route 
   * @param router 
   * @param title 
   */
  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  /**
   * Construtor de início.
   */
  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova pessoa');

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  /**
   * Retorna se está editando uma pessoa, verificando se o id da pessoa encontra-se null.
   */
  get editando() {
    return Boolean(this.pessoa.codigo)
  }
  
  /**
   * Carrega uma pessoa de acordo com seu id.
   * 
   * @param codigo 
   */
  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  /**
   * Salva uma pessoa, incluindo ou editando.
   * 
   * @param form 
   */
  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  /**
   * Adiciona uma nova pessoa.
   * 
   * @param form 
   */
  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionada => {
        this.toasty.success('Pessoa adicionada com sucesso!');
        this.novo(form);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  /**
   * Atualiza os dados de uma pessoa.
   * 
   * @param form 
   */
  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.toasty.success('Pessoa alterada com sucesso!');
        this.novo(form);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  /**
   * Cria uma nova instância de pessoa.
   * 
   * @param form 
   */
  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  /**
   * Atualiza o título da Edição com o nome da pessoa.
   */
  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

}
