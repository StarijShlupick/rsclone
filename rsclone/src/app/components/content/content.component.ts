import { IWasteData } from './../../models/wasteData.model';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  wasteData: IWasteData[];
  isShowAuthenticationForm = true;

  constructor(
    public firebaseService: FirebaseService,
    private authenticationService: AuthenticationService //TODO: убрать если не нужно
  ) {}

  ngOnInit(): void {
    // this.firebaseService.setData();
    this.firebaseService.getData().subscribe((data) => {
      this.wasteData = this.firebaseService.addDataToObject(data);
    });
  }

  onOpenAuthenticationForm(): void {
    this.isShowAuthenticationForm = true;
  }

  onCloseAuthenticationForm(): void {
    this.isShowAuthenticationForm = false;
  }
}
