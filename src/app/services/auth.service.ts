import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async register({ email, password }: any) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (err) {
      console.log(
        '🚀 ~ file: auth.service.ts:14 ~ AuthService ~ register ~ err:',
        err
      );
      return null;
    }
  }

  async login({ email, password }: any) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (err) {
      console.log(
        '🚀 ~ file: auth.service.ts:36 ~ AuthService ~ login ~ err:',
        err
      );
      return null;
    }
  }

  async logout() {
    return await signOut(this.auth);
  }
}
