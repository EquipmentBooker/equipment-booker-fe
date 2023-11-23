import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../../hospital/services/company.service';
import { Company } from '../../hospital/model/company.model';
import { LoginUser } from '../../hospital/model/login-user.model';
import { AuthService } from '../../hospital/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RegisteredUserService } from '../../hospital/services/registered-user.service';
import { Router } from '@angular/router';
import { RegisteredUser } from '../../hospital/model/registered-user.model';
import { CompanyAdministratorService } from '../../hospital/services/company-administrator.service';
import { CompanyAdministrator } from '../../hospital/model/company-administrator.model';
import { SystemAdministratorService } from '../../hospital/services/system-administrator.service';
import { SystemAdministrator } from '../../hospital/model/system-administrator.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isFilterShown: boolean = false;
  public searchValue: string = '';
  public filterGradeValue: string = 'Select by grade';
  public companies: Company[] = [];
  public displayedColumns: string[] = [
    'name',
    'description',
    'address',
    'equipment',
    'averageScore',
    'workingTime',
  ];
  public loginUser: LoginUser = new LoginUser();
  public registeredUser: RegisteredUser | null = null;
  public companyAdministrator: CompanyAdministrator | null = null;
  public systemAdministrator: SystemAdministrator | null = null;
  public startTime: string = '';
  public endTime: string = '';

  constructor(
    private companyService: CompanyService,
    private registeredUserService: RegisteredUserService,
    private companyAdministratorService: CompanyAdministratorService,
    private systemAdministratorService: SystemAdministratorService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((res) => {
      this.companies = res;
      this.convertDate();
    });
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

  public handleSearchValue() {
    if (this.searchValue.length === 0) {
      this.filterGradeValue = 'Select by grade';
      this.isFilterShown = false;
      this.ngOnInit();
    } else if (
      this.searchValue.length !== 0 &&
      this.filterGradeValue === 'Select by grade'
    ) {
      this.isFilterShown = true;
      this.companyService
        .findCompaniesByNameOrLocation(this.searchValue)
        .subscribe((res) => {
          this.companies = res;
          this.convertDate();
        });
    } else {
      this.handleFilterGradeValue();
    }
  }

  public handleFilterGradeValue() {
    if (this.filterGradeValue === 'Select by grade') {
      this.handleSearchValue();
      return;
    }

    this.companyService
      .findCompaniesByNameOrLocationAndGrade(
        this.searchValue,
        this.filterGradeValue
      )
      .subscribe((res) => {
        this.companies = res;
        this.convertDate();
      });
  }

  public async handleLogin() {
    if (this.validateLogin()) {
      try {
        const result = await this.authService.loginUser(this.loginUser);

        if (result) {
          if (
            JSON.parse(sessionStorage.getItem('authorities') as string)[0]
              .authority === 'ROLE_REGISTERED_USER'
          ) {
            this.registeredUserService
              .getRegisteredUserByEmail(this.loginUser.email)
              .subscribe((res) => {
                this.registeredUser = res;
                if (this.registeredUser && this.registeredUser.activated) {
                  this.toastr.success('User logged successfully.', 'Success');
                  this.router.navigate(['/registered-user']);
                  return;
                } else {
                  this.toastr.error(
                    'User logged unsuccessfully - account is not activated.',
                    'Error'
                  );
                }
              });
          } else if (
            JSON.parse(sessionStorage.getItem('authorities') as string)[0]
              .authority === 'ROLE_COMPANY_ADMINISTRATOR'
          ) {
            this.companyAdministratorService
              .getCompanyAdministratorByEmail(this.loginUser.email)
              .subscribe((res) => {
                this.companyAdministrator = res;
                if (
                  this.companyAdministrator &&
                  this.companyAdministrator.activated
                ) {
                  this.toastr.success('User logged successfully.', 'Success');
                  this.router.navigate(['/company-administrator']);
                  return;
                } else {
                  this.toastr.error(
                    'User logged unsuccessfully - account is not activated.',
                    'Error'
                  );
                }
              });
          } else {
            this.systemAdministratorService
              .getSystemAdministratorByEmail(this.loginUser.email)
              .subscribe((res) => {
                this.systemAdministrator = res;
                if (
                  this.systemAdministrator &&
                  this.systemAdministrator.activated
                ) {
                  this.toastr.success('User logged successfully.', 'Success');
                  this.router.navigate(['/system-administrator']);
                  return;
                } else {
                  this.toastr.error(
                    'User logged unsuccessfully - account is not activated.',
                    'Error'
                  );
                }
              });
          }
        } else {
          this.toastr.error(
            'User logged unsuccessfully - bad credentials or account is not activated.',
            'Error'
          );
        }
      } catch (error) {
        this.toastr.error(
          'User logged unsuccessfully - bad credentials or account is not activated.',
          'Error'
        );
      }
    } else {
      this.toastr.info('Please, fill in all fields.', 'Info');
    }

    return;
  }

  private validateLogin() {
    if (this.loginUser.email !== '' && this.loginUser.password !== '') {
      return true;
    }

    return false;
  }
}
