import { CompanyAdministrator } from './company-administrator.model';

export class PredefinedTerm {
  id: number = 0;
  startTime: Date = new Date();
  duration: number = 0;
  status: string = '';
  companyAdministrator: CompanyAdministrator = new CompanyAdministrator();

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.startTime = obj.startTime;
      this.duration = obj.duration;
      this.status = obj.status;
      this.companyAdministrator = obj.companyAdministrator;
    }
  }
}
