import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getData() {
    return this.db.collection('/Waste').valueChanges()
  }

  // setData() {
  //   this.item.forEach(i => {
  //     this.db.collection('/Waste').add(i);
  //   })
  // }

}
