import { Equipment } from '../hospital/model/equipment.model';
import { PredefinedTerm } from '../hospital/model/predefined-term.model';

export class SchedulePredefinedTerm {
  registeredUserId: number = 0;
  reservedEquipment: Equipment[] = [];
  predefinedTerm: PredefinedTerm = new PredefinedTerm();

  public constructor(obj?: any) {
    if (obj) {
      this.registeredUserId = obj.registeredUserId;
      this.reservedEquipment = obj.reservedEquipment;
      this.predefinedTerm = obj.predefinedTerm;
    }
  }
}
