import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredUserAppealAnswersComponent } from './registered-user-appeal-answers.component';

describe('RegisteredUserAppealAnswersComponent', () => {
  let component: RegisteredUserAppealAnswersComponent;
  let fixture: ComponentFixture<RegisteredUserAppealAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredUserAppealAnswersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredUserAppealAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
