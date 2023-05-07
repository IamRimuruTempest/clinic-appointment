import { Injectable } from '@angular/core';
import {
  Auth,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { User } from '@angular/fire/auth';
import { docData, Firestore } from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { UserAccount } from '../interfaces/user-account.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;
  private userAuth = new BehaviorSubject<User | null>(null);
  public userAccount$ = new Observable<UserAccount | null>;

  constructor(private auth: Auth, private firestore: Firestore) {
    console.log('Auth Service: initializing service...');
    this.auth = getAuth();

    authState(this.auth).subscribe((auth) => {
      this.userAuth.next(auth);
      this.user = auth;
    });

    // Get details of logged in user from firerstore
    this.userAccount$ = this.userAuth.pipe(
      switchMap(user => this.getUser(user?.uid))
      )
  }

  private getUser(uid: string | undefined) {
    const userAccountRef = doc(this.firestore, `users/${uid}`);
    return docData(userAccountRef, {idField: 'uid'}) as Observable<UserAccount>;
  }

  async isLoggedIn() {
    return !!this.user;
  }

  async register(email: string, password: string): Promise<UserCredential> {
    const user = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return user;
  }

  async login(email: string, password: string): Promise<UserCredential> {
    const user = await signInWithEmailAndPassword(this.auth, email, password);
    return user;
  }

  async logout() {
    return await signOut(this.auth);
  }
}
