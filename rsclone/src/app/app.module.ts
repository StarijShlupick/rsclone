import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentComponent } from './components/content/content.component';

import { HeaderComponent } from './components/main-page/header/header.component';
import { StartScreenComponent } from './components/main-page/start-screen/start-screen.component';
import { ThemeSwitcherComponent } from './components/main-page/theme-switcher/theme-switcher.component';
import { ThemeModule } from './theme/theme.module';
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
import { ControlAuthenticationComponent } from './components/authentication/control-authentication/control-authentication.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    StartScreenComponent,
    ThemeSwitcherComponent,
    CognitiveInfoComponent,
    WasteInfoComponent,
    FormAuthenticationComponent,
    ControlAuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ThemeModule,
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
