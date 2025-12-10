import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';

export interface ConfirmationOption {
  label: string;
  value: string;
  variant?: 'primary' | 'secondary';
}

@Component({
  selector: 'app-confirmation-modal',
  imports: [CommonModule, Button],
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.scss',
})
export class ConfirmationModal {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() options: ConfirmationOption[] = [];
  @Input() open = false;

  @Output() close = new EventEmitter<void>();
  @Output() optionSelected = new EventEmitter<string>();

  selectOption(value: string) {
    this.optionSelected.emit(value);
  }
}
