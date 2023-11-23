import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredUserCompanyAdministratorAppealsComponent } from './registered-user-company-administrator-appeals.component';

describe('RegisteredUserCompanyAdministratorAppealsComponent', () => {
  let component: RegisteredUserCompanyAdministratorAppealsComponent;
  let fixture: ComponentFixture<RegisteredUserCompanyAdministratorAppealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredUserCompanyAdministratorAppealsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredUserCompanyAdministratorAppealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
