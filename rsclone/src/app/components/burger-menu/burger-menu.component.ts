import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {FirebaseService} from '../../services/firebase.service';
import {AuthenticationService} from '../../services/authentication.service';
import {ScrollService} from '../../services/scroll.service';


@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss'],
  animations: [
    trigger('menu', [
      transition('void => *', [
        style({
          left: '-400px',
        }),
        animate('250ms ease-out'),
      ]),
    ]),
    trigger('backdrop', [
      transition('void => *', [
        style({
          opacity: '0',
        }),
        animate('250ms ease-out'),
      ]),
    ]),
  ],
})
export class BurgerMenuComponent implements OnInit, OnDestroy {
  isShowAuthenticationForm = false;
  userEmail: string;
  private subscribtion = new Subscription();
  isLogged: boolean;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public firebaseService: FirebaseService,
    public authenticationService: AuthenticationService,
    public scrollService: ScrollService
  ) {
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribtion.add(
      this.authenticationService.isSuccessAuthentication.subscribe(
        () => {
          this.isLogged = this.getIsLoggedInfoFromService();
          this.updateUserEmail();
        }
      )
    );
  }

  updateUserEmail(): void {
    this.userEmail = this.authenticationService.userEmail;
  }

  getIsLoggedInfoFromService(): boolean {
    return this.authenticationService.isLogged;
  }

  onOpenAndCloseAuthenticationForm(isOpen: boolean): void {
    this.isShowAuthenticationForm = isOpen;
  }
}
