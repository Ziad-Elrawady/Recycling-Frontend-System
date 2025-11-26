import { TestBed } from '@angular/core/testing';

import { Factory } from './factory';

describe('Factory', () => {
  let service: Factory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Factory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
