import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }
  toScroll(idElement: string): void {
    document.getElementById(idElement).scrollIntoView({ behavior: 'smooth' });
  }
}
