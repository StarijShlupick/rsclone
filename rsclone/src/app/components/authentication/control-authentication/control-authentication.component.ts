import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormState } from 'src/app/models/formControl.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-control-authentication',
  templateUrl: './control-authentication.component.html',
  styleUrls: ['./control-authentication.component.scss'],
})
export class ControlAuthenticationComponent {
  constructor(public authenticationService: AuthenticationService) {}

  @Input() isLogged: boolean;
  @Input() userEmail: boolean;
  @Input() isShowAuthenticationForm: boolean;

  @Output() onOpenAndCloseAuthenticationForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  openAuthenticationForm(): void {
    this.onOpenAndCloseAuthenticationForm.emit(FormState.Open);
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
