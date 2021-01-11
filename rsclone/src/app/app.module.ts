import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentComponent } from './components/content/content.component';
import { SecondScreenComponent } from './components/second-screen/second-screen/second-screen.component';
import { WasteInfoComponent } from './components/second-screen/waste-info/waste-info.component';
import { WasteService } from './services/waste.service';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    SecondScreenComponent,
    WasteInfoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [WasteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
