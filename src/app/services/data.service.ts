import { Injectable } from '@angular/core';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { UserAuth } from '../interfaces/user.model';
import { UserAccount } from '../interfaces/user-account.model';
import { Observable } from 'rxjs';

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
}
