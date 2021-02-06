import { Component } from '@angular/core';
import {ScrollService} from '../../../services/scroll.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  constructor(public scrollService: ScrollService) {
  }
}
