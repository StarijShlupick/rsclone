import { IWasteData } from './../../models/wasteData.model';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  wasteData: IWasteData[];

  constructor(public firebaseService: FirebaseService) {}

  isShowAuthenticationForm = true;

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
