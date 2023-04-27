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
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User | null = null;
  private userAuth = new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth) {
    console.log('Auth Service: initializing service...');
    this.auth = getAuth();

    authState(this.auth).subscribe((auth) => {
      this.userAuth.next(auth);
      this.user = auth;
    });
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
