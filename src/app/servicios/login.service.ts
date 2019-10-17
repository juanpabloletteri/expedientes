import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private miHttp: MiHttpService) { }

  verificarusuario(data): Promise<any> {
    return this.miHttp.httpPostP('login', data)
      .then(data => {
        return data;
      })
  }
}
