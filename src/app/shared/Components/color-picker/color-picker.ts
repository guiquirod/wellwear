import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  imports: [ReactiveFormsModule],
  templateUrl: './color-picker.html',
  styleUrl: './color-picker.scss',
})
export class ColorPicker {
  @Input() title = '';
  @Input() value = '#000000';
  @Output() colorChange = new EventEmitter<string>();

  onColorChange(event: Event) {
    const color = (event.target as HTMLInputElement).value;
    this.colorChange.emit(color);
  }
}
