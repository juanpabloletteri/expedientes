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
//import { ExecOptions } from 'child_process';

@Component({
  selector: 'app-alta-expediente',
  templateUrl: './alta-expediente.component.html',
  styleUrls: ['./alta-expediente.component.css']
})
export class AltaExpedienteComponent implements OnInit {

  userform: FormGroup;
  types: SelectItem[];
  cols: any[];
  tipo: number;
  id_usuario: number;
  id_oficina: number;

  constructor(private fb: FormBuilder, private miExpediente: Expediente, private miServicioExpediente: ExpedienteService, private miMascota: Mascota, private miServicioMascota: MascotaService, public rute: Router, private miServiciousuario: UsuarioService) {
    //tomo el tipo de usuario
    this.tipo = this.miServiciousuario.getTipo();
    //tomo el id del usuario
    this.id_usuario = this.miServiciousuario.getIdUsuario();
    //tomo la id_oficina del usuario
    this.id_oficina = this.miServiciousuario.getIdOficina();

    this.types = [
      { label: 'Publico', value: 0, icon: 'fa fa-fw fa-cc-paypal' },
      { label: 'Infraccion', value: 1, icon: 'fa fa-fw fa-cc-visa' },
      { label: 'Vecino', value: 2, icon: 'fa fa-fw fa-cc-visa' }
    ];

  }

  ngOnInit() {
    this.userform = this.fb.group({
      'numero': new FormControl('', Validators.required),
      'anio': new FormControl('', Validators.required),
      'fecha': new FormControl('', Validators.required),
      'tema': new FormControl('', Validators.required),
      'fojas': new FormControl('', Validators.required),
      'iniciador': new FormControl('', Validators.required),
      'direccion': new FormControl('', Validators.required),
      'caratula': new FormControl('', Validators.required),
      'tipo': new FormControl('', Validators.required)
    });
  }

  onSubmit(value: string) {
    this.miExpediente.numero = this.userform.value.numero;
    this.miExpediente.anio = this.userform.value.anio;
    this.miExpediente.fecha = this.userform.value.fecha;
    this.miExpediente.tema = this.userform.value.tema;
    this.miExpediente.fojas = this.userform.value.fojas;
    this.miExpediente.iniciador = this.userform.value.iniciador;
    this.miExpediente.direccion = this.userform.value.direccion;
    this.miExpediente.caratula = this.userform.value.caratula;
    this.miExpediente.tipo = this.userform.value.tipo;
    //datos que no tomo del formulario
    this.miExpediente.id_usuario = this.id_usuario;
    this.miExpediente.id_oficina = this.id_oficina;

    this.miServicioExpediente.agregarExpediente(this.miExpediente)
      .then(data => {
        swal(
          'Felicidades!',
          'Expediente agregado correctamente!',
          'success'
        )
        this.userform.reset();
      })
  }
  onRowSelect(event) {

  }

}
