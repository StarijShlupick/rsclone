import { Component } from '@angular/core';
import { WasteService } from '../../../services/waste.service';

@Component({
  selector: 'app-cognitive-info',
  templateUrl: './cognitive-info.component.html',
  styleUrls: ['./cognitive-info.component.scss'],
})
export class CognitiveInfoComponent {
  constructor(private wasteService: WasteService) {}

  wasteItems = this.wasteService.getWasteItems();
}
