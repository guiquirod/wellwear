import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input() title: string = '';
  @Input() rightIcon?: string;
  @Input() disabled: boolean = false;
  @Output() action = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled) {
      this.action.emit();
    }
  }
}
