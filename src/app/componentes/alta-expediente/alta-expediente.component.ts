import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
//sacar
import { Mascota } from '../../clases/mascota';
import { MascotaService } from '../../servicios/mascota.service';
//nuevos
import { Expediente } from '../../clases/expediente';
import { ExpedienteService } from '../../servicios/expediente.service';
//
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../clases/usuario';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ExecOptions } from 'child_process';

@Component({
  selector: 'app-alta-expediente',
  templateUrl: './alta-expediente.component.html',
  styleUrls: ['./alta-expediente.component.css']
})
export class AltaExpedienteComponent implements OnInit {

  userform: FormGroup;
  types: SelectItem[];
  cols: any[];
  datosTabla: any = null;
  titulo: string;
  usuarioSeleccionado: Usuario = null;
  tipo: number;

  constructor(private fb: FormBuilder, private miExpediente: Expediente, private miServicioExpediente: ExpedienteService, private miMascota: Mascota, private miServicioMascota: MascotaService, public rute: Router, private miServiciousuario: UsuarioService) {

    this.miServiciousuario.traerTodosLosUsuarios()
      .then(data => {
        this.datosTabla = data;
      })

    this.tipo = this.miServiciousuario.getTipo();

    if (this.miServiciousuario.getIdUsuario() == 2) {
      this.miMascota.id_duenio = this.miServiciousuario.getIdUsuario();
    }


    this.types = [
      { label: 'Publico', value: 1, icon: 'fa fa-fw fa-cc-paypal' },
      { label: 'Infraccion', value: 0, icon: 'fa fa-fw fa-cc-visa' }
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
      'numero': new FormControl('', Validators.required),
      'anio': new FormControl('', Validators.required),
      'iniciador': new FormControl('', Validators.required),
      'caratula': new FormControl('', Validators.required),
      'tipo': new FormControl('', Validators.required)
    });
  }

  onSubmit(value: string) {
    this.miExpediente.numero = this.userform.value.numero;
    this.miExpediente.anio = this.userform.value.anio;
    this.miExpediente.iniciador = this.userform.value.iniciador;
    this.miExpediente.caratula = this.userform.value.caratula;
    this.miExpediente.tipo = this.userform.value.tipo;

    if (this.tipo == 1 && this.usuarioSeleccionado == null) {
      swal('seleccione un usuario por favor');
      return 1;
    }
    this.miServicioExpediente.agregarExpediente(this.miExpediente)
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
