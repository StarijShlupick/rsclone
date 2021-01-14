import { Component, OnInit } from '@angular/core';
import { WasteService } from '../../../services/waste.service';

@Component({
  selector: 'app-second-screen',
  templateUrl: './second-screen.component.html',
  styleUrls: ['./second-screen.component.scss'],
})
export class SecondScreenComponent implements OnInit {
  constructor(private wasteService: WasteService) {}

  ngOnInit(): void {}

  public wasteItems = this.wasteService.getWasteItems();
}
