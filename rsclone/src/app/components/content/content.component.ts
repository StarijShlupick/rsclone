import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
    // this.firebaseService.setData();
    this.firebaseService.getData().subscribe(data => {
      data.forEach(el => {
        console.log(el);
      });
    });
  }

}
