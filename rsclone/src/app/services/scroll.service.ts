import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  activeComponent = 0;
  selectedComponent = '';
  componentsList = [
    'start-screen',
    'second-screen',
    'map-screen',
    'info-screen'
  ];

  constructor() {
  }

  toScroll(idElement: string): void {
    this.activeComponent = this.componentsList.indexOf(idElement);
    document.getElementById(idElement).scrollIntoView({behavior: 'smooth'});
  }

  wheelScroll(direction): void {
    if (direction === 'up')
    {
      this.activeComponent--;
    }
    else
    {
      this.activeComponent++;
      this.activeComponent = this.activeComponent % this.componentsList.length;
    }
    if (this.activeComponent < 0)
    {
      this.activeComponent = this.componentsList.length - 1;
    }
    this.selectedComponent = this.componentsList[this.activeComponent];
    this.toScroll(this.selectedComponent);
  }
  onSwipe(e): void {
    if (Math.abs(e.deltaY) > 40) {
      e.deltaY > 0 ? this.wheelScroll('up') : this.wheelScroll('down');
    } else {
      return;
    }
  }
}
