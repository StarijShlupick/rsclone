import { Injectable } from '@angular/core';
import { ITheme, EThemeModes, light, dark } from './theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  active: ITheme = light;

  setActiveTheme(theme: ITheme): void {
    this.active = theme;
    localStorage.setItem('theme', this.active.name);
    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }

  setTheme(theme: EThemeModes): void {
    theme === EThemeModes.Light ? this.setActiveTheme(light) : this.setActiveTheme(dark);
  }
}
