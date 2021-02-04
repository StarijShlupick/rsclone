import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlSound } from 'src/app/models/urlSound.model';
import { IWasteItem } from 'src/app/models/wasteItem.model';
import { SoundService } from 'src/app/services/sound.service';
import { WasteService } from '../../../services/waste.service';
import {ScrollService} from '../../../services/scroll.service';

@Component({
  selector: 'app-waste-info',
  templateUrl: './waste-info.component.html',
  styleUrls: ['./waste-info.component.scss'],
})
export class WasteInfoComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private wasteService: WasteService,
    private soundService: SoundService,
    public scrollService: ScrollService
  ) {}

  waste: IWasteItem;

  ngOnInit(): void {
    const itemTitle = this.activatedRoute.snapshot.paramMap.get('title');
    this.waste = this.wasteService.getCurrentWaste(itemTitle);
  }

  soundClick(): void {
    this.soundService.playSound(UrlSound.Secondary);
  }
}
