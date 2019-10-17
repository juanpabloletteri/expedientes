import { TestBed, inject } from '@angular/core/testing';

import { AutentificacionAdminService } from './autentificacion-admin.service';

describe('AutentificacionAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutentificacionAdminService]
    });
  });

  it('should be created', inject([AutentificacionAdminService], (service: AutentificacionAdminService) => {
    expect(service).toBeTruthy();
  }));
});
