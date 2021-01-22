import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  constructor() { }
  ngOnInit(): void {
  }

}
