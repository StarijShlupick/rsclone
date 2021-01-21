import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authErrorMessage = new BehaviorSubject('');
  isSuccessAuthentication = new BehaviorSubject(false);

  constructor(public firebaseAuth: AngularFireAuth) {}

  async login(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.authErrorMessage.next('');
        this.isSuccessAuthentication.next(true);
      })
      .catch((error) => {
        this.authErrorMessage.next(error.message);
      });
  }

  async signUp(email: string, password: string) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.authErrorMessage.next('');
        this.isSuccessAuthentication.next(true);
      })
      .catch((error) => {
        this.authErrorMessage.next(error.message);
      });
  }

  get isLogged(): Boolean {
    return localStorage.getItem('user') !== null;
  }

  get userEmail(): string {
    return JSON.parse(localStorage.getItem('user')).email;
  }

  logout(): void {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.isSuccessAuthentication.next(false);
  }
}
