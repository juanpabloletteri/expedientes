import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionAdminService {

  constructor() { }

  canActivate(route, state): boolean {
    var aprobacion = false;
    //capturo token del local storage
    let data = localStorage.getItem('token');
    //decodifico token
    let payload = data.split('.')[1];
    let pay2 = payload.replace('-', '+').replace('_', '/');
    let datos = JSON.parse(atob(pay2));
    //comparo y si el tipo coincide acepto
    if (datos['data']['tipo'] == 1) {
      aprobacion = true;
    }
    return aprobacion;
  }

}
