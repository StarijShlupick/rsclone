import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { environment } from '../../../environments/environment';
import { WasteData } from '../../models/wasteDate.model';
import { Cities } from '../../models/mapData.model';
import { ICollectionsGeoJSON } from '../../models/mapData.model';
import { IGeoJson } from '../../models/mapData.model';
import { CitiesGeoJson } from '../../models/mapData.model';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  wasteData: WasteData[];
  map: mapboxgl.map;
  geoJson: ICollectionsGeoJSON;
  selectedCity: string;
  cities: Cities[] = [
    { value: 'city-1', viewValue: 'Minsk' },
    { value: 'city-2', viewValue: 'Vitebsk' },
    { value: 'city-3', viewValue: 'Grodno' },
    { value: 'city-4', viewValue: 'Mogilev' },
    { value: 'city-5', viewValue: 'Brest' },
    { value: 'city-6', viewValue: 'Gomel' },
  ]

  constructor(private FirebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.FirebaseService.getData().subscribe(items => {
      this.geoJson = this.createGeoJson(items);

      (mapboxgl as any).accessToken = environment.mapboxKey;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [27.55, 53.902],
        zoom: 10.5
      });
      this.loadMap();
    });
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

      this.map.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl
        })
      );
      this.map.addControl(new mapboxgl.NavigationControl());
    })
  }

  addMarkers(): void {
    this.geoJson['features'].forEach((marker) => {
      const newMarker = new mapboxgl.Marker()
        .setLngLat(marker.geometry.coordinates).addTo(this.map);
    });
  }

  cityToJson(city) {
    console.log(city);
    const currentGeoObj = CitiesGeoJson.features.find((obj) => {
      return obj.properties.city === city;
    });

    this.flyToCity(currentGeoObj);
  }

  flyToCity(currentFeature): void {
    this.map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 10
    });
  }

}
