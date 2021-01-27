// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCyyVVrr-oz7NtKe-DQTyAiGtaK1v_du2o",
    authDomain: "green-map-db.firebaseapp.com",
    projectId: "green-map-db",
    storageBucket: "green-map-db.appspot.com",
    messagingSenderId: "910753025457",
    appId: "1:910753025457:web:df0e1634139c3993ea0190"
  },
  mapbox: {
  accessToken: 'pk.eyJ1IjoicG9sa2hvdnNrYXlhIiwiYSI6ImNrazZ2OWtjOTAzaG4yd280OTY5dG94MGQifQ.3NDcwJ73Jx2PWbB8utg6mw'
  },
  mapboxKey: 'pk.eyJ1IjoiYmV6cnVrIiwiYSI6ImNraXJ4bjUxMzA5ZnUydHBkMnVicGFndnMifQ.Pt0kYmMh6o-AeeqT-asOJw',
  geoapifyKey: '2fa8e80cd0f747d7b45646a4f07fd388'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
