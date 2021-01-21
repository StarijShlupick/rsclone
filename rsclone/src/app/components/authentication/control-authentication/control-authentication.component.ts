import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-control-authentication',
  templateUrl: './control-authentication.component.html',
  styleUrls: ['./control-authentication.component.scss'],
})
export class ControlAuthenticationComponent implements OnInit {
  constructor(public authenticationService: AuthenticationService) {}

  @Input() isLogged: boolean;
  @Input() userEmail: boolean;
  @Input() isShowAuthenticationForm: boolean;

  @Output() onOpenAuthenticationForm = new EventEmitter();

  ngOnInit(): void {}

  openAuthenticationForm(): void {
    this.onOpenAuthenticationForm.emit(null);
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
