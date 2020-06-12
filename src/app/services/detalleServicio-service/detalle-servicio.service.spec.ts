import { TestBed } from '@angular/core/testing';

import { DetalleServicioService } from './detalle-servicio.service';

describe('DetalleServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetalleServicioService = TestBed.get(DetalleServicioService);
    expect(service).toBeTruthy();
  });
});
