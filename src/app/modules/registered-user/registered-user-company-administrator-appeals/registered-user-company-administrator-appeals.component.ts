import { Component, OnInit } from '@angular/core';
import { RegisteredUserService } from '../../hospital/services/registered-user.service';
import { TermService } from '../../hospital/services/term.service';
import { CompanyAdministratorAppealService } from '../../hospital/services/company-administrator-appeal.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RegisteredUser } from '../../hospital/model/registered-user.model';
import { Term } from '../../hospital/model/term.model';
import { CompanyAdministrator } from '../../hospital/model/company-administrator.model';
import { CompanyAdministratorAppeal } from '../../hospital/model/company-administrator-appeal.model';

@Component({
  selector: 'app-registered-user-company-administrator-appeals',
  templateUrl: './registered-user-company-administrator-appeals.component.html',
  styleUrls: ['./registered-user-company-administrator-appeals.component.css'],
})
export class RegisteredUserCompanyAdministratorAppealsComponent
  implements OnInit
{
  public registeredUser: RegisteredUser = new RegisteredUser();
  public terms: Term[] = [];
  public companyAdministrators: CompanyAdministrator[] = [];
  public selectedCompanyAdministrator!: CompanyAdministrator;
  public companyAdministratorAppeal: CompanyAdministratorAppeal =
    new CompanyAdministratorAppeal();

  constructor(
    private registeredUserService: RegisteredUserService,
    private termService: TermService,
    private companyAdministratorAppealService: CompanyAdministratorAppealService,
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
          .getPastScheduledTermsByRegisteredUserId(this.registeredUser.id)
          .subscribe((res) => {
            this.terms = res;
            this.findCompanyAdministrators();
          });
      });
  }

  private findCompanyAdministrators() {
    for (let term of this.terms) {
      if (!this.companyAdministrators.includes(term.companyAdministrator)) {
        this.companyAdministrators.push(term.companyAdministrator);
      }
    }
  }

  public selectCompanyAdministrator(
    companyAdministrator: CompanyAdministrator
  ) {
    this.selectedCompanyAdministrator = companyAdministrator;
  }

  public createAppeal(companyAdministrator: CompanyAdministrator) {
    this.companyAdministratorAppeal.companyAdministrator = companyAdministrator;
    this.companyAdministratorAppeal.registeredUser = this.registeredUser;
    if (this.validateAppeal()) {
      this.companyAdministratorAppealService
        .createAppeal(this.companyAdministratorAppeal)
        .subscribe((res) => {
          this.toastr.success('Appeal created successfully.', 'Success');
          this.router.navigate(['/registered-user']);
        });
    }

    return;
  }

  private validateAppeal() {
    if (
      this.companyAdministratorAppeal.content !== '' &&
      this.companyAdministratorAppeal.companyAdministrator !==
        new CompanyAdministrator() &&
      this.companyAdministratorAppeal.registeredUser !== new RegisteredUser()
    ) {
      return true;
    } else {
      return false;
    }
  }
}
