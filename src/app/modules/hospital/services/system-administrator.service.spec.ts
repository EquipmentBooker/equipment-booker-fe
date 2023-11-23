import { TestBed } from '@angular/core/testing';

import { SystemAdministratorService } from './system-administrator.service';

describe('SystemAdministratorService', () => {
  let service: SystemAdministratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemAdministratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
