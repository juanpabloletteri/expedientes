import { Component, OnInit } from '@angular/core';
//sacar
import { Mascota } from '../../clases/mascota';
import { MascotaService } from '../../servicios/mascota.service';
//nuevos
import { Expediente } from '../../clases/expediente';
import { ExpedienteService } from '../../servicios/expediente.service';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-lista-expedientes',
  templateUrl: './lista-expedientes.component.html',
  styleUrls: ['./lista-expedientes.component.css']
})
export class ListaExpedientesComponent implements OnInit {

  cols: any[];
  datosTabla: any = null;
  titulo: string;
  //mascotaSeleccionada: Mascota = null;
  expedienteSeleccionado: Expediente = null;

  tipo: number;
  id_cliente: number;
  //tipoMascota: any;
  tipoExpediente: any;

  visible: boolean = false;

  constructor(/*private miMascota: Mascota, private miServicioMascota: MascotaService,*/
    private miExpediente: Expediente, private miServicioExpediente: ExpedienteService,
    private miUsuario: Usuario, private miServicioUsuario: UsuarioService) {

    this.tipo = this.miServicioUsuario.getTipo();
    this.id_cliente = this.miServicioUsuario.getIdUsuario();
  }

  ngOnInit() {
    //si es de tipo general traigo solo datos del expediente
    if (this.tipo == -3 || this.tipo == -5) {
      this.miServicioExpediente.traerTodosLosExpedientes()
        .then(data => {
          this.datosTabla = data;
        })
    }
    //si es de tipo administrador traigo datos del expediente y quien lo cargo
    //REVISAR CONSULTA PARA NO TRAER PASSWORDS DE TODOS EN ESTE CASO
    else if (this.tipo == -1 || this.tipo == -2 || this.tipo == -4) {
      this.miServicioExpediente.traerTodosLosExpedientesConUsuario()
        .then(data => {
          this.datosTabla = data;
        })
    }

    /*
  /////si es tipo admin ve todas las mascotas y relleno la tabla con todas las mascotas
  if (this.tipo == 1) {
    this.miServicioExpediente.traerTodosLosExpedientes()
      .then(data => {
        this.datosTabla = data;
      })
  }
  //si es tipo cliente relleno la tabla solo con las mascotas q corrsponden a su id
  if (this.tipo == 2) {
    this.miServicioExpediente.traerTodosLosExpedientes()
      .then(data => {
        this.datosTabla = data;
      })
  }*/

    /////////
    this.titulo = 'EXPEDIENTES';
    if (this.tipo == -3 || this.tipo == -5) {
      this.cols = [
        //{ field: 'id_mascota', header: 'N° Ficha' },
        { field: 'tipo', header: 'Tipo' },
        { field: 'numero', header: 'Numero' },
        { field: 'anio', header: 'Año' },
        { field: 'fecha', header: 'Fecha' },
        { field: 'tema', header: 'Tema' },
        { field: 'fojas', header: 'Fojas' },
        { field: 'iniciador', header: 'Iniciador' },
        { field: 'direccion', header: 'Direccion' },
        { field: 'caratula', header: 'Caratula' }
      ];
    }
    else if (this.tipo == -1 || this.tipo == -2 || this.tipo == -4) {
      this.cols = [
        //{ field: 'id_mascota', header: 'N° Ficha' },
        { field: 'tipo', header: 'Tipo' },
        { field: 'numero', header: 'Numero' },
        { field: 'anio', header: 'Año' },
        { field: 'fecha', header: 'Fecha' },
        { field: 'tema', header: 'Tema' },
        { field: 'fojas', header: 'Fojas' },
        { field: 'iniciador', header: 'Iniciador' },
        { field: 'direccion', header: 'Direccion' },
        { field: 'caratula', header: 'Caratula' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'apellido', header: 'Apellido' }
      ];
    }

    this.tipoExpediente = [
      { label: 'Ver Todos', value: null },
      { label: 'Infraccion', value: '0' },
      { label: 'Publico', value: '1' },
    ];
  }

  onRowSelect(event) {
    this.miServicioExpediente.traerExpedientePorId(this.expedienteSeleccionado.id_expediente)
      .then(data => {
        //console.log("data: " + data)
        this.miUsuario = data[0];
      })
  }

  solicitarTurno() {
    this.visible = true;
  }

}
