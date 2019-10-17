import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Mascota } from '../../clases/mascota';
import { MascotaService } from '../../servicios/mascota.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../clases/usuario';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-alta-mascota',
  templateUrl: './alta-mascota.component.html',
  styleUrls: ['./alta-mascota.component.css']
})
export class AltaMascotaComponent implements OnInit {

  userform: FormGroup;
  types: SelectItem[];
  cols: any[];
  datosTabla: any = null;
  titulo: string;
  usuarioSeleccionado: Usuario = null;
  tipo: number;

  constructor(private fb: FormBuilder, private miMascota: Mascota, private miServicioMascota: MascotaService, public rute: Router, private miServiciousuario: UsuarioService) {

    this.miServiciousuario.traerTodosLosUsuarios()
      .then(data => {
        this.datosTabla = data;
      })

    this.tipo = this.miServiciousuario.getTipo();

    if (this.miServiciousuario.getIdUsuario() == 2) {
      this.miMascota.id_duenio = this.miServiciousuario.getIdUsuario();
    }


    this.types = [
      { label: 'Gato', value: 100, icon: 'fa fa-fw fa-cc-paypal' },
      { label: 'Perro', value: 200, icon: 'fa fa-fw fa-cc-visa' }
    ];

    /////////
    this.titulo = 'MASCOTAS';
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'mail', header: 'Mail' }
    ];
  }

  ngOnInit() {
    this.userform = this.fb.group({
      'nombre': new FormControl('', Validators.required),
      'raza': new FormControl('', Validators.required),
      'color': new FormControl('', Validators.required),
      'edad': new FormControl('', Validators.required),
      'tipo': new FormControl('', Validators.required)
    });
  }

  onSubmit(value: string) {
    this.miMascota.nombre = this.userform.value.nombre;
    this.miMascota.raza = this.userform.value.raza;
    this.miMascota.color = this.userform.value.color;
    this.miMascota.edad = this.userform.value.edad;
    this.miMascota.tipo = this.userform.value.tipo;

    if (this.tipo==1 && this.usuarioSeleccionado == null) {
      swal('seleccione un usuario por favor');
      return 1;
    }
    this.miServicioMascota.agregarMascota(this.miMascota)
      .then(data => {
        swal(
          'Felicidades!',
          'Mascota agregada correctamente!',
          'success'
        )
        this.userform.reset();
        //this.rute.navigate(['']); //aca llevar a componente cliente
      })
  }
  onRowSelect(event) {
    this.miMascota.id_duenio = this.usuarioSeleccionado.id_usuario;
  }
}