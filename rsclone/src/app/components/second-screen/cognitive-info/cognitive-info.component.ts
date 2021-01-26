import { Component } from '@angular/core';
import { SoundService } from 'src/app/services/sound.service';
import { WasteService } from '../../../services/waste.service';

@Component({
  selector: 'app-cognitive-info',
  templateUrl: './cognitive-info.component.html',
  styleUrls: ['./cognitive-info.component.scss'],
})
export class CognitiveInfoComponent {
  constructor(
    private wasteService: WasteService,
    private soundService: SoundService
  ) {}

  wasteItems = this.wasteService.getWasteItems();

  soundClick(): void {
    this.soundService.soundClickPrimary();
  }
}
