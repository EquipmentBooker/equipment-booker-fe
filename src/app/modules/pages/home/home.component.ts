import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../../hospital/services/company.service';
import { Company } from '../../hospital/model/company.model';

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
    'averageScore',
  ];

  constructor(private companyService: CompanyService) {}

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

  public handleLogin() {}
}
