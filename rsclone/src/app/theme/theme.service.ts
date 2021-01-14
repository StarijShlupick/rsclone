import { Injectable } from "@angular/core";
import { ITheme, light, dark } from "./theme";

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  active: ITheme = light;

  isLightTheme(): boolean {
    return this.active.name === light.name;
  }

  isDarkTheme(): boolean {
    return this.active.name === dark.name;
  }

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

  setLightTheme(): void {
    this.setActiveTheme(light);
  }

  setDarkTheme(): void {
    this.setActiveTheme(dark);
  }

}