import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {BurgerMenuComponent} from '../burger-menu/burger-menu.component';
import {BurgerDirective} from '../../models/burger.directive';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent {

  @ViewChild(BurgerDirective) burgerDir: BurgerDirective;

  constructor(private resolver: ComponentFactoryResolver) { }

  showBurgerMenu(): void {
    const burgerMenuFactory = this.resolver.resolveComponentFactory(BurgerMenuComponent);
    this.burgerDir.containerBurgerMenu.clear();
    const burgerComponent = this.burgerDir.containerBurgerMenu.createComponent(burgerMenuFactory);
    burgerComponent.instance.close.subscribe(() => {
      this.burgerDir.containerBurgerMenu.clear();
    });
  }
}
