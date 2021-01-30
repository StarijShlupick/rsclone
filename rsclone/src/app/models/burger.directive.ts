import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appBurgerMenu]'
})
export class BurgerDirective {
  constructor(public containerBurgerMenu: ViewContainerRef) {
  }
}
