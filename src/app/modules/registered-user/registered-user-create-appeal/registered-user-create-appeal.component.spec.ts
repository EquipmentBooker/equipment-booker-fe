import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredUserCreateAppealComponent } from './registered-user-create-appeal.component';

describe('RegisteredUserCreateAppealComponent', () => {
  let component: RegisteredUserCreateAppealComponent;
  let fixture: ComponentFixture<RegisteredUserCreateAppealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredUserCreateAppealComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredUserCreateAppealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
