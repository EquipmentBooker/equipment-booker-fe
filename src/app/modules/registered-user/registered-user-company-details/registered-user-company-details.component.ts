import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CompanyService } from '../../hospital/services/company.service';
import { Company } from '../../hospital/model/company.model';
import { Equipment } from '../../hospital/model/equipment.model';
import { PredefinedTermsService } from '../../hospital/services/predefined-terms.service';
import { PredefinedTerm } from '../../hospital/model/predefined-term.model';

@Component({
  selector: 'app-registered-user-company-details',
  templateUrl: './registered-user-company-details.component.html',
  styleUrls: ['./registered-user-company-details.component.css'],
})
export class RegisteredUserCompanyDetailsComponent implements OnInit {
  public company: Company = new Company();
  public startTime: string = '';
  public endTime: string = '';
  public selectedQuantity: number = 0;
  public quantity: number[] = [];
  public selectedEquipment: Equipment = new Equipment();
  public reservedEquipment: Equipment[] = [];
  public showTerms: boolean = false;
  public searchValue: string = '';
  public predefinedTerms: PredefinedTerm[] = [];
  public startTimeTerm: string = '';
  public endTimeTerm: string = '';
  public dateTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private predefinedTermService: PredefinedTermsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.companyService.getCompany(params['companyId']).subscribe((res) => {
        this.company = res;
        this.convertDate();
        this.convertQuantity();
      });
    });
  }

  private convertDate() {
    this.startTime =
      (Number(this.company.startTime.toString().split(',')[3]) < 10
        ? '0' + this.company.startTime.toString().split(',')[3]
        : this.company.startTime.toString().split(',')[3]) +
      ':' +
      (Number(this.company.startTime.toString().split(',')[4]) < 10
        ? '0' + this.company.startTime.toString().split(',')[4]
        : this.company.startTime.toString().split(',')[4]);

    this.endTime =
      (Number(this.company.endTime.toString().split(',')[3]) < 10
        ? '0' + this.company.endTime.toString().split(',')[3]
        : this.company.endTime.toString().split(',')[3]) +
      ':' +
      (Number(this.company.endTime.toString().split(',')[4]) < 10
        ? '0' + this.company.endTime.toString().split(',')[4]
        : this.company.endTime.toString().split(',')[4]);
  }

  private convertQuantity() {
    for (let eq of this.company.equipment) {
      eq.quantityArray = [];
      for (let qu = 0; qu <= eq.quantity; qu += 1) {
        eq.quantityArray.push(qu);
      }
    }
  }

  public handleQuantity(equipment: Equipment, e: any) {
    if (e.value === 0) {
      return;
    } else if (this.reservedEquipment.find((re) => re.id === equipment.id)) {
      this.selectedEquipment = this.reservedEquipment.find(
        (re) => re.id === equipment.id
      ) as Equipment;
      this.selectedEquipment.quantity = e.value;
    } else {
      this.selectedEquipment = equipment;
      this.selectedEquipment.quantity = e.value;
      this.reservedEquipment.push(this.selectedEquipment);
    }
  }

  public handleChooseTerm() {
    this.predefinedTermService
      .getFreePredefinedTerms(this.company.id)
      .subscribe((res) => {
        this.predefinedTerms = res;
        this.convertTermDate();
        this.showTerms = true;
      });
  }

  private convertTermDate() {
    for (let term of this.predefinedTerms) {
      this.dateTerm =
        term.startTime.toString().split(',')[2] +
        '.' +
        term.startTime.toString().split(',')[1] +
        '.' +
        term.startTime.toString().split(',')[0] +
        '.';

      this.startTimeTerm =
        (Number(term.startTime.toString().split(',')[3]) < 10
          ? '0' + term.startTime.toString().split(',')[3]
          : term.startTime.toString().split(',')[3]) +
        ':' +
        (Number(term.startTime.toString().split(',')[4]) < 10
          ? '0' + term.startTime.toString().split(',')[4]
          : term.startTime.toString().split(',')[4]);

      this.endTimeTerm =
        (Number(term.startTime.toString().split(',')[3]) < 10
          ? '0' + term.startTime.toString().split(',')[3]
          : term.startTime.toString().split(',')[3]) +
        ':' +
        (Number(term.startTime.toString().split(',')[4]) + term.duration < 10
          ? '0' + term.startTime.toString().split(',')[4]
          : Number(term.startTime.toString().split(',')[4]) + term.duration);
    }
  }

  public handleSearchValue() {
    if (this.searchValue.length === 0) {
      this.ngOnInit();
    } else {
      this.company.equipment = this.company.equipment.filter((eq) =>
        eq.name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    }
  }

  public handleBackEquipment() {
    this.showTerms = false;
  }
}
