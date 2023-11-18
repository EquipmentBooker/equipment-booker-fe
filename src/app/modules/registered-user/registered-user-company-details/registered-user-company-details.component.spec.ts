import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredUserCompanyDetailsComponent } from './registered-user-company-details.component';

describe('RegisteredUserCompanyDetailsComponent', () => {
  let component: RegisteredUserCompanyDetailsComponent;
  let fixture: ComponentFixture<RegisteredUserCompanyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredUserCompanyDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredUserCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
