import { Component, OnInit } from '@angular/core';
import { RegisteredUserService } from '../../hospital/services/registered-user.service';
import { TermService } from '../../hospital/services/term.service';
import { RegisteredUser } from '../../hospital/model/registered-user.model';
import { Term } from '../../hospital/model/term.model';
import { Company } from '../../hospital/model/company.model';
import { CompanyAppeal } from '../../hospital/model/company-appeal.model';
import { CompanyAppealService } from '../../hospital/services/company-appeal.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registered-user-create-appeal',
  templateUrl: './registered-user-create-appeal.component.html',
  styleUrls: ['./registered-user-create-appeal.component.css'],
})
export class RegisteredUserCreateAppealComponent implements OnInit {
  public registeredUser: RegisteredUser = new RegisteredUser();
  public terms: Term[] = [];
  public companies: Company[] = [];
  public selectedCompany!: Company;
  public companyAppeal: CompanyAppeal = new CompanyAppeal();

  constructor(
    private registeredUserService: RegisteredUserService,
    private termService: TermService,
    private companyAppealService: CompanyAppealService,
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
            this.findCompanies();
          });
      });
  }

  private findCompanies() {
    for (let term of this.terms) {
      if (!this.companies.includes(term.companyAdministrator.company)) {
        this.companies.push(term.companyAdministrator.company);
      }
    }

    this.convertDate();
  }

  private convertDate() {
    for (let company of this.companies) {
      company.startTimeString =
        (Number(company.startTime.toString().split(',')[3]) < 10
          ? '0' + company.startTime.toString().split(',')[3]
          : company.startTime.toString().split(',')[3]) +
        ':' +
        (Number(company.startTime.toString().split(',')[4]) < 10
          ? '0' + company.startTime.toString().split(',')[4]
          : company.startTime.toString().split(',')[4]);

      company.endTimeString =
        (Number(company.endTime.toString().split(',')[3]) < 10
          ? '0' + company.endTime.toString().split(',')[3]
          : company.endTime.toString().split(',')[3]) +
        ':' +
        (Number(company.endTime.toString().split(',')[4]) < 10
          ? '0' + company.endTime.toString().split(',')[4]
          : company.endTime.toString().split(',')[4]);
    }
  }

  public selectCompany(company: Company) {
    this.selectedCompany = company;
  }

  public createAppeal(company: Company) {
    this.companyAppeal.company = company;
    this.companyAppeal.registeredUser = this.registeredUser;
    if (this.validateAppeal()) {
      this.companyAppealService
        .createAppeal(this.companyAppeal)
        .subscribe((res) => {
          this.toastr.success('Appeal created successfully.', 'Success');
          this.router.navigate(['/registered-user']);
        });
    }

    return;
  }

  private validateAppeal() {
    if (
      this.companyAppeal.content !== '' &&
      this.companyAppeal.company !== new Company() &&
      this.companyAppeal.registeredUser !== new RegisteredUser()
    ) {
      return true;
    } else {
      return false;
    }
  }
}
