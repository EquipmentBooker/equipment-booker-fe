import { Equipment } from '../hospital/model/equipment.model';
import { Term } from '../hospital/model/term.model';

export class ScheduleTerm {
  registeredUserId: number = 0;
  termId: number = 0;
  reservedEquipment: Equipment[] = [];

  public constructor(obj?: any) {
    if (obj) {
      this.registeredUserId = obj.registeredUserId;
      this.reservedEquipment = obj.reservedEquipment;
      this.termId = obj.termId;
    }
  }
}
