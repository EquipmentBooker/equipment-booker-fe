import { Component, OnInit } from '@angular/core';
import { CompanyAdministratorAppealService } from '../../hospital/services/company-administrator-appeal.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyAdministratorAppeal } from '../../hospital/model/company-administrator-appeal.model';

@Component({
  selector: 'app-system-administrator-company-administrator-appeals',
  templateUrl:
    './system-administrator-company-administrator-appeals.component.html',
  styleUrls: [
    './system-administrator-company-administrator-appeals.component.css',
  ],
})
export class SystemAdministratorCompanyAdministratorAppealsComponent
  implements OnInit
{
  public companyAdministratorAppeals: CompanyAdministratorAppeal[] = [];
  public isShownButton: boolean = false;

  constructor(
    private companyAdministratorAppealService: CompanyAdministratorAppealService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.companyAdministratorAppealService.getAppeals().subscribe((res) => {
      this.companyAdministratorAppeals = res;
      console.log(this.companyAdministratorAppeals);
    });
  }

  public handleAnswerToAppealClick() {
    this.isShownButton = true;
  }

  public handleAnswerClick(appeal: CompanyAdministratorAppeal) {
    if (this.validateAnswer(appeal)) {
      this.companyAdministratorAppealService
        .createAnswerToAppeal(appeal)
        .subscribe((res) => {
          this.toastr.success('Answered successfully.', 'Success');
          this.router.navigate(['/system-administrator']);
        });
    }

    return;
  }

  private validateAnswer(appeal: CompanyAdministratorAppeal) {
    if (appeal.answer !== '') {
      return true;
    } else {
      return false;
    }
  }
}
