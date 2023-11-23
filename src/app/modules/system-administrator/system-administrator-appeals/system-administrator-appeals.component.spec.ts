import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdministratorAppealsComponent } from './system-administrator-appeals.component';

describe('SystemAdministratorAppealsComponent', () => {
  let component: SystemAdministratorAppealsComponent;
  let fixture: ComponentFixture<SystemAdministratorAppealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemAdministratorAppealsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemAdministratorAppealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
