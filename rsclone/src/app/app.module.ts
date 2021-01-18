import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentComponent } from './components/content/content.component';
import { CognitiveInfoComponent } from './components/second-screen/cognitive-info/cognitive-info.component';
import { WasteInfoComponent } from './components/second-screen/waste-info/waste-info.component';
import { WasteService } from './services/waste.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { FormAuthenticationComponent } from './components/authentication/form-authentication/form-authentication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    CognitiveInfoComponent,
    WasteInfoComponent,
    FormAuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp({
      //! TODO
      apiKey: 'AIzaSyBQuheIn7YDsb8lMeqCD1pQQSDZFi4C5s0',
      authDomain: 'my-green-auth.firebaseapp.com',
      projectId: 'my-green-auth',
      storageBucket: 'my-green-auth.appspot.com',
      messagingSenderId: '1071666379145',
      appId: '1:1071666379145:web:4b6f549f18a8ea1956c958',
    }),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
  ],
  providers: [FirebaseService, WasteService, AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
