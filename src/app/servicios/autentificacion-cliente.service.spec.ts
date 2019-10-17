import { TestBed, inject } from '@angular/core/testing';

import { AutentificacionClienteService } from './autentificacion-cliente.service';

describe('AutentificacionClienteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutentificacionClienteService]
    });
  });

  it('should be created', inject([AutentificacionClienteService], (service: AutentificacionClienteService) => {
    expect(service).toBeTruthy();
  }));
});
