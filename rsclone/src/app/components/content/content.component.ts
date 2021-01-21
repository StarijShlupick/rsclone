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
  isLogged = this.getIsLoggedInfoFromService();

  constructor(
    public firebaseService: FirebaseService,
    public authenticationService: AuthenticationService
  ) {}

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  ngOnInit(): void {
    // this.firebaseService.setData();
    this.updateUserEmail();

    this.firebaseService.getData().subscribe((data) => {
      this.wasteData = this.firebaseService.addDataToObject(data);
    });

    this.subscribtion.add(
      this.authenticationService.isSuccessAuthentication.subscribe(
        (isSuccessAuthentication) => {
          this.isLogged = isSuccessAuthentication;
          if (isSuccessAuthentication) {
            this.updateUserEmail();
          } else {
            this.deleteUserEmail();
          }
        }
      )
    );
  }

  updateUserEmail(): void {
    this.userEmail = this.authenticationService.userEmail;
  }

  deleteUserEmail(): void {
    this.userEmail = '';
  }

  getIsLoggedInfoFromService(): boolean {
    return this.authenticationService.isLogged;
  }

  onOpenAuthenticationForm(): void {
    this.isShowAuthenticationForm = true;
  }

  onCloseAuthenticationForm(): void {
    this.isShowAuthenticationForm = false;
  }
}
