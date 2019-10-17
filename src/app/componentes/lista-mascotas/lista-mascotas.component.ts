import { Component, OnInit } from '@angular/core';
import { Mascota } from '../../clases/mascota';
import { MascotaService } from '../../servicios/mascota.service';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.css']
})
export class ListaMascotasComponent implements OnInit {

  cols: any[];
  datosTabla: any = null;
  titulo: string;
  mascotaSeleccionada: Mascota = null;

  tipo: number;
  id_cliente: number;
  tipoMascota: any;

  visible: boolean = false;

  constructor(private miMascota: Mascota, private miServicioMascota: MascotaService,
    private miUsuario: Usuario, private miServicioUsuario: UsuarioService) {

    this.tipo = this.miServicioUsuario.getTipo();
    this.id_cliente = this.miServicioUsuario.getIdUsuario();
  }

  ngOnInit() {
    /////si es tipo admin ve todas las mascotas y relleno la tabla con todas las mascotas
    if (this.tipo == 1) {
      this.miServicioMascota.traerTodasLasMascotas()
        .then(data => {
          this.datosTabla = data;
        })
    }
    //si es tipo cliente relleno la tabla solo con las mascotas q corrsponden a su id
    if (this.tipo == 2) {
      this.miServicioMascota.traerMascotasPorDuenio(this.id_cliente)
        .then(data => {
          this.datosTabla = data;
        })
    }

    /////////
    this.titulo = 'MASCOTAS';
    this.cols = [
      { field: 'id_mascota', header: 'N° Ficha' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'raza', header: 'Raza' },
      { field: 'color', header: 'Color' },
      { field: 'edad', header: 'Edad' },
      { field: 'tipo', header: 'Tipo' }
    ];
    this.tipoMascota = [
      { label: 'Ver Todos', value: null },
      { label: 'Gato', value: '100' },
      { label: 'Perro', value: '200' },
    ];
  }

  onRowSelect(event) {
    this.miServicioUsuario.traerUsuarioPorId(this.mascotaSeleccionada.id_duenio)
      .then(data => {
        //console.log("data: " + data)
        this.miUsuario = data[0];
      })
  }

  solicitarTurno() {
    this.visible = true;
  }

}
