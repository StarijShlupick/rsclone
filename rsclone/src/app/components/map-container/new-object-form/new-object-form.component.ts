import { Input, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-object-form',
  templateUrl: './new-object-form.component.html',
  styleUrls: ['./new-object-form.component.scss']
})
export class NewObjectFormComponent implements OnInit {

  @Input() formOpend: boolean;
  @Input() latitude: number;
  @Input() longitude: number;

  @Output() addNewObject = new EventEmitter<object>();
  @ViewChild('f') newObjextForm: NgForm;
  @Output() closeForm = new EventEmitter();

  ngOnInit(): void {
    // this.newObjextForm.setValue({
    //   name: null,
    //   type: null,
    //   x: this.latitude,
    //   y: this.longitude,
    //   address: null,
    //   phone: null,
    //   schedule: null,
    //   information: null,
    //   email: null
    // });
  }

  ngOnChanges() {
    (this.latitude || this.longitude) && alert('done');
  }

  onCloseForm(): void {
    this.closeForm.emit(null);
    console.log(this.latitude);
  }

}
