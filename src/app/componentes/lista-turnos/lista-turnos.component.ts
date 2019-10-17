import { Component, OnInit } from '@angular/core';
import { Turno } from '../../clases/turno';
import { TurnoService } from '../../servicios/turno.service';
import { Mascota } from '../../clases/mascota';
import { MascotaService } from '../../servicios/mascota.service';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-lista-turnos',
  templateUrl: './lista-turnos.component.html',
  styleUrls: ['./lista-turnos.component.css']
})
export class ListaTurnosComponent implements OnInit {

  cols: any[];
  datosTabla: any = null;
  titulo: string;
  turnoSeleccionado: any;
  mascotaSeleccionada: Mascota;
  usuarioSeleccionado: Usuario;

  turnosSeleccionados: any[];

  tipo: number;
  id_cliente: number;
  tipoMascota: any;

  constructor(private miTurno: Turno, private miServicioTurno: TurnoService, private miMascota: Mascota,
    private miServicioMascota: MascotaService, private miUsuario: Usuario, private miServicioUsuario: UsuarioService) {

    this.tipo = this.miServicioUsuario.getTipo();
    this.id_cliente = this.miServicioUsuario.getIdUsuario();

  }

  ngOnInit() {
    ///////////////
    /////si es tipo admin ve todas las mascotas y relleno la tabla con todas las mascotas
    if (this.tipo == 1) {
      this.miServicioTurno.traerTodosLosTurnos()
        .then(data => {
          this.datosTabla = data;
        })
    }
    //si es tipo cliente relleno la tabla solo con las mascotas q corrsponden a su id
    if (this.tipo == 2) {
      this.miServicioTurno.traerTurnoPorIdDuenio(this.id_cliente)
        .then(data => {
          this.datosTabla = data;
        })
    }
    ///////////////////
    this.titulo = 'TURNOS';
    this.cols = [
      { field: 'id_mascota', header: 'N° Ficha' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'raza', header: 'Raza' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'observaciones', header: 'Observaciones' }
    ];
    this.tipoMascota = [
      { label: 'Ver Todos', value: null },
      { label: 'Gato', value: '100' },
      { label: 'Perro', value: '200' },
    ];
  }

  onRowSelect(event) {
    let cantidad = this.turnosSeleccionados.length - 1;
    this.miServicioUsuario.traerUsuarioPorId(this.turnosSeleccionados[cantidad].id_duenio)
      .then(data => {
        //console.log("data: " + data)
        this.miUsuario = data[0];
      })
  }

}
