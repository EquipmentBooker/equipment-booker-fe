import { Component, OnInit } from '@angular/core';
import { TermService } from '../../hospital/services/term.service';
import { RegisteredUserService } from '../../hospital/services/registered-user.service';
import { RegisteredUser } from '../../hospital/model/registered-user.model';
import { Term } from '../../hospital/model/term.model';

@Component({
  selector: 'app-registered-user-scheduled-terms',
  templateUrl: './registered-user-scheduled-terms.component.html',
  styleUrls: ['./registered-user-scheduled-terms.component.css'],
})
export class RegisteredUserScheduledTermsComponent implements OnInit {
  public registeredUser: RegisteredUser = new RegisteredUser();
  public terms: Term[] = [];
  public startTimeTerm: string = '';
  public endTimeTerm: string = '';
  public dateTerm: string = '';

  constructor(
    private termService: TermService,
    private registeredUserService: RegisteredUserService
  ) {}

  ngOnInit(): void {
    this.registeredUserService
      .getRegisteredUserByEmail(
        JSON.parse(sessionStorage.getItem('email') as string)
      )
      .subscribe((res) => {
        this.registeredUser = res;
        this.termService
          .getScheduledTermsByRegisteredUserId(this.registeredUser.id)
          .subscribe((res) => {
            this.terms = res;
            this.convertTermDate();
          });
      });
  }

  private convertTermDate() {
    for (let term of this.terms) {
      term.dateTerm =
        term.startTime.toString().split(',')[2] +
        '.' +
        term.startTime.toString().split(',')[1] +
        '.' +
        term.startTime.toString().split(',')[0] +
        '.';

      term.startTimeString =
        (Number(term.startTime.toString().split(',')[3]) < 10
          ? '0' + term.startTime.toString().split(',')[3]
          : term.startTime.toString().split(',')[3]) +
        ':' +
        (Number(term.startTime.toString().split(',')[4]) < 10
          ? '0' + term.startTime.toString().split(',')[4]
          : term.startTime.toString().split(',')[4]);

      term.endTimeString =
        (Number(term.startTime.toString().split(',')[3]) < 10
          ? '0' + term.startTime.toString().split(',')[3]
          : term.startTime.toString().split(',')[3]) +
        ':' +
        (Number(term.startTime.toString().split(',')[4]) + term.duration < 10
          ? '0' + term.startTime.toString().split(',')[4]
          : Number(term.startTime.toString().split(',')[4]) + term.duration);
    }
  }
}
