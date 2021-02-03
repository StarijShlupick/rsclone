import { IWasteData } from './../../models/wasteData.model';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, OnDestroy {
  wasteData: IWasteData[];
  isShowAuthenticationForm = false;
  userEmail: string;
  private subscribtion = new Subscription();
  isLogged: boolean;

  constructor(
    public firebaseService: FirebaseService,
    public authenticationService: AuthenticationService
  ) {}

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  ngOnInit(): void {
     this.firebaseService.getData().subscribe((data) => {
      this.wasteData = this.firebaseService.addDataToObject(data);
    });

    // this.subscribtion.add(
    //   this.authenticationService.isSuccessAuthentication.subscribe(
    //     () => {
    //       this.isLogged = this.getIsLoggedInfoFromService();
    //       this.updateUserEmail();
    //     }
    //   )
    // );
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
