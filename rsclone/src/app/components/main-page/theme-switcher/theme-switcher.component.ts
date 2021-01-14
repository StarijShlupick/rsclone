import { Component } from '@angular/core';
import { ThemeService } from 'src/app/theme/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent {
  lightTheme: boolean = this.themeService.isLightTheme();
  darkTheme: boolean = this.themeService.isDarkTheme();

  constructor(private themeService: ThemeService) { }

  setLightTheme(): void {
    this.themeService.setLightTheme();
    this.lightTheme = this.themeService.isLightTheme();
    this.darkTheme = this.themeService.isDarkTheme();
  }
  setDarcTheme(): void {
    this.themeService.setDarkTheme();
    this.lightTheme = this.themeService.isLightTheme();
    this.darkTheme = this.themeService.isDarkTheme();
  }
}
