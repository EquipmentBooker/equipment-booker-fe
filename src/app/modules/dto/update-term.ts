import { CompanyAdministrator } from '../hospital/model/company-administrator.model';
import { RegisteredUser } from '../hospital/model/registered-user.model';
import { TermEquipment } from '../hospital/model/term-equipment.model';

export class UpdateTerm {
  id: number = 0;
  startTime: Date = new Date();
  duration: number = 0;
  status: string = '';
  isPredefined: boolean = false;
  companyAdministrator: CompanyAdministrator = new CompanyAdministrator();
  registeredUser: RegisteredUser = new RegisteredUser();
  termEquipment: TermEquipment[] = [];

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
    }
  }
}
