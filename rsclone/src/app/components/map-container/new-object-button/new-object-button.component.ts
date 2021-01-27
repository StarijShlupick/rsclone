import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-object-button',
  templateUrl: './new-object-button.component.html',
  styleUrls: ['./new-object-button.component.scss']
})
export class NewObjectButtonComponent {

  @Output() openForm = new EventEmitter();

  onOpenForm(): void {
    this.openForm.emit(null);
  }
}
