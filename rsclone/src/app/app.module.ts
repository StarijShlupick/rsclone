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

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    StartScreenComponent,
    ThemeSwitcherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ThemeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
