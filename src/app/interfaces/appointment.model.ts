import { Timestamp } from '@angular/fire/firestore';
import { Service } from './service.model';

export interface Appointment {
  id?: string;
  uid?: string;
  fullName: string;
  age: number;
  gender: string;
  time: string;
  schedule: string;
  service: Service;
  condition: string;
  status: string;
  timestamp: Timestamp;
}
