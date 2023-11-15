import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../../hospital/services/company.service';
import { Company } from '../../hospital/model/company.model';
import { LoginUser } from '../../hospital/model/login-user.model';
import { AuthService } from '../../hospital/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RegisteredUserService } from '../../hospital/services/registered-user.service';
import { Router } from '@angular/router';
import { RegisteredUser } from '../../hospital/model/registered-user.model';

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
  ];
  public loginUser: LoginUser = new LoginUser();
  public registeredUser: RegisteredUser | null = null;

  constructor(
    private companyService: CompanyService,
    private registeredUserService: RegisteredUserService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((res) => {
      this.companies = res;
    });
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
      });
  }

  public async handleLogin() {
    if (this.validateLogin()) {
      try {
        const result = await this.authService.loginUser(this.loginUser);

        if (result) {
          this.registeredUserService
            .getRegisteredUserByEmail(this.loginUser.email)
            .subscribe((res) => {
              this.registeredUser = res;
              console.log(this.registeredUser.activated);
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
