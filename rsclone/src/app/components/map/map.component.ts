import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { WasteData } from '../../models/wasteDate.model';
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [FirebaseService]
})
export class MapComponent implements OnInit {
  wasteData: WasteData[];
  map: mapboxgl.map;
  geoJson: any;

  constructor(private FirebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.FirebaseService.getData().subscribe(items => {
      this.geoJson = this.createGeoJson(items);
      console.log(this.geoJson);
    });


    (mapboxgl as any).accessToken = environment.mapboxKey;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [27.55, 53.902],
      zoom: 10.5
    });

    this.loadMap();

    this.map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      })
    );
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  createGeoJson(data) {
    let geoJson = { 'type': 'FeatureCollection', 'features': [] };
    for (let key in data) {
      const newFeature = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [parseFloat(data[key].location.split(',')[0]), parseFloat(data[key].location.split(',')[1])]
        },
        "properties": {
          "city": data[key].city,
          "address": data[key].address,
          "title": data[key].title,
          "workingHours": data[key].workingHours,
          "phone": data[key].phone,
          "iconType": data[key].iconType,
          "type": {
            "batteries": data[key].batteries,
            "books": data[key].books,
            "cloth": data[key].cloth,
            "electronicWaste": data[key].electronicWaste,
            "glass": data[key].glass,
            "householdItems": data[key].householdItems,
            "lamps": data[key].lamps,
            "metal": data[key].metal,
            "oils": data[key].oils,
            "paper": data[key].paper,
            "plastic": data[key].plastic,
            "tires": data[key].tires,
            "wholeClothes": data[key].wholeClothes,
          }
        }
      }
      geoJson['features'].push(newFeature);
    }
    return geoJson;
  }

  loadMap(): void {
    this.map.on('load', () => {
      this.map.addSource('places', {
        "type": "geojson",
        "data": this.geoJson
      });
      this.addMarkers();
    })
  }

  addMarkers(): void {
    this.geoJson['features'].forEach((marker) => {
      const newMarker = new mapboxgl.Marker()
        .setLngLat(marker.geometry.coordinates).addTo(this.map);
    });
  }

}
