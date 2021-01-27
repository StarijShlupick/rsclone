import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-object-button',
  templateUrl: './new-object-button.component.html',
  styleUrls: ['./new-object-button.component.scss']
})
export class NewObjectButtonComponent {

  @Output() openForm: EventEmitter<any> = new EventEmitter();

  onOpenForm(): void {
    this.openForm.emit(null);
  }
}
