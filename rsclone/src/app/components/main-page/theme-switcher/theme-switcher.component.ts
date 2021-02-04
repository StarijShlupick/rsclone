import { Component, OnInit } from '@angular/core';
import { EThemeModes } from 'src/app/theme/theme';
import { ThemeService } from 'src/app/theme/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {

  constructor(public themeService: ThemeService) { }

  ngOnInit(): void {
    this.setStartTheme();
  }

  setStartTheme(): void {
    localStorage.getItem('theme') === EThemeModes.Light ? this.themeService.setTheme(EThemeModes.Light) :
     this.themeService.setTheme(EThemeModes.Dark);
  }

  toggleTheme(theme: string): void {
    if (theme === 'light') {
      this.themeService.setTheme(EThemeModes.Light);
    } else if (theme === 'dark') {
      this.themeService.setTheme(EThemeModes.Dark);
    }
  }
}
