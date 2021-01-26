import { Input, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-new-object-form',
  templateUrl: './new-object-form.component.html',
  styleUrls: ['./new-object-form.component.scss']
})
export class NewObjectFormComponent implements OnInit {

  latitude: number;
  longitude: number;

  @Input() formOpend: boolean;
  @Input() map: mapboxgl.Map;

  @Output() addNewObject = new EventEmitter<object>();
  @ViewChild('f', { static: false }) newObjectForm: NgForm;
  @Output() closeForm = new EventEmitter();

  ngOnInit(): void {
    this.onMapClick();
  }

  onCloseForm(): void {
    this.closeForm.emit(null);
  }

  onMapClick(): void {
    this.map.on('click', function (e) {
      this.latitude = e.lngLat.lat;
      this.longitude = e.lngLat.lng;

      this.newObjectForm.setValue({
        name: null,
        type: null,
        x: e.lngLat.lat,
        y: e.lngLat.lng,
        address: null,
        phone: null,
        schedule: null,
        information: null,
        email: null
      });
    });
  }
}
