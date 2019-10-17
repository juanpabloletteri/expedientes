import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private miHttp: MiHttpService, private miUsuario: Usuario) { }

  /////////////////////////
  setIdUsuario(data) {
    this.miUsuario.id_usuario = data;
  }
  setMail(data) {
    this.miUsuario.mail = data;
  }
  setPassword(data) {
    this.miUsuario.password = data;
  }
  setNombre(data) {
    this.miUsuario.nombre = data;
  }
  setApellido(data) {
    this.miUsuario.apellido = data;
  }
  setTipo(data) {
    this.miUsuario.tipo = data;
  }
  /////////////////////////
  getIdUsuario() {
    return this.miUsuario.id_usuario;
  }
  getMail() {
    return this.miUsuario.mail;
  }
  getPassword() {
    return this.miUsuario.password;
  }
  getNombre() {
    return this.miUsuario.nombre;
  }
  getApellido() {
    return this.miUsuario.apellido;
  }
  getTipo() {
    return this.miUsuario.tipo;
  }
  ///////////////////////////////
  traerTodosLosUsuarios(): Promise<any> {
    return this.miHttp.httpGetP('traerTodosLosUsuarios')
      .then(data => {
       
        return data;
      })
  }
  agregarUsuario(data): Promise<any> {
    return this.miHttp.httpPostP('agregarUsuario', data)
      .then(data => {
       
        return data;
      })
  }
  traerUsuarioPorId(data): Promise<any> {
    return this.miHttp.httpPostP('traerUsuarioPorId', { id: data })
      .then(data => {
       
        return data;
      })
  }
  traerUsuarioPorTipo(data): Promise<any> {
    return this.miHttp.httpPostP('traerUsuarioPorTipo', { tipo: data })
      .then(data => {
       
        return data;
      })
  }
  modificarUsuario(data): Promise<any> {
    return this.miHttp.httpPostP('modificarUsuario', data)
      .then(data => {
       
        return data;
      })
  }
  borrarUsuario(data): Promise<any> {
    return this.miHttp.httpPostP('borrarUsuario', data)
      .then(data => {
       
        return data;
      })
  }

}
