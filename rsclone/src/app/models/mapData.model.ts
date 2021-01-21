export interface ICities {
  value: string;
  viewValue: string;
}

export interface ICollectionsGeoJSON {
  type: string;
  features: IGeoJson[];
}

export interface IGeoJson {
  type: string;
  geometry: IGeometry;
  properties: IPropertiesGeoJSON;
}

export interface IGeoJsonForCity {
  type: string;
  geometry: IGeometry;
  properties: IPropForCity;
}

interface IPropForCity {
  city: string;
}

interface IGeometry {
  type: string;
  coordinates: number[];
}

interface IPropertiesGeoJSON {
  city: string;
  address: string;
  title: string;
  workingHours: string;
  phone: string;
  iconType: string;
  type: ITypeGeoJson;
}

interface ITypeGeoJson {
  batteries: boolean;
  books: boolean;
  cloth: boolean;
  electronicWaste: boolean;
  glass: boolean;
  householdItems: boolean;
  lamps: boolean;
  metal: boolean;
  oils: boolean;
  paper: boolean;
  plastic: boolean;
  tires: boolean;
  wholeClothes: boolean;
}

export const CitiesGeoJson = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'properties': {
        'city': 'Minsk',
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          27.555332,
          53.903621
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'city': 'Vitebsk',
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          30.205186,
          55.187459
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'city': 'Grodno',
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          23.822140,
          53.668452
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'city': 'Mogilev',
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          30.332594,
          53.897693
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'city': 'Brest',
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          23.686458,
          52.086182
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'city': 'Gomel',
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          30.994284,
          52.430636
        ]
      }
    }
  ]
}


