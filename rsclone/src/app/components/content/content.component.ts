import { IWasteData } from './../../models/wasteData.model';
import { FirebaseService } from './../../services/firebase.service';
import {Component, Inject, OnInit} from '@angular/core';
import {EScrollDirection, ScrollService} from '../../services/scroll.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  wasteData: IWasteData[];
  userEmail: string;
  menuButton = true;
  scrollDelay = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public firebaseService: FirebaseService,
    public scrollService: ScrollService
  ) {
    this.document.addEventListener('wheel', this.onContentScrolled.bind(this), { passive: false });
  }

  ngOnInit(): void {
    // this.firebaseService.getData().subscribe((data) => {
    //   this.wasteData = this.firebaseService.addDataToObject(data);
    // });
  }

  onContentScrolled(e): void {
    e.preventDefault();
    if (this.scrollDelay) { return; }
    this.scrollDelay = true;
    setTimeout(() => {this.scrollDelay = false; }, 500);
    let delta;
    if (e.wheelDelta){
      delta = e.wheelDelta;
    }else{
      delta = -1 * e.deltaY;
    }
    if (delta < 0){
      this.scrollService.wheelScroll('up');
    }else if (delta > 0){
      this.scrollService.wheelScroll('down');
    }
  }

  toggleMenuButton(): void{
    this.menuButton = !this.menuButton;
  }
}
