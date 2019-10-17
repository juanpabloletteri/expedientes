import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private items: MenuItem[];

  constructor(public rute: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Alta Usuario',
        icon: 'fa-edit',
        command: (click) => { this.rute.navigate(['admin/altausuario']) }
      },  
      {
        label: 'Agregar Mascota',
        icon: 'fa-edit',
        command: (click) => { this.rute.navigate(['admin/alta']) }
      },
      {
        label: 'Lista de Mascotas',
        icon: 'fa-edit',
        command: (click) => { this.rute.navigate(['admin/listamascota']) }
      },
      {
        label: 'Lista de Turnos',
        icon: 'fa-edit',
        command: (click) => { this.rute.navigate(['admin/listaturnos']) }
      }
    ];
  }

  salir() {
    localStorage.removeItem('token');
    this.rute.navigate(['']);
  }
}
