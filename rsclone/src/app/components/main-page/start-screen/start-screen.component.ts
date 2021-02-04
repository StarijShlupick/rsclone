import {Component, OnDestroy, OnInit} from '@angular/core';
import {IWasteData} from '../../../models/wasteData.model';
import {Subscription} from 'rxjs';
import {FirebaseService} from '../../../services/firebase.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {ScrollService} from '../../../services/scroll.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit, OnDestroy {
  wasteData: IWasteData[];
  isShowAuthenticationForm = false;
  userEmail: string;
  private subscribtion = new Subscription();
  isLogged: boolean;

  constructor(
    public firebaseService: FirebaseService,
    public authenticationService: AuthenticationService,
    public scrollService: ScrollService
  ) {}

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
