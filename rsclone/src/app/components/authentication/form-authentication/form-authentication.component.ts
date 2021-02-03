import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {Subscription} from 'rxjs';
import {FormState, TitlesForForm} from 'src/app/models/formControl.model';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-form-authentication',
  templateUrl: './form-authentication.component.html',
  styleUrls: ['./form-authentication.component.scss'],
  animations: [
    trigger('form', [
      transition('void => *', [
        style({
          top: '0px',
          opacity: '0'
        }),
        style({
          top: '-50px',
          opacity: '1'
        }),
        animate('250ms ease-out')
      ])
    ]),
    trigger('backdrop', [
      transition('void => *', [
        style({
          opacity: '0'
        }),
        animate('250ms ease-out')
      ])
    ])
  ]
})
export class FormAuthenticationComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  authErrorMessage: string;
  isTabLogin = true;
  private subscribtions: Subscription = new Subscription();

  @Input() isShowAuthenticationForm: boolean;
  @Input() isLogged: boolean;
  @Input() userEmail: string;
  @Output() onOpenAndCloseAuthenticationForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public fb: FormBuilder,
    public authenticationService: AuthenticationService
  ) {
  }

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribtions.add(
      this.authenticationService.authErrorMessage.subscribe((errorMessage) => {
        this.authErrorMessage = errorMessage;
      })
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

  get currentTitleForElementsForm(): string {
    return this.isTabLogin ? TitlesForForm.Login : TitlesForForm.SignUp;
  }

  get email(): AbstractControl {
    return this.authForm.get('email');
  }

  get password(): AbstractControl {
    return this.authForm.get('password');
  }

  onSubmit(email: string, password: string): void {
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
    this.onOpenAndCloseAuthenticationForm.emit(FormState.Close);
  }
}
