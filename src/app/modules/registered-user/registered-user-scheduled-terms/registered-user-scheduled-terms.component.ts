import { Component, OnInit } from '@angular/core';
import { TermService } from '../../hospital/services/term.service';
import { RegisteredUserService } from '../../hospital/services/registered-user.service';
import { RegisteredUser } from '../../hospital/model/registered-user.model';
import { Term } from '../../hospital/model/term.model';
import { UpdateTerm } from '../../dto/update-term';
import { CompanyAdministrator } from '../../hospital/model/company-administrator.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  public updateTerm: UpdateTerm = new UpdateTerm();

  constructor(
    private termService: TermService,
    private registeredUserService: RegisteredUserService,
    private toastr: ToastrService,
    private router: Router
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

  public cancelScheduledTerm(term: Term) {
    this.updateTerm.id = term.id;
    this.updateTerm.duration = term.duration;
    this.updateTerm.isPredefined = term.predefined;
    this.updateTerm.registeredUser = term.registeredUser;
    this.updateTerm.startTime = term.startTime;
    this.updateTerm.status = 'FREE';
    this.updateTerm.termEquipment = term.termEquipment;
    this.updateTerm.companyAdministrator = term.companyAdministrator;
    if (this.validateTerm()) {
      this.termService.cancelScheduledTerm(this.updateTerm).subscribe((res) => {
        this.toastr.success(
          `Term canceled successfully.\n You have ${res.registeredUser.penalties} penalties.`,
          'Success'
        );
        this.router.navigate(['/registered-user']);
      });
    }

    return;
  }

  private validateTerm() {
    if (
      this.updateTerm.duration !== 0 &&
      this.updateTerm.startTime !== new Date() &&
      this.updateTerm.companyAdministrator !== new CompanyAdministrator() &&
      this.updateTerm.registeredUser !== new RegisteredUser() &&
      this.updateTerm.termEquipment.length !== 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
