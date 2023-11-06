import { Company } from './company.model';

export class Equipment {
  id: number = 0;
  name: string = '';
  type: string = '';
  description: string = '';
  quantity: number = 0;
  company: Company = new Company();

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.name = obj.name;
      this.type = obj.type;
      this.description = obj.description;
      this.quantity = obj.quantity;
      this.company = obj.company;
    }
  }
}
