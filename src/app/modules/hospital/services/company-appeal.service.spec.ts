import { TestBed } from '@angular/core/testing';

import { CompanyAppealService } from './company-appeal.service';

describe('CompanyAppealService', () => {
  let service: CompanyAppealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyAppealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
