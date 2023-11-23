import { TestBed } from '@angular/core/testing';

import { CompanyAdministratorAppealService } from './company-administrator-appeal.service';

describe('CompanyAdministratorAppealService', () => {
  let service: CompanyAdministratorAppealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyAdministratorAppealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
