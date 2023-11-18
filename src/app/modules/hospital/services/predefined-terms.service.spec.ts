import { TestBed } from '@angular/core/testing';

import { PredefinedTermsService } from './predefined-terms.service';

describe('PredefinedTermsService', () => {
  let service: PredefinedTermsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredefinedTermsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
