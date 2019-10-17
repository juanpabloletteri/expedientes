import { Component, OnInit, Input } from '@angular/core';
import { Mascota } from '../../clases/mascota';
import { Turno } from '../../clases/turno';
import { TurnoService } from '../../servicios/turno.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {

  @Input() unaMascota: Mascota;
  date: Date;
  observaciones: string;
  invalidDates: Array<Date>;
  es: any;

  constructor(private miTurno: Turno, private miServicioTurno: TurnoService, private rute: Router) { }

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
  }


  confirmarTurno() {
    this.miTurno.fecha = this.date;
    this.miTurno.id_mascota = this.unaMascota.id_mascota;
    this.miTurno.observaciones = this.observaciones;

    if (!this.miTurno.fecha) {
      swal("Falta ingresar fecha del turno");
      return 1;
    }
    else if (!this.miTurno.observaciones) {
      swal("Falta ingresar Observaciones del turno");
      return 1;
    }

    let dia: Date = new Date();
    console.log(dia);
    console.log(this.miTurno.fecha);
    if (this.miTurno.fecha < dia) {
      swal("Seleccione una fecha valida");
      return 1;
    }

    this.miServicioTurno.agregarTurno(this.miTurno)
      .then(data => {
        swal(
          'Felicidades!',
          'Turno generado con exito para ' + this.unaMascota.nombre + "!",
          'success'
        )
        this.rute.navigate(['cliente']);
      })
  }

}
