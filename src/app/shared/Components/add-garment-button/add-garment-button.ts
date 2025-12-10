import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-garment-button',
  imports: [],
  templateUrl: './add-garment-button.html',
  styleUrl: './add-garment-button.scss',
})
export class AddGarmentButton {
  @Input() infoText = ''
  @Output() action = new EventEmitter<void>();

  handleClick() {
    this.action.emit();
  }
}
