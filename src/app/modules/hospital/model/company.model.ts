import { Address } from './address.model';
import { Equipment } from './equipment.model';

export class Company {
  id: number = 0;
  name: string = '';
  description: string = '';
  averageScore: number = 0;
  startTime: Date = new Date();
  endTime: Date = new Date();
  address: Address = new Address();
  equipment: Equipment[] = [];
  startTimeString: string = '';
  endTimeString: string = '';

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.name = obj.name;
      this.description = obj.description;
      this.averageScore = obj.averageScore;
      this.address = obj.address;
      this.equipment = obj.equipment;
      this.startTimeString = obj.startTimeString;
      this.endTimeString = obj.endTimeString;
    }
  }
}
