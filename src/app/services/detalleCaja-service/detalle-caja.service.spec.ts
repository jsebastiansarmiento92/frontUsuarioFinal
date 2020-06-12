import { TestBed } from '@angular/core/testing';

import { DetalleCajaService } from './detalle-caja.service';

describe('DetalleCajaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetalleCajaService = TestBed.get(DetalleCajaService);
    expect(service).toBeTruthy();
  });
});
