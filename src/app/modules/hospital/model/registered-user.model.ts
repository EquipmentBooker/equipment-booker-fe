import { Address } from './address.model';

export class RegisteredUser {
  id: number = 0;
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  phoneNumber: string = '';
  profession: string = '';
  companyInfo: string = '';
  confirmationToken: string = '';
  activated: boolean = false;
  address: Address = new Address();
  penalties: number = 0;

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
      this.address = obj.address;
      this.penalties = obj.penalties;
    }
  }
}
