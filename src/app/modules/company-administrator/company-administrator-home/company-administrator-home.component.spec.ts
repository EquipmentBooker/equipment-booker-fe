import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdministratorHomeComponent } from './company-administrator-home.component';

describe('CompanyAdministratorHomeComponent', () => {
  let component: CompanyAdministratorHomeComponent;
  let fixture: ComponentFixture<CompanyAdministratorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAdministratorHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyAdministratorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
