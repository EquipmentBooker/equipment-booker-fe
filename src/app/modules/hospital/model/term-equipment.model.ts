import { Equipment } from './equipment.model';
import { Term } from './term.model';

export class TermEquipment {
  id: number = 0;
  quantity: number = 0;
  equipment: Equipment = new Equipment();
  term: Term = new Term();

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.quantity = obj.quantity;
      this.equipment = obj.equipment;
      this.term = obj.term;
    }
  }
}
