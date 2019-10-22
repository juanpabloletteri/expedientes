import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaExpedientesComponent } from './lista-expedientes.component';

describe('ListaExpedientesComponent', () => {
  let component: ListaExpedientesComponent;
  let fixture: ComponentFixture<ListaExpedientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaExpedientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaExpedientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
