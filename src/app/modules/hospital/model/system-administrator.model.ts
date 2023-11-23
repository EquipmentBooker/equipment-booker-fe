import { Address } from './address.model';

export class SystemAdministrator {
  id: number = 0;
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  phoneNumber: string = '';
  profession: string = '';
  companyInfo: string = '';
  activated: boolean = false;
  address: Address = new Address();

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.name = obj.name;
      this.surname = obj.surname;
      this.email = obj.email;
      this.password = obj.password;
      this.phoneNumber = obj.phoneNumber;
      this.profession = obj.profession;
      this.companyInfo = obj.companyInfo;
      this.activated = obj.activated;
      this.address = obj.address;
    }
  }
}
