import { Input, Output, ViewChild } from '@angular/core';
import { Component, OnInit, OnChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-object-form',
  templateUrl: './new-object-form.component.html',
  styleUrls: ['./new-object-form.component.scss']
})
export class NewObjectFormComponent implements  OnChanges {

  @Input() formOpend: boolean;
  @Input() coordinates: number[];

  @Output() addNewObject = new EventEmitter<object>();
  @Output() closeForm = new EventEmitter();

  @ViewChild('f', { static: false }) newObjectForm: NgForm;

  ngOnChanges(coordinates: any): void {
    if (this.coordinates) {
      this.newObjectForm.setValue({
        name: null,
        type: null,
        x: this.coordinates[0],
        y: this.coordinates[1],
        address: null,
        phone: null,
        schedule: null,
        information: null,
        email: null
      });
    }
  }

  onCloseForm(): void {
    this.closeForm.emit(null);
  }
}
