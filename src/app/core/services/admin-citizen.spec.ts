import { TestBed } from '@angular/core/testing';

import { AdminCitizen } from './admin-citizen.service';

describe('AdminCitizen', () => {
  let service: AdminCitizen;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCitizen);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
