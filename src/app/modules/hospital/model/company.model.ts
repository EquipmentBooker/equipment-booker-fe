import { Address } from './address.model';

export class Company {
  id: number = 0;
  name: string = '';
  description: string = '';
  averageScore: number = 0;
  address: Address = new Address();

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.name = obj.name;
      this.description = obj.description;
      this.averageScore = obj.averageScore;
      this.address = obj.address;
    }
  }
}
