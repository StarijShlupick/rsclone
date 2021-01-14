import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WasteItem } from 'src/app/models/wasteItem.model';
import { WasteService } from '../../../services/waste.service';

@Component({
  selector: 'app-waste-info',
  templateUrl: './waste-info.component.html',
  styleUrls: ['./waste-info.component.scss'],
})
export class WasteInfoComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private wasteService: WasteService
  ) {}

  waste: WasteItem;

  ngOnInit(): void {
    const itemId = this.activatedRoute.snapshot.paramMap.get('id');
    this.waste = this.wasteService.getCurrentWaste(+itemId);
  }
}
