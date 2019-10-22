import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agente',
  templateUrl: './agente.component.html',
  styleUrls: ['./agente.component.css']
})
export class AgenteComponent implements OnInit {

  private items: MenuItem[];

  constructor(public rute: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Agregar Expediente',
        icon: 'fa-edit',
        command: (click) => { this.rute.navigate(['agente/alta']) }
      },
      {
        label: 'Lista de Expedientes',
        icon: 'fa-edit',
        command: (click) => { this.rute.navigate(['agente/listaexpedientes']) }
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
