import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-alert-modal',
  imports: [Button],
  templateUrl: './alert-modal.html',
  styleUrl: './alert-modal.scss',
})
export class AlertModal {
  @Input() title = '';
  @Input() open = false;
  @Input() firstButtonText = '';
  @Input() secondButtonText = '';
  @Output() selectOption = new EventEmitter<Boolean>();
  @Output() close = new EventEmitter<void>();

  pickOption(option: Boolean){
      this.selectOption.emit(option);
      this.close.emit();
  }
}
