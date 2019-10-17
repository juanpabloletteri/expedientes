import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//SERVICIO HTTP PERSONALIZADO
import { MiHttpService } from './servicios/mi-http.service';
import { HttpModule } from '@angular/http';
//CLASES
import { Mascota } from './clases/mascota';
import { Usuario } from './clases/usuario';
import { Turno } from './clases/turno';
//SERVICIOS
import { MascotaService } from './servicios/mascota.service';
import { UsuarioService } from './servicios/usuario.service';
import { LoginService } from './servicios/login.service';
import { TurnoService } from './servicios/turno.service';
//MODULO PRIME NG
import { PrimengModule } from './modulos/primeng/primeng.module';
//MODULO ROUTEO
import { RouterModule, Route, Routes } from '@angular/router';
//MODULO AUTENTICACION
import { AutentificacionAdminService } from './servicios/autentificacion-admin.service';
import { AutentificacionClienteService } from './servicios/autentificacion-cliente.service';
//COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AltaMascotaComponent } from './componentes/alta-mascota/alta-mascota.component';
import { ListaMascotasComponent } from './componentes/lista-mascotas/lista-mascotas.component';
import { ListaTurnosComponent } from './componentes/lista-turnos/lista-turnos.component';
import { EdadPipe } from './pipes/edad.pipe';
import { TipoPipe } from './pipes/tipo.pipe';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { TurnoComponent } from './componentes/turno/turno.component';
import { AltaUsuarioComponent } from './componentes/alta-usuario/alta-usuario.component';
//ROUTEO
const config: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  ////////////
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AutentificacionAdminService],
    children: [
      {
        path: 'alta',
        component: AltaMascotaComponent,
      },
      {
        path: 'listamascota',
        component: ListaMascotasComponent
      },
      {
        path: 'listaturnos',
        component: ListaTurnosComponent
      },
      {
        path: 'altausuario',
        component: AltaUsuarioComponent
      }
    ]
  },
  {
    path: 'cliente',
    component: ClienteComponent,
    canActivate: [AutentificacionClienteService],
    children: [
      {
        path: 'alta',
        component: AltaMascotaComponent,
      },
      {
        path: 'listamascota',
        component: ListaMascotasComponent
      },
      {
        path: 'listaturnos',
        component: ListaTurnosComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    AltaMascotaComponent,
    ListaMascotasComponent,
    ListaTurnosComponent,
    EdadPipe,
    TipoPipe,
    ClienteComponent,
    AdminComponent,
    TurnoComponent,
    AltaUsuarioComponent
  ],
  imports: [
    BrowserModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(config),
    HttpModule
  ],
  providers: [
    MiHttpService,
    Mascota,
    MascotaService,
    Usuario,
    TurnoService,
    Turno,
    UsuarioService,
    LoginService,
    AutentificacionAdminService,
    AutentificacionClienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
