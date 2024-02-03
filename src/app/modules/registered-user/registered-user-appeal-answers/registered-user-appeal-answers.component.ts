import { Component, OnInit } from '@angular/core';
import { CompanyAppealService } from '../../hospital/services/company-appeal.service';
import { RegisteredUserService } from '../../hospital/services/registered-user.service';
import { RegisteredUser } from '../../hospital/model/registered-user.model';
import { CompanyAppeal } from '../../hospital/model/company-appeal.model';
import { CompanyAdministratorAppealService } from '../../hospital/services/company-administrator-appeal.service';
import { CompanyAdministratorAppeal } from '../../hospital/model/company-administrator-appeal.model';

@Component({
  selector: 'app-registered-user-appeal-answers',
  templateUrl: './registered-user-appeal-answers.component.html',
  styleUrls: ['./registered-user-appeal-answers.component.css'],
})
export class RegisteredUserAppealAnswersComponent implements OnInit {
  public registeredUser: RegisteredUser = new RegisteredUser();
  public companyAppeals: CompanyAppeal[] = [];
  public companyAdministratorAppeals: CompanyAdministratorAppeal[] = [];

  constructor(
    private companyAppealService: CompanyAppealService,
    private registeredUserService: RegisteredUserService,
    private companyAdministratorAppealService: CompanyAdministratorAppealService
  ) {}

  ngOnInit(): void {
    this.registeredUserService
      .getRegisteredUserByEmail(
        JSON.parse(sessionStorage.getItem('email') as string)
      )
      .subscribe((res) => {
        this.registeredUser = res;
        this.companyAppealService
          .getAppealAnswers(this.registeredUser.id)
          .subscribe((res) => {
            this.companyAppeals = res;
            this.companyAdministratorAppealService
              .getAppealAnswers(this.registeredUser.id)
              .subscribe((res) => {
                this.companyAdministratorAppeals = res;
              });
          });
      });
  }
}
