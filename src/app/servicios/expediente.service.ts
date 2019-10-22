import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';
import { Expediente } from '../clases/expediente';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {

  constructor(private miHttp: MiHttpService, private miExpediente: Expediente) { }

  traerTodosLosExpedientes(): Promise<any> {
    return this.miHttp.httpGetP('traerTodosLosExpedientes')
      .then(data => {

        return data;
      })
  }
  agregarExpediente(data): Promise<any> {
    return this.miHttp.httpPostP('agregarExpediente', data)
      .then(data => {

        return data;
      })
  }
  traerExpedientePorId(data): Promise<any> {
    return this.miHttp.httpPostP('traerExpedientePorId', { id: data })
      .then(data => {

        return data;
      })
  }

}
