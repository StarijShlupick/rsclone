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
  titleGlass = '';
  titleMetal = '';
  titleHazardous = '';
  titleLightBulb = '';
  titleThings = '';
  titleBattery = '';
  private waitChanges$: Subject<void> = new Subject();
  wasteItems: IWasteItem[];

  constructor(private translate: TranslateService) {
    this.translate
      .stream(['SECOND_SCREEN.WASTE-ITEMS.PAPER.TITLE',
        'SECOND_SCREEN.WASTE-ITEMS.PAPER.ALLOW',
        'SECOND_SCREEN.WASTE-ITEMS.PAPER.NOT-ALLOW',
        'SECOND_SCREEN.WASTE-ITEMS.PLASTIC.TITLE',
        'SECOND_SCREEN.WASTE-ITEMS.GLASS.TITLE',
        'SECOND_SCREEN.WASTE-ITEMS.METAL.TITLE',
        'SECOND_SCREEN.WASTE-ITEMS.HAZARDOUS.TITLE',
        'SECOND_SCREEN.WASTE-ITEMS.LIGHT-BULB.TITLE',
        'SECOND_SCREEN.WASTE-ITEMS.THINGS.TITLE',
        'SECOND_SCREEN.WASTE-ITEMS.BATTERY.TITLE'])
      .subscribe((translations) => {
        this.titlePaper = translations['SECOND_SCREEN.WASTE-ITEMS.PAPER.TITLE'];
        this.allowPaper = translations['SECOND_SCREEN.WASTE-ITEMS.PAPER.ALLOW'].split('; ');
        this.notAllowPaper = translations['SECOND_SCREEN.WASTE-ITEMS.PAPER.NOT-ALLOW'].split('; ');
        this.titlePlastic = translations['SECOND_SCREEN.WASTE-ITEMS.PLASTIC.TITLE'];
        this.titleGlass = translations['SECOND_SCREEN.WASTE-ITEMS.GLASS.TITLE'];
        this.titleMetal = translations['SECOND_SCREEN.WASTE-ITEMS.METAL.TITLE'];
        this.titleHazardous = translations['SECOND_SCREEN.WASTE-ITEMS.HAZARDOUS.TITLE'];
        this.titleLightBulb = translations['SECOND_SCREEN.WASTE-ITEMS.LIGHT-BULB.TITLE'];
        this.titleThings = translations['SECOND_SCREEN.WASTE-ITEMS.THINGS.TITLE'];
        this.titleBattery = translations['SECOND_SCREEN.WASTE-ITEMS.BATTERY.TITLE'];
        this.updateDisplay();
      });
  }

  updateDisplay(): void {
    this.wasteItems = [
      {
        title: this.titlePaper,
        icon: '../../assets/icons/paper.svg',
        allow: this.allowPaper,
        notAllow: this.notAllowPaper,
      },
      {
        title: this.titlePlastic,
        icon: '../../assets/icons/plastic.svg',
        allow: [
          'Plastic: PET, HDPE, LDPE, PE, PP (digital code: 1, 2, 4, 5)',
          'Boxes (yogurt, salads, kebabs)',
          'Bottles (oil, ketchup, mayonnaise)',
          'Canisters from under the water',
          'Polyethylene bags (bread, milk, cereals)',
          'Plastic bags',
          'Packing tape',
          'Styrofoam',
          'Packaging for cosmetics (shampoo, washing powder)',
        ],
        notAllow: [
          'Packaging and bags contaminated with food',
          'Polystyrene packaging (PS, digital code - 6)',
          'Combined materials (plastic + metal, paper or other types of plastic: C / PAP, C / LDPE, C / ALU, digital code from 80 to 94)',
          'Disposable tableware',
          'Stationery',
          'Tubes for toothpaste and creams (the presence of an aluminum layer inside the tube)',
          'White jars of sour cream and yogurt',
          'Candy wrappers',
          'CD discs',
          'If the item contains not only plastic (video cassettes, shaving machines), you can separate the materials yourself',
          'In case of difficulties with the type of plastic - it is better to throw the unknown plastic into the plastic container',
        ],
      },
      {
        title: this.titleGlass,
        icon: '../../assets/icons/glass.svg',
        allow: [
          'Jars and bottles (alcohol, syrup, oil) ',
          'All glass containers are recycled',
        ],
        notAllow: [
          'Bulbs ',
          'Automotive glass ',
          'Heat-resistant, wired glass ',
          'Window glass (goes to construction waste) ',
          'Mirrors ',
          'Screens of monitors and TVs ',
          'Colored glass and crystal ',
          'Faience earthenware',
        ],
      },
      {
        title: this.titleMetal,
        icon: '../../assets/icons/metal.svg',
        allow: [
          'Metal lids and plugs ',
          'Tin cans and boxes (sprats, cat food) ',
          'All types of metal',
        ],
        notAllow: [
          'Household appliances (there are special collection points for household appliances)',
        ],
      },
      {
        title: this.titleHazardous,
        icon: '../../assets/icons/hazardousWaste.svg',
        allow: [
          'Batteries',
          'Fluorescent lamps',
          'Mercury-containing thermometers',
          'Used car oil',
          'Garden chemicals',
          'Expired medications',
          'Accumulator',
          'Car tires',
          'Electrical and electronic equipments',
        ],
        notAllow: [
          'All hazardous waste must be disposed of at designated collection points',
        ],
      },
      {
        title: this.titleLightBulb,
        icon: '../../assets/icons/lightBulb.svg',
        allow: [
          'Fluorescent lamps (contain mercury vapor and inert gases)',
          'Halogen bulbs (bulbs are very hot and may cause a fire)',
          'LED lamps (have the best characteristics in terms of energy saving, operation and disposal)',
          'Incandescent lamps (safe to use)',
        ],
        notAllow: ['You can rent any lamps'],
      },
      {
        title: this.titleThings,
        icon: '../../assets/icons/things.svg',
        allow: [
          'Items for the poor are handed over to special collection points',
          'Books',
          'Furniture for recycling',
          'Аppliances',
        ],
        notAllow: ['Old clothes and shoes'],
      },
      {
        title: this.titleBattery,
        icon: '../../assets/icons/battery.svg',
        allow: [
          'Saline',
          'Alkaline',
          'Mercury',
          'Silver',
          'Lithium',
          'Nickel-cadmium',
        ],
        notAllow: [
          'Any batteries are recyclable',
          'Buy rechargeable batteries!',
        ],
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
