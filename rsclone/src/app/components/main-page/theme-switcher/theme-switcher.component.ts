import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/theme/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
  }
  setLightTheme() {
    this.themeService.setLightTheme();
  }
  setDarcTheme() {
    this.themeService.setDarkTheme();
  }
}
