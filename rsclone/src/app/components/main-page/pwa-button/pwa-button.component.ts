import { Component, OnInit } from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-pwa-button',
  templateUrl: './pwa-button.component.html',
  styleUrls: ['./pwa-button.component.scss']
})
export class PwaButtonComponent implements OnInit {

  updateAvailable: boolean;

  constructor(private _update: SwUpdate) { }

  ngOnInit(): void {
    if (this._update.isEnabled) {
      this._update.available.subscribe(() => {
        this.updateAvailable = true;
      });
    }
  }

  doUpdate(): void {
    this.updateAvailable = false;
    window.location.reload();
  }

}
