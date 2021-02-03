import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private errorMessage$: BehaviorSubject<string> = new BehaviorSubject('');
  private isSuccessAuthentication$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  constructor(public firebaseAuth: AngularFireAuth) {}

  async login(email: string, password: string): Promise<void> {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.authenticateUser(response.user);
      })
      .catch((error) => {
        this.sendErrorMessage(error.message);
      });
  }

  async signUp(email: string, password: string): Promise<void> {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        this.authenticateUser(response.user);
      })
      .catch((error) => {
        this.sendErrorMessage(error.message);
      });
  }

  authenticateUser(user: object): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.errorMessage$.next('');
    this.isSuccessAuthentication$.next(true);
  }

  sendErrorMessage(message: string): void {
    this.errorMessage$.next(message);
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
    return this.isLogged ? JSON.parse(localStorage.getItem('user')).email : '';
  }

  logout(): void {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.isSuccessAuthentication$.next(false);
  }
}
