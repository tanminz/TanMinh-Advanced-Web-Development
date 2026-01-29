import { TestBed } from '@angular/core/testing';

import { Custmerdetail } from './custmerdetail';

describe('Custmerdetail', () => {
  let service: Custmerdetail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Custmerdetail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
