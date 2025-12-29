import { TestBed } from '@angular/core/testing';

import { CitizenRewardService } from './citizenreward.service';

describe('CitizenRewardService', () => {
  let service: CitizenRewardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitizenRewardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
