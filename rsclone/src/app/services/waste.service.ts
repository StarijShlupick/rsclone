import {Injectable} from '@angular/core';
import {IWasteItem} from '../models/wasteItem.model';
import {TranslateService} from '@ngx-translate/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class WasteService {
  titlePaper = '';
  allowPaper = [];
  notAllowPaper = [];
  titlePlastic = '';
  allowPlastic = [];
  notAllowPlastic = [];
  titleGlass = '';
  allowGlass = [];
  notAllowGlass = [];
  titleMetal = '';
  allowMetal = [];
  notAllowMetal = [];
  titleHazardous = '';
  allowHazardous = [];
  notAllowHazardous = [];
  titleLightBulb = '';
  allowLightBulb = [];
  notAllowLightBulb = [];
  titleThings = '';
  allowThings = [];
  notAllowThings = [];
  titleBattery = '';
  allowBattery = [];
  notAllowBattery = [];
  private waitChanges$: Subject<void> = new Subject();
  wasteItems: IWasteItem[];

  constructor(private translate: TranslateService) {
    this.translate
      .stream(['SECOND_SCREEN.WASTE-ITEMS.PAPER.TITLE',
        'SECOND_SCREEN.WASTE-ITEMS.PAPER.ALLOW',
        'SECOND_SCREEN.WASTE-ITEMS.PAPER.NOT-ALLOW',
        'SECOND_SCREEN.WASTE-ITEMS.PLASTIC.TITLE',
        'SECOND_SCREEN.WASTE-ITEMS.PLASTIC.ALLOW',
        'SECOND_SCREEN.WASTE-ITEMS.PLASTIC.NOT-ALLOW',
        'SECOND_SCREEN.WASTE-ITEMS.GLASS.TITLE',
        'SECOND_SCREEN.WASTE-ITEMS.GLASS.ALLOW',
        'SECOND_SCREEN.WASTE-ITEMS.GLASS.NOT-ALLOW',
        'SECOND_SCREEN.WASTE-ITEMS.METAL.TITLE',
        'SECOND_SCREEN.WASTE-ITEMS.METAL.ALLOW',
        'SECOND_SCREEN.WASTE-ITEMS.METAL.NOT-ALLOW',
        'SECOND_SCREEN.WASTE-ITEMS.HAZARDOUS.TITLE',
        'SECOND_SCREEN.WASTE-ITEMS.HAZARDOUS.ALLOW',
        'SECOND_SCREEN.WASTE-ITEMS.HAZARDOUS.NOT-ALLOW',
        'SECOND_SCREEN.WASTE-ITEMS.LIGHT-BULB.TITLE',
        'SECOND_SCREEN.WASTE-ITEMS.LIGHT-BULB.ALLOW',
        'SECOND_SCREEN.WASTE-ITEMS.LIGHT-BULB.NOT-ALLOW',
        'SECOND_SCREEN.WASTE-ITEMS.THINGS.TITLE',
        'SECOND_SCREEN.WASTE-ITEMS.THINGS.ALLOW',
        'SECOND_SCREEN.WASTE-ITEMS.THINGS.NOT-ALLOW',
        'SECOND_SCREEN.WASTE-ITEMS.BATTERY.TITLE',
        'SECOND_SCREEN.WASTE-ITEMS.BATTERY.ALLOW',
        'SECOND_SCREEN.WASTE-ITEMS.BATTERY.NOT-ALLOW'])
      .subscribe((translations) => {
        this.titlePaper = translations['SECOND_SCREEN.WASTE-ITEMS.PAPER.TITLE'];
        this.allowPaper = translations['SECOND_SCREEN.WASTE-ITEMS.PAPER.ALLOW'].split('; ');
        this.notAllowPaper = translations['SECOND_SCREEN.WASTE-ITEMS.PAPER.NOT-ALLOW'].split('; ');
        this.titlePlastic = translations['SECOND_SCREEN.WASTE-ITEMS.PLASTIC.TITLE'];
        this.allowPlastic = translations['SECOND_SCREEN.WASTE-ITEMS.PLASTIC.ALLOW'].split('; ');
        this.notAllowPlastic = translations['SECOND_SCREEN.WASTE-ITEMS.PLASTIC.NOT-ALLOW'].split('; ');
        this.titleGlass = translations['SECOND_SCREEN.WASTE-ITEMS.GLASS.TITLE'];
        this.allowGlass = translations['SECOND_SCREEN.WASTE-ITEMS.GLASS.ALLOW'].split('; ');
        this.notAllowGlass = translations['SECOND_SCREEN.WASTE-ITEMS.GLASS.NOT-ALLOW'].split('; ');
        this.titleMetal = translations['SECOND_SCREEN.WASTE-ITEMS.METAL.TITLE'];
        this.allowMetal = translations['SECOND_SCREEN.WASTE-ITEMS.METAL.ALLOW'].split('; ');
        this.notAllowMetal = translations['SECOND_SCREEN.WASTE-ITEMS.METAL.NOT-ALLOW'].split('; ');
        this.titleHazardous = translations['SECOND_SCREEN.WASTE-ITEMS.HAZARDOUS.TITLE'];
        this.allowHazardous = translations['SECOND_SCREEN.WASTE-ITEMS.HAZARDOUS.ALLOW'].split('; ');
        this.notAllowHazardous = translations['SECOND_SCREEN.WASTE-ITEMS.HAZARDOUS.NOT-ALLOW'].split('; ');
        this.titleLightBulb = translations['SECOND_SCREEN.WASTE-ITEMS.LIGHT-BULB.TITLE'];
        this.allowLightBulb = translations['SECOND_SCREEN.WASTE-ITEMS.LIGHT-BULB.ALLOW'].split('; ');
        this.notAllowLightBulb = translations['SECOND_SCREEN.WASTE-ITEMS.LIGHT-BULB.NOT-ALLOW'].split('; ');
        this.titleThings = translations['SECOND_SCREEN.WASTE-ITEMS.THINGS.TITLE'];
        this.allowThings = translations['SECOND_SCREEN.WASTE-ITEMS.THINGS.ALLOW'].split('; ');
        this.notAllowThings = translations['SECOND_SCREEN.WASTE-ITEMS.THINGS.NOT-ALLOW'].split('; ');
        this.titleBattery = translations['SECOND_SCREEN.WASTE-ITEMS.BATTERY.TITLE'];
        this.allowBattery = translations['SECOND_SCREEN.WASTE-ITEMS.BATTERY.ALLOW'].split('; ');
        this.notAllowBattery = translations['SECOND_SCREEN.WASTE-ITEMS.BATTERY.NOT-ALLOW'].split('; ');
        this.updateDisplay();
      });
  }

  updateDisplay(): void {
    this.wasteItems = [
      {
        title: this.titlePaper,
        icon: '../../assets/icons/paper.svg',
        class: 'paper',
        allow: this.allowPaper,
        notAllow: this.notAllowPaper,
      },
      {
        title: this.titlePlastic,
        icon: '../../assets/icons/plastic.svg',
        class: 'plastic',
        allow: this.allowPlastic,
        notAllow: this.notAllowPlastic,
      },
      {
        title: this.titleGlass,
        icon: '../../assets/icons/glass.svg',
        class: 'glass',
        allow: this.allowGlass,
        notAllow: this.notAllowGlass,
      },
      {
        title: this.titleMetal,
        icon: '../../assets/icons/metal.svg',
        class: 'metal',
        allow: this.allowMetal,
        notAllow: this.notAllowMetal,
      },
      {
        title: this.titleHazardous,
        icon: '../../assets/icons/hazardousWaste.svg',
        class: 'hazardous',
        allow: this.allowHazardous,
        notAllow: this.notAllowHazardous,
      },
      {
        title: this.titleLightBulb,
        icon: '../../assets/icons/lightBulb.svg',
        class: 'light',
        allow: this.allowLightBulb,
        notAllow: this.notAllowLightBulb,
      },
      {
        title: this.titleThings,
        icon: '../../assets/icons/things.svg',
        class: 'things',
        allow: this.allowThings,
        notAllow: this.notAllowThings,
      },
      {
        title: this.titleBattery,
        icon: '../../assets/icons/battery.svg',
        class: 'battery',
        allow: this.allowBattery,
        notAllow: this.notAllowBattery,
      },
    ];
    this.waitChanges$.next();
  }

  get waitChanges(): Observable<void> {
    return this.waitChanges$.asObservable();
  }

  public getCurrentWaste(title: string): IWasteItem {
    return this.wasteItems.find((el: IWasteItem) => el.title === title);
  }
}
