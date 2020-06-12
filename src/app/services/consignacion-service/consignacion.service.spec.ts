import { TestBed } from '@angular/core/testing';

import { ConsignacionService } from './consignacion.service';

describe('ConsignacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsignacionService = TestBed.get(ConsignacionService);
    expect(service).toBeTruthy();
  });
});
