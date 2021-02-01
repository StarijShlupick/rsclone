import { Injectable } from '@angular/core';
import { IWasteItem } from '../models/wasteItem.model';
@Injectable()
export class WasteService {
  constructor() {}

  private wasteItems: IWasteItem[] = [
    {
      title: 'paper',
      icon: '../../assets/icons/paper.svg',
      class: 'paper',
      allow: [
        'Newspapers, magazines',
        'Catalogs, promotional materials',
        'Notebooks',
        'Envelopes without cellophane and inserts',
        'Old books',
        'Cardboard boxes (from furniture, TV, toys)',
        'Wrapping paper and other blank paper',
        'Paper bags (flour, buckwheat, rice)',
      ],
      notAllow: [
        'Paper contaminated with food and grease residues',
        'Paper with staples, staples, tape, adhesive and plastic inserts, springs',
        'Thermal paper (faxes, checks)',
        'Laminated paper products, photo paper',
        'Wallpaper',
        'Matchboxes',
        'Food packaging supplemented with a layer of plastic or foil',
      ]
    },
    {
      title: 'plastic',
      icon: '../../assets/icons/plastic.svg',
      class: 'plastic',
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
      ]
    },
    {
      title: 'glass',
      icon: '../../assets/icons/glass.svg',
      class: 'glass',
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
      ]
    },
    {
      title: 'metal',
      icon: '../../assets/icons/metal.svg',
      class: 'metal',
      allow: [
        'Metal lids and plugs ',
        'Tin cans and boxes (sprats, cat food) ',
        'All types of metal',
      ],
      notAllow: [
        'Household appliances (there are special collection points for household appliances)',
      ]
    },
    {
      title: 'Hazardous',
      icon: '../../assets/icons/hazardousWaste.svg',
      class: 'hazardous',
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
      ]
    },
    {
      title: 'Light Bulb',
      icon: '../../assets/icons/lightBulb.svg',
      class: 'light',
      allow: [
        'Fluorescent lamps (contain mercury vapor and inert gases)',
        'Halogen bulbs (bulbs are very hot and may cause a fire)',
        'LED lamps (have the best characteristics in terms of energy saving, operation and disposal)',
        'Incandescent lamps (safe to use)',
      ],
      notAllow: ['You can rent any lamps']
    },
    {
      title: 'things',
      icon: '../../assets/icons/things.svg',
      class: 'things',
      allow: [
        'Items for the poor are handed over to special collection points',
        'Books',
        'Furniture for recycling',
        'Аppliances',
      ],
      notAllow: ['Old clothes and shoes']
    },
    {
      title: 'battery',
      icon: '../../assets/icons/battery.svg',
      class: 'battery',
      allow: [
        'Saline',
        'Alkaline',
        'Mercury',
        'Silver',
        'Lithium',
        'Nickel-cadmium',
      ],
      notAllow: ['Any batteries are recyclable', 'Buy rechargeable batteries!']
    },
  ];

  public getWasteItems(): Array<IWasteItem> {
    return this.wasteItems;
  }

  public getCurrentWaste(title: string): IWasteItem {
    return this.wasteItems.find((el) => el.title === title);
  }
}
