import { Timestamp } from '@angular/fire/firestore';
import { Inventory } from './inventory.model';

export interface Order {
  id?: string;
  account: any;
  timestamp: Timestamp;
  order: Array<Inventory>;
  status: string;
}
