import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';
import { Mascota } from '../clases/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(private miHttp: MiHttpService, private miMascota: Mascota) { }

  /////////////////////////
  setIdMascota(data) {
    this.miMascota.id_mascota = data;
  }
  setIdDuenio(data) {
    this.miMascota.id_duenio = data;
  }
  setNombre(data) {
    this.miMascota.nombre = data;
  }
  setRaza(data) {
    this.miMascota.raza = data;
  }
  setColor(data) {
    this.miMascota.color = data;
  }
  setEdad(data) {
    this.miMascota.edad = data;
  }
  setTipo(data) {
    this.miMascota.tipo = data;
  }
  /////////////////////////
  getIdMascota() {
    return this.miMascota.id_mascota;
  }
  getIdDuenio() {
    return this.miMascota.id_duenio;
  }
  getNombre() {
    return this.miMascota.nombre;
  }
  getRaza() {
    return this.miMascota.raza;
  }
  getColor() {
    return this.miMascota.color;
  }
  getEdad() {
    return this.miMascota.edad;
  }
  getTipo() {
    return this.miMascota.tipo;
  }
  ///////////////////////////////
  traerTodasLasMascotas(): Promise<any> {
    return this.miHttp.httpGetP('traerTodasLasMascotas')
      .then(data => {
       
        return data;
      })
  }
  agregarMascota(data): Promise<any> {
    return this.miHttp.httpPostP('agregarMascota', data)
      .then(data => {
       
        return data;
      })
  }
  traerMascotaPorId(data): Promise<any> {
    return this.miHttp.httpPostP('traerMascotaPorId', { id: data })
      .then(data => {
       
        return data;
      })
  }
  traerMascotasPorDuenio(data): Promise<any> {
    return this.miHttp.httpPostP('traerMascotasPorDuenio', { id: data })
      .then(data => {
       
        return data;
      })
  }
  modificarMascota(data): Promise<any> {
    return this.miHttp.httpPostP('modificarMascota', data)
      .then(data => {
       
        return data;
      })
  }
  borrarMascota(data): Promise<any> {
    return this.miHttp.httpPostP('borrarMascota', data)
      .then(data => {
       
        return data;
      })
  }

}
