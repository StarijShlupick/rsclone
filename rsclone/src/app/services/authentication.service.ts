import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private errorMessage$ = new BehaviorSubject('');
  private isSuccessAuthentication$ = new Subject<boolean>();

  constructor(public firebaseAuth: AngularFireAuth) {}

  async login(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.errorMessage$.next('');
        this.isSuccessAuthentication$.next(true);
      })
      .catch((error) => {
        this.errorMessage$.next(error.message);
      });
  }

  async signUp(email: string, password: string) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.errorMessage$.next('');
        this.isSuccessAuthentication$.next(true);
      })
      .catch((error) => {
        this.errorMessage$.next(error.message);
      });
  }

  get authErrorMessage(): Observable<string> {
    return this.errorMessage$.asObservable();
  }

  get isSuccessAuthentication(): Observable<boolean> {
    return this.isSuccessAuthentication$.asObservable();
  }

  get isLogged(): boolean {
    return localStorage.getItem('user') !== null;
  }

  get userEmail(): string {
    return JSON.parse(localStorage.getItem('user')).email;
  }

  logout(): void {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.isSuccessAuthentication$.next(false);
  }
}
