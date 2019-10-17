import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  algo: any;
  userform: FormGroup;
  tablaUsuarios: any;
  titulo: string;
  visible: boolean = false;
  tituloEspera: string;

  constructor(private fb: FormBuilder, private miUsuario: Usuario, private miServicioUsuario: UsuarioService, public rute: Router, private miServicioLogin: LoginService) { }

  ngOnInit() {
    this.userform = this.fb.group({
      'mail': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  onSubmit(value: string) {
    this.miUsuario.mail = this.userform.value.mail;
    this.miUsuario.password = this.userform.value.password;
    //alert("hacer logica de login");
    this.miServicioLogin.verificarusuario(this.miUsuario)
      .then(data => {
        if (data == "error") {
          swal("Usuario o contraseña no validas");
        }
        else {
          //guardo token en local storage
          localStorage.setItem('token', data);
          //decodifico token
          let payload = data.split('.')[1];
          let pay2 = payload.replace('-', '+').replace('_', '/');
          let datos = JSON.parse(atob(pay2));
          //cargo datos en servicio usuario
          this.miServicioUsuario.setIdUsuario(datos['data']['id_usuario']);
          this.miServicioUsuario.setTipo(datos['data']['tipo']);
          //verifico donde redirijo
          if (datos['data']['tipo'] == 1) {
            this.rute.navigate(['admin']);
          }
          else if (datos['data']['tipo'] == 2) {
            this.rute.navigate(['cliente']);
          }
        }
      })
  }

  registrar() {
    this.rute.navigate(['registro']);
  }

  admin() {
    this.tituloEspera="Cargando lista de administradores";
    this.tablaUsuarios = null;
    this.visible = true;
    this.miServicioUsuario.traerUsuarioPorTipo(1)
      .then(data => {
        this.titulo = 'Administradores';
        this.tablaUsuarios = data;
      })
  }

  cliente() {
    this.tituloEspera="Cargando lista de Clientes";
    this.tablaUsuarios = null;
    this.visible = true;
    this.miServicioUsuario.traerUsuarioPorTipo(2)
      .then(data => {
        this.titulo = 'Clientes';
        this.tablaUsuarios = data;
      })
  }

}
