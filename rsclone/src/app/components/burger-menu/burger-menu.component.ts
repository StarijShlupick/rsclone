import { Component, EventEmitter, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss'],
  animations: [
    trigger('menu', [
      transition('void => *', [
        style({
          left: '-400px',
        }),
        animate('250ms ease-out'),
      ]),
    ]),
    trigger('backdrop', [
      transition('void => *', [
        style({
          opacity: '0',
        }),
        animate('250ms ease-out'),
      ]),
    ]),
  ],
})
export class BurgerMenuComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  toScroll(idElement: string) {
    document.getElementById(idElement).scrollIntoView({ behavior: 'smooth' });
  }
}
