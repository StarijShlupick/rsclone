import { Component, OnInit } from '@angular/core';
import { EThemeModes } from 'src/app/theme/theme';
import { ThemeService } from 'src/app/theme/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {
  lightTheme: boolean = this.themeService.isLightTheme();
  darkTheme: boolean = this.themeService.isDarkTheme();

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.setStartTheme();
  }

  setStartTheme(): void {
    localStorage.getItem('theme') === EThemeModes.Light ? this.themeService.setTheme(EThemeModes.Light) : this.themeService.setTheme(EThemeModes.Dark);
  }

  toggleTheme(theme: EThemeModes): void {
    theme === EThemeModes.Light ? this.themeService.setTheme(EThemeModes.Light) : this.themeService.setTheme(EThemeModes.Dark);
    this.lightTheme = this.themeService.isLightTheme();
    this.darkTheme = this.themeService.isDarkTheme();
  }
}
