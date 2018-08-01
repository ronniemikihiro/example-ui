import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from '../../service/categoria.service';
import { PessoaService } from '../../service/pessoa.service';
import { Lancamento } from './../../core/model';
import { LancamentoService } from '../../service/lancamento.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  /**
   * Construtor.
   * 
   * @param categoriaService 
   * @param pessoaService 
   * @param lancamentoService 
   * @param toasty 
   * @param errorHandler 
   * @param route 
   * @param router 
   * @param title 
   */
  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
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
    const codigoLancamento = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo lançamento');

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  /**
   * Retorna se está editando uma pessoa, verificando se o id da pessoa encontra-se null.
   */
  get editando() {
    return Boolean(this.lancamento.codigo)
  }

  /**
   * Carrega um lancamento de acordo com seu código passado.
   * 
   * @param codigo 
   */
  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo).then(lancamento => {
      this.lancamento = lancamento;
      this.atualizarTituloEdicao();
    }).catch(erro => {
      this.errorHandler.handle(erro)
    });
  }

 /**
   * Salva um lancamento, incluindo ou editando.
   * 
   * @param form 
   */
  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  /**
   * Adiciona um novo lancamento.
   * 
   * @param form 
   */
  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento).then(lancamentoAdicionado => {
      this.toasty.success('Lançamento adicionado com sucesso!');
      this.novo(form);
    }).catch(erro => {
      this.errorHandler.handle(erro)
    });
  }

  /**
   * Atualiza os dados de um lancamento.
   * 
   * @param form 
   */
  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento).then(lancamento => {
      this.lancamento = lancamento;
      this.toasty.success('Lançamento alterado com sucesso!');
      this.novo(form);
    }).catch(erro => {
      this.errorHandler.handle(erro)
    });
  }

  /**
   * Carrega as categorias para a combo select.
   */
  carregarCategorias() {
    this.categoriaService.listarTodas().then(categorias => {
      this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
    }).catch(erro => {
      this.errorHandler.handle(erro)
    });
  }

  /**
   * Carrega as pessoas para a combo select.
   */
  carregarPessoas() {
    this.pessoaService.listarTodas().then(pessoas => {
      this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo }));
    }).catch(erro => {
      this.errorHandler.handle(erro)
    });
  }

  /**
   * Limpa o formulário e cria um novo lancamento.
   * 
   * @param form 
   */
  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  /**
   * Atualiza o título com o o lancamento a ser editado.
   */
  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}
