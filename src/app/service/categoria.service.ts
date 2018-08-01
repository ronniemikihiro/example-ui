import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { AbstractService } from '../service/abstract.service';

@Injectable()
export class CategoriaService extends AbstractService {

  constructor(private authHttp: AuthHttp) {
    super("/categorias");
  }

  listarTodas(): Promise<any> {
    return this.authHttp.get(this.getUrl()).toPromise().then(this.responseJsonData);
  }

}
