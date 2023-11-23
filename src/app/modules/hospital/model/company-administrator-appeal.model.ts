import { CompanyAdministrator } from './company-administrator.model';
import { RegisteredUser } from './registered-user.model';

export class CompanyAdministratorAppeal {
  id: number = 0;
  content: string = '';
  answer: string = '';
  registeredUser: RegisteredUser = new RegisteredUser();
  companyAdministrator: CompanyAdministrator = new CompanyAdministrator();

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.content = obj.content;
      this.answer = obj.answer;
      this.registeredUser = obj.registeredUser;
      this.companyAdministrator = obj.companyAdministrator;
    }
  }
}
