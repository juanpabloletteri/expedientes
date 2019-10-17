import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import swal from 'sweetalert2';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {

  userform: FormGroup;
  types: SelectItem[];

  constructor(private fb: FormBuilder, private miUsuario: Usuario, private miServicioUsuario: UsuarioService, public rute: Router) {

    this.types = [
      { label: 'Administrador', value: 1, icon: 'fa fa-fw fa-cc-paypal' },
      { label: 'Cliente', value: 2, icon: 'fa fa-fw fa-cc-visa' }
    ];
  }

  ngOnInit() {
    this.userform = this.fb.group({
      'mail': new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])), //o se puede usar Validators.email
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'password2': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'tipo': new FormControl('', Validators.required)
    });
  }

  onSubmit(value: string) {
    if (this.userform.value.password == this.userform.value.password2) {
      this.miUsuario.mail = this.userform.value.mail;
      this.miUsuario.password = this.userform.value.password;
      this.miUsuario.nombre = this.userform.value.nombre;
      this.miUsuario.apellido = this.userform.value.apellido;
      this.miUsuario.tipo = this.userform.value.tipo;

      this.miServicioUsuario.agregarUsuario(this.miUsuario)
        .then(data => {
          ////////MAIL DUPLICADO///////
          if (data == "Mail en uso") {
            swal({
              type: 'error',
              title: 'Oops...',
              text: data,
            })
            return 1;
          }
          //////MAIL SIN USAR - CREA LA CUENTA////////
          else {
            swal(
              'Felicidades!',
              'Usuario creado correctamente!',
              'success'
            )
            this.userform.reset();
          }
        })
      /////////
    }
    else {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Contraseñas no identicas!',
      })
    }
  }

  ingresar() {
    this.rute.navigate(['']);
  }

}