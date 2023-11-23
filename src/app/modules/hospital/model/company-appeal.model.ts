import { Company } from './company.model';
import { RegisteredUser } from './registered-user.model';

export class CompanyAppeal {
  id: number = 0;
  content: string = '';
  answer: string = '';
  registeredUser: RegisteredUser = new RegisteredUser();
  company: Company = new Company();

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.content = obj.content;
      this.answer = obj.answer;
      this.registeredUser = obj.registeredUser;
      this.company = obj.company;
    }
  }
}
