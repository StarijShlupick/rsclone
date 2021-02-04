import { Component, OnInit } from '@angular/core';
import { UrlSound } from 'src/app/models/urlSound.model';
import { IWasteItem } from 'src/app/models/wasteItem.model';
import { SoundService } from 'src/app/services/sound.service';
import { WasteService } from '../../../services/waste.service';
import {ScrollService} from '../../../services/scroll.service';

@Component({
  selector: 'app-cognitive-info',
  templateUrl: './cognitive-info.component.html',
  styleUrls: ['./cognitive-info.component.scss'],
})
export class CognitiveInfoComponent implements OnInit {
  constructor(
    private wasteService: WasteService,
    private soundService: SoundService,
    public scrollService: ScrollService
  ) {}

  wasteItems: IWasteItem[] = this.wasteService.wasteItems;

  soundClick(): void {
    this.soundService.playSound(UrlSound.Primary);
  }

  ngOnInit(): void {
    this.wasteService.waitChanges.subscribe(() => {
      this.wasteItems = this.wasteService.wasteItems;
    });
  }
}
