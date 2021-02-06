import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss', '../map/map.component.scss']
})

export class MapFilterComponent implements OnInit {
  @Input() isAllActive;
  @Input() selectAll;
  @Input() wasteTypes;
  @Input() toggleActiveLayer;
  @Input() showFilter;
  @Input() filterStatus;

  constructor() { }

  ngOnInit(): void {
  }

}
