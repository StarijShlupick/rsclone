import { Component, OnInit } from '@angular/core';
import { WasteService } from '../../../services/waste.service';
import { WasteItem } from '../../../models/wasteItem.model';

@Component({
  selector: 'app-second-screen',
  templateUrl: './second-screen.component.html',
  styleUrls: ['./second-screen.component.scss'],
})
export class SecondScreenComponent implements OnInit {

  wasteItems: WasteItem[];
  constructor(private wasteService: WasteService) { }

  ngOnInit(): void {
    this.wasteItems = this.wasteService.getWasteItems();
   }
}
