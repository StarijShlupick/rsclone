import { Injectable } from '@angular/core';
import { IWasteItem } from '../models/wasteItem.model';
@Injectable()
export class WasteService {
  constructor() {}

  private wasteItems: IWasteItem[] = [
    {
      title: 'paper',
      icon: '../../assets/icons/paper.svg',
      info: this.getTestText(),
      class: 'paper'
    },
    {
      title: 'plastic',
      icon: '../../assets/icons/plastic.svg',
      info: this.getTestText(),
      class: 'plastic'
    },
    {
      title: 'glass',
      icon: '../../assets/icons/glass.svg',
      info: this.getTestText(),
      class: 'glass'
    },
    {
      title: 'metal',
      icon: '../../assets/icons/metal.svg',
      info: this.getTestText(),
      class: 'metal'
    },
    {
      title: 'Hazardous',
      icon: '../../assets/icons/hazardousWaste.svg',
      info: this.getTestText(),
      class: 'hazardous'
    },
    {
      title: 'Light Bulb',
      icon: '../../assets/icons/lightBulb.svg',
      info: this.getTestText(),
      class: 'light'
    },
    {
      title: 'things',
      icon: '../../assets/icons/things.svg',
      info: this.getTestText(),
      class: 'things'
    },
    {
      title: 'battery',
      icon: '../../assets/icons/battery.svg',
      info: this.getTestText(),
      class: 'battery'
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

  public getWasteItems(): Array<IWasteItem> {
    return this.wasteItems;
  }

  public getCurrentWaste(title: string): IWasteItem {
    return this.wasteItems.find((el) => el.title === title);
  }
}
