import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { environment } from '../../../../environments/environment';
import { IWasteData } from '../../../models/wasteData.model';
import { CitiesGeoJson, IGeoJsonForCity, IGeoJson, ICollectionsGeoJSON, ICities, wasteTypes, IWasteTypes } from '../../../models/mapData.model';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { NgForm } from '@angular/forms';

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

  filterStatus: boolean = false;
  isSelectAll: boolean = true;
  wasteTypes: IWasteTypes[] = wasteTypes;

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
      this.map.addControl(new mapboxgl.NavigationControl({
        showCompass: false
      }), 'bottom-right');
    });
  }

  addMarkers(): void {
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
      <h3 class='popup-title'>${marker.properties.title}</h3>
      ${marker.properties.address ? `<span class='popup-main-info popup-address'>${marker.properties.address}</span>` : ''}
      ${marker.properties.workingHours ? `<span class='popup-main-info popup-hours'>${marker.properties.workingHours}</span>` : ''}
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
      return `<span class="popup-waste__item ${item}" tooltip=${this.defineToolpit(item)}></span>`
    }).join('')
  }

  defineToolpit(type: string): string {
    return this.wasteTypes.map((item) => {
      if (item.type === type) {
        return item.title_eng
      }
    }).join('');
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
