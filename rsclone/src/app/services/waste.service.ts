import { Injectable } from '@angular/core';

export interface WasteItem {
  id: number;
  title: string;
  icon: string;
  info: string;
}

@Injectable()
export class WasteService {
  constructor() {}

  private wasteItems: WasteItem[] = [
    {
      id: 1,
      title: 'paper',
      icon: '../../assets/paper.svg',
      info: this.getTestText(),
    },
    {
      id: 2,
      title: 'plastic',
      icon: '../../assets/plastic.svg',
      info: this.getTestText(),
    },
    {
      id: 3,
      title: 'glass',
      icon: '../../assets/glass.svg',
      info: this.getTestText(),
    },
    {
      id: 4,
      title: 'metal',
      icon: '../../assets/metal.svg',
      info: this.getTestText(),
    },
    {
      id: 5,
      title: 'Hazardous',
      icon: '../../assets/hazardousWaste.svg',
      info: this.getTestText(),
    },
    {
      id: 6,
      title: 'Light Bulb',
      icon: '../../assets/lightBulb.svg',
      info: this.getTestText(),
    },
    {
      id: 7,
      title: 'things',
      icon: '../../assets/things.svg',
      info: this.getTestText(),
    },
    {
      id: 8,
      title: 'battery',
      icon: '../../assets/battery.svg',
      info: this.getTestText(),
    },
  ];

  private getTestText() {
    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
    enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 
     laborum.`;
  }

  public getWasteItems(): Array<WasteItem> {
    return this.wasteItems;
  }

  public getCurrentWaste(id: number) {
    return this.wasteItems.find((el) => el.id === id);
  }
}
