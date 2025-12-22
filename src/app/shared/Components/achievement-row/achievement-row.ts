import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-achievement-row',
  imports: [CommonModule],
  templateUrl: './achievement-row.html',
  styleUrl: './achievement-row.scss',
})
export class AchievementRow {
  @Input() infoText = '';
  @Input() points = 25;
  @Input() isCompleted = false;
  @Input() isAutomatic = false;
  @Output() checkboxChange = new EventEmitter<boolean>();

  onCheckboxChange(event: Event): void {
    if (!this.isCompleted) {
      const checkbox = event.target as HTMLInputElement;
      this.checkboxChange.emit(checkbox.checked);
    }
  }
}
