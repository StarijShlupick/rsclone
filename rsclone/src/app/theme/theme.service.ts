import { Injectable } from "@angular/core";
import { Theme, light, dark } from "./theme";

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  private active: Theme = light;

  isLightTheme(): boolean {
    return this.active.name === light.name;
  }

  isDarkTheme(): boolean {
    return this.active.name === dark.name;
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;
    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }

  setDarkTheme(): void {
    this.setActiveTheme(dark);
  }

  setLightTheme(): void {
    this.setActiveTheme(light);
  }

}