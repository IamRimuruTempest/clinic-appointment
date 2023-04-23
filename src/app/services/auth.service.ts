import { Injectable } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

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
