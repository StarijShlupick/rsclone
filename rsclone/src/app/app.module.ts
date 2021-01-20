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
import { SecondScreenComponent } from './components/second-screen/second-screen/second-screen.component';
import { WasteInfoComponent } from './components/second-screen/waste-info/waste-info.component';
import { WasteService } from './services/waste.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PwaButtonComponent } from './components/main-page/pwa-button/pwa-button.component';
import { InfoComponent } from './components/info-screen/info/info.component';
import { FooterComponent } from './components/info-screen/footer/footer.component';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    StartScreenComponent,
    ThemeSwitcherComponent,
    SecondScreenComponent,
    WasteInfoComponent,
    PwaButtonComponent,
    InfoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ThemeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatMenuModule
  ],
  providers: [FirebaseService, WasteService],
  bootstrap: [AppComponent]
})
export class AppModule {}
