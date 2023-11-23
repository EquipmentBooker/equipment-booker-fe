import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdministratorHomeComponent } from './system-administrator-home.component';

describe('SystemAdministratorHomeComponent', () => {
  let component: SystemAdministratorHomeComponent;
  let fixture: ComponentFixture<SystemAdministratorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemAdministratorHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemAdministratorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
