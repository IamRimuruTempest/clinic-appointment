import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  docData,
  setDoc,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { UserAuth } from '../interfaces/user.model';
import { UserAccount } from '../interfaces/user-account.model';
import { Appointment } from '../interfaces/appointment.model';
import { Observable } from 'rxjs';
import { collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  async addUser(user: UserAccount) {
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return setDoc(userDocRef, { ...user });
  }

  getUser(uid: string): Observable<UserAccount> {
    const accountDocRef = doc(this.firestore, `users/${uid}`);
    return docData(accountDocRef, {
      idField: 'uid',
    }) as Observable<UserAccount>;
  }

  async addAppontment(appointment: Appointment) {
    const appointmentDocRef = collection(this.firestore, 'appointments/');
    return addDoc(appointmentDocRef, appointment);
  }

  getAppointments() {
    const appointmentsRef = collection(this.firestore, 'appointments');
    return collectionData(appointmentsRef);
  }

  getUserAppointments(uid: string): Observable<Appointment> {
    const userAppointmentsDocRef = doc(this.firestore, `appointments/${uid}`);
    return docData(userAppointmentsDocRef, {
      idField: 'id',
    }) as Observable<Appointment>;
  }

  getAppointmentsById(uid: string): Observable<Appointment> {
    const appointmentDocRef = doc(this.firestore, `appointments/${uid}`);
    return docData(appointmentDocRef, {
      idField: 'uid',
    }) as Observable<Appointment>;
  }
}
