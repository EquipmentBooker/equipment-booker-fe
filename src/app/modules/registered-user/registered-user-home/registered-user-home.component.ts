import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../hospital/services/company.service';
import { Company } from '../../hospital/model/company.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registered-user-home',
  templateUrl: './registered-user-home.component.html',
  styleUrls: ['./registered-user-home.component.css'],
})
export class RegisteredUserHomeComponent implements OnInit {
  public searchValue: string = '';
  public companies: Company[] = [];
  public displayedColumns: string[] = [
    'name',
    'description',
    'address',
    'averageScore',
    'workingTime',
    'viewCompany',
  ];
  public startTime: string = '';
  public endTime: string = '';

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((res) => {
      this.companies = res;
      this.convertDate();
    });
  }

  private convertDate() {
    for (let company of this.companies) {
      this.startTime =
        (Number(company.startTime.toString().split(',')[3]) < 10
          ? '0' + company.startTime.toString().split(',')[3]
          : company.startTime.toString().split(',')[3]) +
        ':' +
        (Number(company.startTime.toString().split(',')[4]) < 10
          ? '0' + company.startTime.toString().split(',')[4]
          : company.startTime.toString().split(',')[4]);

      this.endTime =
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
      this.ngOnInit();
    } else {
      this.companyService
        .findCompaniesByNameOrLocation(this.searchValue)
        .subscribe((res) => {
          this.companies = res;
          this.convertDate();
        });
    }
  }
}
