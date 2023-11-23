import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdministratorCompanyAdministratorAppealsComponent } from './system-administrator-company-administrator-appeals.component';

describe('SystemAdministratorCompanyAdministratorAppealsComponent', () => {
  let component: SystemAdministratorCompanyAdministratorAppealsComponent;
  let fixture: ComponentFixture<SystemAdministratorCompanyAdministratorAppealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemAdministratorCompanyAdministratorAppealsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemAdministratorCompanyAdministratorAppealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
