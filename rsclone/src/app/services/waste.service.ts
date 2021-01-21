import { Injectable } from '@angular/core';
import { WasteItem } from '../models/wasteItem.model';
@Injectable()
export class WasteService {
  constructor() {}

  private wasteItems: WasteItem[] = [
    {
      id: 1,
      title: 'paper',
      icon: '../../assets/icons/paper.svg',
      info: this.getTestText(),
    },
    {
      id: 2,
      title: 'plastic',
      icon: '../../assets/icons/plastic.svg',
      info: this.getTestText(),
    },
    {
      id: 3,
      title: 'glass',
      icon: '../../assets/icons/glass.svg',
      info: this.getTestText(),
    },
    {
      id: 4,
      title: 'metal',
      icon: '../../assets/icons/metal.svg',
      info: this.getTestText(),
    },
    {
      id: 5,
      title: 'Hazardous',
      icon: '../../assets/icons/hazardousWaste.svg',
      info: this.getTestText(),
    },
    {
      id: 6,
      title: 'Light Bulb',
      icon: '../../assets/icons/lightBulb.svg',
      info: this.getTestText(),
    },
    {
      id: 7,
      title: 'things',
      icon: '../../assets/icons/things.svg',
      info: this.getTestText(),
    },
    {
      id: 8,
      title: 'battery',
      icon: '../../assets/icons/battery.svg',
      info: this.getTestText(),
    },
  ];

  private getTestText(): string {
    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
    enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
     laborum.`;
  }

  public getWasteItems(): WasteItem[] {
    return this.wasteItems;
  }

  public getCurrentWaste(id: number): WasteItem {
    return this.wasteItems.find((el) => el.id === id);
  }
}
