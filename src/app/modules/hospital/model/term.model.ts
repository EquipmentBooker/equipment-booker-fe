import { CompanyAdministrator } from './company-administrator.model';
import { RegisteredUser } from './registered-user.model';
import { TermEquipment } from './term-equipment.model';

export class Term {
  id: number = 0;
  startTime: Date = new Date();
  duration: number = 0;
  status: string = '';
  isPredefined: boolean = false;
  companyAdministrator: CompanyAdministrator = new CompanyAdministrator();
  registeredUser: RegisteredUser = new RegisteredUser();
  termEquipment: TermEquipment[] = [];
  dateTerm: string = '';
  startTimeString: string = '';
  endTimeString: string = '';

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.startTime = obj.startTime;
      this.duration = obj.duration;
      this.status = obj.status;
      this.isPredefined = obj.isPredefined;
      this.companyAdministrator = obj.companyAdministrator;
      this.registeredUser = obj.registereduser;
      this.termEquipment = obj.termEquipment;
      this.dateTerm = obj.dateTerm;
      this.startTimeString = obj.startTimeString;
      this.endTimeString = obj.endTimeString;
    }
  }
}
