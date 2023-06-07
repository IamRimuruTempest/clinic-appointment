import { Timestamp } from '@angular/fire/firestore';

export interface InventoryHistory {
  id?: string;
  timestamp: Timestamp;
  quantity: number;
  ending_quantity: number;
}
