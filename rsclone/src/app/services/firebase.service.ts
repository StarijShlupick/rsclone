import { WasteData } from './../models/wasteData.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getData():  Observable<{}> {
    return this.db.collection('/Waste').valueChanges();
  }

  addDataToObject(data): WasteData[] {
    const wasteData: WasteData[] = data.map(el => {
      return {
        address: el["address"],
        batteries: el["batteries"],
        electronicWaste: el["electronicWaste"],
        glass: el["glass"],
        iconType: el["iconType"],
        location: el["location"],
        metal: el["metal"],
        phone: el["phone"],
        plastic: el["plastic"],
        tires: el["tires"],
        title: el["title"],
        paper: el["paper"],
        workingHours: el["workingHours"],
        cloth: el["cloth"],
        lamps: el["lamps"],
        oils: el["oils"],
        books: el["books"],
        householdItems: el["householdItems"],
        wholeClothes: el["wholeClothes"],
        city: el["city"]
      }
    });
    return wasteData;
  }

  // setData() {
  //   this.item.forEach(i => {
  //     this.db.collection('/Waste').add(i);
  //   })
  // }

}
