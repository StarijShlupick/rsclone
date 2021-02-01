import { Component, OnInit } from '@angular/core';
import { UrlSound } from 'src/app/models/urlSound.model';
import { SoundService } from 'src/app/services/sound.service';
import { WasteService } from '../../../services/waste.service';

@Component({
  selector: 'app-cognitive-info',
  templateUrl: './cognitive-info.component.html',
  styleUrls: ['./cognitive-info.component.scss'],
})
export class CognitiveInfoComponent implements OnInit {
  constructor(
    private wasteService: WasteService,
    private soundService: SoundService
  ) {}

  wasteItems = this.wasteService.wasteItems;

  soundClick(): void {
    this.soundService.playSound(UrlSound.Primary);
  }

  ngOnInit(): void {
    this.wasteService.wasteItems.subscribe((e) => {
      this.wasteItems = e;
    });
  }
}
