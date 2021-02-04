import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { environment } from '../../../../environments/environment';
import { IWasteData } from '../../../models/wasteData.model';
import { CitiesGeoJson, IGeoJsonForCity, IGeoJson, ICollectionsGeoJSON, ICities, wasteTypes, IWasteTypes } from '../../../models/mapData.model';
import * as mapboxgl from 'mapbox-gl';
import { NgForm } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Location} from '@angular/common';
import {ScrollService} from '../../../services/scroll.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  formOpend = false;
  coordinates: number[];
  marker: any;
  @Input() userEmail: string;
  @Output() addNewObject: EventEmitter<any> = new EventEmitter();
  language: string = 'en';

  wasteData: IWasteData[];
  map: mapboxgl.Map;
  popup: mapboxgl.Popup;
  geoJson: ICollectionsGeoJSON;
  selectedCity: string;
  cities: ICities[] = [
    { value: 'city-1', viewValue: 'MAP-CONTAINER.MAP.1', moveToValue: 'Minsk' },
    { value: 'city-2', viewValue: 'MAP-CONTAINER.MAP.2', moveToValue: 'Vitebsk' },
    { value: 'city-3', viewValue: 'MAP-CONTAINER.MAP.3', moveToValue: 'Grodno' },
    { value: 'city-4', viewValue: 'MAP-CONTAINER.MAP.4', moveToValue: 'Mogilev' },
    { value: 'city-5', viewValue: 'MAP-CONTAINER.MAP.5', moveToValue: 'Brest' },
    { value: 'city-6', viewValue: 'MAP-CONTAINER.MAP.6', moveToValue: 'Gomel' },
  ];

  filterStatus: boolean = false;
  isSelectAll: boolean = true;
  wasteTypes: IWasteTypes[] = wasteTypes;

  constructor(private location: Location, private FirebaseService: FirebaseService, private translate: TranslateService, public scrollService: ScrollService) {
   }

  ngOnInit(): void {

    this.location.onUrlChange(el => {
      this.language = window.location.hash ? window.location.hash.slice(1) : 'en';
        // this.addMarkers( this.language);
    });

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
        if (this.formOpend) {
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
          this.coordinates = coordinates;
        } else if (this.marker) {
          this.marker.remove();
        }
      });
      this.loadMap();
    });
  }

  createGeoJson(data: IWasteData[]): ICollectionsGeoJSON {
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
          'addressRu': data[key].addressRu,
          'addressEn': data[key].addressEn,
          'addressBy': data[key].addressBy,
          'titleRu': data[key].titleRu,
          'titleEn': data[key].titleEn,
          'titleBy': data[key].titleBy,
          'workingHoursRu': data[key].workingHoursRu,
          'workingHoursEn': data[key].workingHoursEn,
          'workingHoursBy': data[key].workingHoursBy,
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
      this.addMarkers(this.language);
      this.map.addControl(new mapboxgl.NavigationControl({
        showCompass: false
      }), 'bottom-right');
    });
  }

  addMarkers(lg: string): void {
    this.geoJson['features'].forEach((marker) => {
      const availableTypes: string[] = Object.keys(marker.properties.type).filter((key) => marker.properties.type[key]);
      const mapMarker: HTMLDivElement = document.createElement('div');
      mapMarker.className = `marker ${this.getIconClasses(availableTypes)}`;
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

      const mainPopupInfo: string = `
      <h3 class='popup-title'>${lg === "en" ? marker.properties.titleEn: lg === "ru" ?  marker.properties.titleRu :  marker.properties.titleBy}</h3>
      ${marker.properties.addressEn ? `<span class='popup-main-info popup-address'>${lg === "en" ? marker.properties.addressEn : lg === "ru" ? marker.properties.addressRu : marker.properties.addressBy}</span>` : ''}
      ${marker.properties.workingHoursEn ? `<span class='popup-main-info popup-hours'>${lg === "en" ? marker.properties.workingHoursEn : lg === "ru" ? marker.properties.workingHoursRu : marker.properties.workingHoursBy}</span>` : ''}
      ${marker.properties.phone ? `<span class='popup-main-info popup-phone'>${marker.properties.phone}</span>` : ''}
      <div class='popup-waste'>${this.createPopupContent(availableTypes)}</div>`;
      const popup = new mapboxgl.Popup({
        offset: 15,
        className: 'map-popup'
      })
        .setHTML(mainPopupInfo);

      new mapboxgl.Marker(mapMarker).setLngLat(marker.geometry.coordinates).setPopup(popup).addTo(this.map);
    });
  }

   getIconClasses(types: string[]): string {
    return types.map((type) => {
      return `l-${type}`;
    }).join(' ');
  }

  createPopupContent(types: string[]): string {
    return types.map((item: string) => {
      return `<span class="popup-waste__item ${item}" tooltip=${this.defineToolpit(item)}></span>`;
    }).join('');
  }

  defineToolpit(type: string): string {
    let result = '';
    const keyValue = this.wasteTypes.map((item) => {
      if (item.type === type) {
        return item.title_eng;
      }
    }).join('');
    this.translate.stream(keyValue).subscribe(value => {
      result = value;
    });
    return result;
  }

  cityToJson(city: string): void {
    const currentGeoObj: IGeoJsonForCity = CitiesGeoJson.features.find((obj) => {
      return obj.properties.city === city;
    });
    this.flyToCity(currentGeoObj);
  }

  flyToCity(currentFeature: IGeoJsonForCity): void {
    this.map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 10.5
    });
  }

  flyToPoint(center: number[]): void {
    this.map.flyTo({
      center: center,
      zoom: 13.5
    });
  }

  switchLayer(e): void {
    e.checked ? this.map.setStyle('mapbox://styles/mapbox/dark-v10') : this.map.setStyle('mapbox://styles/mapbox/streets-v11');
  }

  showFilter(): void {
    this.filterStatus = !this.filterStatus;
  }

  toggleActiveLayer(e): void {
    const id: number = parseInt(e.target.dataset.id);
    const type = e.target.dataset.type;
    const allMarkers: Element[] = Array.from(document.getElementsByClassName('marker'));
    const markers: Element[] = Array.from(document.getElementsByClassName(type));
    allMarkers.forEach((marker) => {
      marker.classList.add('hide');
    });
    markers.forEach((marker) => {
      marker.classList.remove('hide');
    })
    this.isSelectAll = false;
    this.wasteTypes = this.wasteTypes.map((item) => {
      return item.id === id ? { ...item, isActive: true } : { ...item, isActive: false }
    });
  }

  isAllActive(): boolean {
    return this.wasteTypes.every((item) => item.isActive);
  }

  selectAll(): void {
    this.isSelectAll = !this.isSelectAll;
    const markers: Element[] = Array.from(document.getElementsByClassName('marker'));
    markers.forEach((marker) => {
      !this.isSelectAll ? marker.classList.add('hide') : marker.classList.remove('hide');
    });

    this.wasteTypes = this.wasteTypes.map((item) => {
      return this.isAllActive() ? { ...item, isActive: !this.isAllActive() } : { ...item, isActive: true }
    })
  }

  onOpenCloseForm(): void {
    this.formOpend = !this.formOpend;
  }

  onAddObject(form: NgForm): void {
    const value = form.value;
    this.addNewObject.emit(value);
    this.onOpenCloseForm();
  }
}
