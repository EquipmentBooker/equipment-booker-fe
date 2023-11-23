import { Component, OnInit } from '@angular/core';
import { CompanyAppealService } from '../../hospital/services/company-appeal.service';
import { CompanyAppeal } from '../../hospital/model/company-appeal.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-system-administrator-appeals',
  templateUrl: './system-administrator-appeals.component.html',
  styleUrls: ['./system-administrator-appeals.component.css'],
})
export class SystemAdministratorAppealsComponent implements OnInit {
  public companyAppeals: CompanyAppeal[] = [];
  public isShownButton: boolean = false;

  constructor(
    private companyAppealService: CompanyAppealService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.companyAppealService.getAppeals().subscribe((res) => {
      this.companyAppeals = res;
      console.log(this.companyAppeals);
    });
  }

  public handleAnswerToAppealClick() {
    this.isShownButton = true;
  }

  public handleAnswerClick(appeal: CompanyAppeal) {
    if (this.validateAnswer(appeal)) {
      this.companyAppealService
        .createAnswerToAppeal(appeal)
        .subscribe((res) => {
          this.toastr.success('Answered successfully.', 'Success');
          this.router.navigate(['/system-administrator']);
        });
    }

    return;
  }

  private validateAnswer(appeal: CompanyAppeal) {
    if (appeal.answer !== '') {
      return true;
    } else {
      return false;
    }
  }
}
