import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredUserScheduledTermsComponent } from './registered-user-scheduled-terms.component';

describe('RegisteredUserScheduledTermsComponent', () => {
  let component: RegisteredUserScheduledTermsComponent;
  let fixture: ComponentFixture<RegisteredUserScheduledTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredUserScheduledTermsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredUserScheduledTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
