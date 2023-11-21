import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompanyService } from '../../hospital/services/company.service';
import { Company } from '../../hospital/model/company.model';
import { Equipment } from '../../hospital/model/equipment.model';
import { PredefinedTermsService } from '../../hospital/services/predefined-terms.service';
import { PredefinedTerm } from '../../hospital/model/predefined-term.model';
import { RegisteredUserService } from '../../hospital/services/registered-user.service';
import { RegisteredUser } from '../../hospital/model/registered-user.model';
import { SchedulePredefinedTerm } from '../../dto/schedule-predefined-term';
import { ToastrService } from 'ngx-toastr';
import { TermService } from '../../hospital/services/term.service';
import { Term } from '../../hospital/model/term.model';
import { ScheduleTerm } from '../../dto/schedule-term';

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
  public selectedPredefinedTerm: PredefinedTerm = new PredefinedTerm();
  public registeredUser: RegisteredUser = new RegisteredUser();
  public scheduledPredefinedTerm: SchedulePredefinedTerm =
    new SchedulePredefinedTerm();
  public freeTerms: Term[] = [];
  public term: ScheduleTerm = new ScheduleTerm();

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private predefinedTermService: PredefinedTermsService,
    private registeredUserService: RegisteredUserService,
    private termService: TermService,
    private toastr: ToastrService,
    private router: Router
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
        this.termService
          .getFreeTermsByCompanyId(this.company.id)
          .subscribe((res) => {
            this.freeTerms = res;
            this.convertFreeTermsDate();
            console.log(this.freeTerms);
          });
        this.showTerms = true;
      });
  }

  private convertFreeTermsDate() {
    for (let term of this.freeTerms) {
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

  public schedulePredefinedTerm(term: PredefinedTerm) {
    this.registeredUserService
      .getRegisteredUserByEmail(
        JSON.parse(sessionStorage.getItem('email') as string)
      )
      .subscribe((res) => {
        this.registeredUser = res;
        this.selectedPredefinedTerm = term;
        this.scheduledPredefinedTerm.registeredUserId = this.registeredUser.id;
        this.scheduledPredefinedTerm.reservedEquipment = this.reservedEquipment;
        this.scheduledPredefinedTerm.predefinedTerm =
          this.selectedPredefinedTerm;
        if (this.validateTerm()) {
          this.predefinedTermService
            .schedulePredefinedTerm(this.scheduledPredefinedTerm)
            .subscribe((res) => {
              this.toastr.success(
                'Term reserved successfully.\n QR code with term informations is sent to your e-mail.',
                'Success'
              );
              this.router.navigate(['/registered-user/scheduled-terms']);
            });
        }

        return;
      });
  }

  public scheduleTerm(term: Term) {
    this.registeredUserService
      .getRegisteredUserByEmail(
        JSON.parse(sessionStorage.getItem('email') as string)
      )
      .subscribe((res) => {
        this.registeredUser = res;
        this.term.registeredUserId = this.registeredUser.id;
        this.term.termId = term.id;
        this.term.reservedEquipment = this.reservedEquipment;
        if (this.validate()) {
          this.termService.scheduleFreeTerm(this.term).subscribe((res) => {
            this.toastr.success(
              'Term reserved successfully.\n QR code with term informations is sent to your e-mail.',
              'Success'
            );
            this.router.navigate(['/registered-user/scheduled-terms']);
          });
        }

        return;
      });
  }

  private validateTerm() {
    if (
      this.selectedPredefinedTerm !== new PredefinedTerm() &&
      this.reservedEquipment.length !== 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  private validate() {
    if (
      this.term.registeredUserId !== 0 &&
      this.term.termId !== 0 &&
      this.term.reservedEquipment.length !== 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
