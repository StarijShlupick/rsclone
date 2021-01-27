import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { environment } from '../../../../environments/environment';
import { IWasteData } from '../../../models/wasteData.model';
import { ICities } from '../../../models/mapData.model';
import { ICollectionsGeoJSON } from '../../../models/mapData.model';
import { IGeoJson } from '../../../models/mapData.model';
import { IGeoJsonForCity } from '../../../models/mapData.model';
import { CitiesGeoJson } from '../../../models/mapData.model';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  formOpend: boolean;
  coordinates: number[];
  marker: any;
  @Output() addNewObject = new EventEmitter();

  wasteData: IWasteData[];
  map: mapboxgl.Map;
  popup: mapboxgl.Popup;
  geoJson: ICollectionsGeoJSON;
  selectedCity: string;
  cities: ICities[] = [
    { value: 'city-1', viewValue: 'Minsk' },
    { value: 'city-2', viewValue: 'Vitebsk' },
    { value: 'city-3', viewValue: 'Grodno' },
    { value: 'city-4', viewValue: 'Mogilev' },
    { value: 'city-5', viewValue: 'Brest' },
    { value: 'city-6', viewValue: 'Gomel' },
  ];

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

      this.map.on('click', (event) => {
        const coordinates: number[] = [event.lngLat.lng, event.lngLat.lat];

        const mapMarker: HTMLDivElement = document.createElement('div');
        mapMarker.className = 'marker';
        mapMarker.style.backgroundImage = `url(./assets/waste/pin.png)`;
        mapMarker.style.width = '24px';
        mapMarker.style.height = '24px';
        mapMarker.style.backgroundSize = '24px 24px';

        mapMarker.addEventListener('mouseenter', () => {
          mapMarker.style.cursor = 'pointer';
        });

        this.marker && this.marker.remove();
        this.marker = new mapboxgl.Marker(mapMarker).setLngLat(coordinates).addTo(this.map);
        console.log(typeof this.marker );

        this.coordinates =  coordinates;
      });

      this.loadMap();
    });
  }

  createGeoJson(data): ICollectionsGeoJSON {
    const geoJson: ICollectionsGeoJSON = { 'type': 'FeatureCollection', 'features': [] };
    for (let key in data) {
      const newFeature: IGeoJson = {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [parseFloat(data[key].location.split(',')[0]), parseFloat(data[key].location.split(',')[1])]
        },
        'properties': {
          'city': data[key].city,
          'address': data[key].address,
          'title': data[key].title,
          'workingHours': data[key].workingHours,
          'phone': data[key].phone,
          'iconType': data[key].iconType,
          'type': {
            'batteries': data[key].batteries,
            'books': data[key].books,
            'cloth': data[key].cloth,
            'electronicWaste': data[key].electronicWaste,
            'glass': data[key].glass,
            'householdItems': data[key].householdItems,
            'lamps': data[key].lamps,
            'metal': data[key].metal,
            'oils': data[key].oils,
            'paper': data[key].paper,
            'plastic': data[key].plastic,
            'tires': data[key].tires,
            'wholeClothes': data[key].wholeClothes,
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
        'type': 'geojson',
        'data': this.geoJson
      });
      this.addMarkers();

      this.map.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl
        })
      );
      this.map.addControl(new mapboxgl.NavigationControl({
        showCompass: false
      }), 'bottom-right');
    });
  }

  addMarkers(): void {
    this.geoJson['features'].forEach((marker) => {
      const mapMarker: HTMLDivElement = document.createElement('div');
      mapMarker.className = 'marker';
      mapMarker.style.backgroundImage = `url(./assets/waste/${marker.properties.iconType}.png)`;
      mapMarker.style.width = '24px';
      mapMarker.style.height = '24px';
      mapMarker.style.backgroundSize = '24px 24px';

      mapMarker.addEventListener('mouseenter', () => {
        mapMarker.style.cursor = 'pointer';
      });

      mapMarker.addEventListener('click', (e) => {
        this.flyToPoint(marker.geometry.coordinates);
      });

      const mainPopupInfo = `
      <h3 class='popup-title'>${marker.properties.title}</h3>
      ${marker.properties.address ? `<span class='popup-main-info popup-address'>${marker.properties.address}</span>` : ''}
      ${marker.properties.workingHours ? `<span class='popup-main-info popup-hours'>${marker.properties.workingHours}</span>` : ''}
      ${marker.properties.phone ? `<span class='popup-main-info popup-phone'>${marker.properties.phone}</span>` : ''}
      <div class='popup-waste'>
      ${marker.properties.type.batteries ? `<span class='popup-waste__item batteries' tooltip='батарейки'></span>` : ''}
      ${marker.properties.type.books ? `<span class='popup-waste__item books' tooltip='книги'></span>` : ''}
      ${marker.properties.type.cloth ? `<span class='popup-waste__item cloth' tooltip='ткань'></span>` : ''}
      ${marker.properties.type.electronicWaste ? `<span class='popup-waste__item electronicWaste' tooltip='электроника'></span>` : ''}
      ${marker.properties.type.glass ? `<span class='popup-waste__item glass' tooltip='стекло'></span>` : ''}
      ${marker.properties.type.householdItems ? `<span class='popup-waste__item householdItems' tooltip='бытовые отходы'></span>` : ''}
      ${marker.properties.type.lamps ? `<span class='popup-waste__item lamps' tooltip='лампочки'></span>` : ''}
      ${marker.properties.type.metal ? `<span class='popup-waste__item metal' tooltip='метал'></span>` : ''}
      ${marker.properties.type.oils ? `<span class='popup-waste__item oils' tooltip='масло'></span>` : ''}
      ${marker.properties.type.paper ? `<span class='popup-waste__item paper' tooltip='макулатура'></span>` : ''}
      ${marker.properties.type.plastic ? `<span class='popup-waste__item plastic' tooltip='пластик'></span>` : ''}
      ${marker.properties.type.tires ? `<span class='popup-waste__item tires' tooltip='шины'></span>` : ''}
      ${marker.properties.type.wholeClothes ? `<span class='popup-waste__item wholeClothes' tooltip='одежда'></span>` : ''}
      </div>
      `;
      const popup = new mapboxgl.Popup({
        offset: 15,
        className: 'map-popup'
      })
        .setHTML(mainPopupInfo);

      new mapboxgl.Marker(mapMarker).setLngLat(marker.geometry.coordinates).setPopup(popup).addTo(this.map);
    });
  }

  cityToJson(city): void {
    const currentGeoObj: IGeoJsonForCity = CitiesGeoJson.features.find((obj) => {
      return obj.properties.city === city;
    });

    this.flyToCity(currentGeoObj);
  }

  flyToCity(currentFeature): void {
    this.map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 10.5
    });
  }

  flyToPoint(center): void {
    this.map.flyTo({
      center: center,
      zoom: 13.5
    });
  }

  switchLayer(e): void {
    e.checked ? this.map.setStyle('mapbox://styles/mapbox/dark-v10') : this.map.setStyle('mapbox://styles/mapbox/streets-v11');
  }

  onOpenForm(): void {
    this.formOpend = true;
  }

  onCloseForm(): void {
    this.formOpend = false;
  }

  onAddObject(form: NgForm): void {
    const value = form.value;
    this.addNewObject.emit(value);
    this.onCloseForm();
  }
}
