import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

const enum TitlesForForm {
  Login = 'Login',
  SignUp = 'Sign Up',
}

@Component({
  selector: 'app-form-authentication',
  templateUrl: './form-authentication.component.html',
  styleUrls: ['./form-authentication.component.scss'],
})
export class FormAuthenticationComponent implements OnInit {
  authForm: FormGroup;
  authErrorMessage: string;
  isTabLogin = true;
  isSuccessAuthentication = false;
  userEmail: string;

  @Input() isShowAuthenticationForm: Boolean;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authenticationService.authErrorMessage.subscribe((errorMessage) => {
      this.authErrorMessage = errorMessage;
    });
    this.authenticationService.isSuccessAuthentication.subscribe(
      (isSuccessAuthentication) => {
        this.isSuccessAuthentication = isSuccessAuthentication;

        if (isSuccessAuthentication) {
          this.getUserEmail();
        }
      }
    );

    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/[A-z0-9]/),
          Validators.minLength(8),
        ],
      ],
    });
  }

  onChangeTab(): void {
    this.isTabLogin = !this.isTabLogin;
  }

  getUserEmail(): void {
    this.userEmail = this.authenticationService.userEmail;
  }

  get currentTitleForElementsForm(): string {
    return this.isTabLogin ? TitlesForForm.Login : TitlesForForm.SignUp;
  }

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }

  async onSubmit(email: string, password: string) {
    if (this.authForm.invalid) {
      const controls = this.authForm.controls;
      Object.keys(controls).forEach((control) =>
        controls[control].markAsTouched()
      );
      return;
    }

    this.isTabLogin
      ? this.authenticationService.login(email, password)
      : this.authenticationService.signUp(email, password);
  }

  onCloseAuthenticationForm(): void {
    this.isShowAuthenticationForm = false;
  }
}
