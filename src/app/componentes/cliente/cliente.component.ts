import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  private items: MenuItem[];

  constructor(public rute: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Agregar Mascota',
        icon: 'fa-edit',
        command: (click) => { this.rute.navigate(['cliente/alta']) }
      },
      {
        label: 'Lista de Mascotas',
        icon: 'fa-edit',
        command: (click) => { this.rute.navigate(['cliente/listamascota']) }
      },
      {
        label: 'Lista de Turnos',
        icon: 'fa-edit',
        command: (click) => { this.rute.navigate(['cliente/listaturnos']) }
      }
    ];
  }

  salir() {
    localStorage.removeItem('token');
    this.rute.navigate(['']);
  }
}
