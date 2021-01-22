import { IWasteData } from './../../models/wasteData.model';
import { FirebaseService } from './../../services/firebase.service';
import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {BurgerMenuComponent} from '../burger-menu/burger-menu.component';
import {BurgerDirective} from '../../models/burger.directive';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @ViewChild(BurgerDirective) burgerDir: BurgerDirective;

  wasteData: IWasteData[];

  constructor(public firebaseService: FirebaseService, private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    // this.firebaseService.setData();
    // this.firebaseService.getData().subscribe((data) => {
    //   this.wasteData = this.firebaseService.addDataToObject(data);
    // });
  }

  showBurgerMenu(): void {
    const burgerMenuFactory = this.resolver.resolveComponentFactory(BurgerMenuComponent);
    this.burgerDir.containerBurgerMenu.clear();
    const burgerComponent = this.burgerDir.containerBurgerMenu.createComponent(burgerMenuFactory);
    burgerComponent.instance.close.subscribe(() => {
      this.burgerDir.containerBurgerMenu.clear();
    });
  }
}
