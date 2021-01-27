import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-object-button',
  templateUrl: './new-object-button.component.html',
  styleUrls: ['./new-object-button.component.scss']
})
export class NewObjectButtonComponent implements OnInit {

  @Output() openForm = new EventEmitter();

  ngOnInit(): void {
  }

  onOpenForm(): void {
    this.openForm.emit(null);
  }

}
