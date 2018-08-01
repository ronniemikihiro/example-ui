import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';

import { MessageService } from './message.service';
import { InternacionalizacaoPipe } from './internacionalizacao.pipe';

/**
 * Módulo responsável por prover recursos de 'mensagens' e 'i18n' para aplicação.
 *
 * @author Ronnie Mikihiro
 */
@NgModule({
  imports: [
  ],
  declarations: [
    InternacionalizacaoPipe
  ],
  exports: [
    InternacionalizacaoPipe
  ]
})
export class MessageModule {

  /**
   * Convenção usada para que o módulo 'app' disponibilize as instâncias 'providers' como singleton para todos os modulos da aplicação.
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MessageModule,
      providers: [
        MessageService,
        InternacionalizacaoPipe
      ]
    }
  }
}
