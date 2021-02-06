import { INewCollectionPoint } from './../models/newСollectionPoint.model';
import { IWasteData } from './../models/wasteData.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getData(): Observable<IWasteData[]> {
    return this.db.collection<IWasteData>('/WasteFull').valueChanges();
  }

  addDataToObject(data: IWasteData[]): IWasteData[] {
    return data.map(el => {
      return {
        addressRu: el.addressRu,
        addressEn: el.addressEn,
        addressBy: el.addressBy,
        batteries: el.batteries,
        electronicWaste: el.electronicWaste,
        glass: el.glass,
        iconType: el.iconType,
        location: el.location,
        metal: el.metal,
        phone: el.phone,
        plastic: el.plastic,
        tires: el.tires,
        titleRu: el.titleRu,
        titleEn: el.titleEn,
        titleBy: el.titleBy,
        paper: el.paper,
        workingHoursRu: el.workingHoursRu,
        workingHoursEn: el.workingHoursEn,
        workingHoursBy: el.workingHoursBy,
        cloth: el.cloth,
        lamps: el.lamps,
        oils: el.oils,
        books: el.books,
        householdItems: el.householdItems,
        wholeClothes: el.wholeClothes,
        city: el.city
      };
    });
  }

  setData(data: INewCollectionPoint): void {
    this.db.collection<INewCollectionPoint>('/NewObjects').add(data);
  }
}
