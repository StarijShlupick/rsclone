import { Input, Output, ViewChild } from '@angular/core';
import { Component, OnChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-new-object-form',
  templateUrl: './new-object-form.component.html',
  styleUrls: ['./new-object-form.component.scss'],
  animations: [
    trigger('new-object-form', [
      transition('void => *', [
        style({
          right: '-360px'
        }),
        animate('250ms ease-out')
      ])
    ])
  ]
})
export class NewObjectFormComponent implements OnChanges {

  @Input() formOpend: boolean;
  @Input() coordinates: number[];
  @Input() userEmail: string;

  @Output() addNewObject: EventEmitter<object> = new EventEmitter<object>();
  @Output() closeForm: EventEmitter<any> = new EventEmitter();

  @ViewChild('f', { static: false }) newObjectForm: NgForm;

  ngOnChanges(coordinates: any): void {
    if (this.coordinates && this.newObjectForm) {
      this.newObjectForm.setValue({
        name: null,
        type: null,
        x: this.coordinates[0],
        y: this.coordinates[1],
        address: null,
        phone: null,
        schedule: null,
        information: null,
        email: this.userEmail
      });
    }
  }

  onCloseForm(): void {
    this.closeForm.emit(null);
  }
}
