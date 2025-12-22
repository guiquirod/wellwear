import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-button',
  imports: [CommonModule],
  templateUrl: './dropdown-button.html',
  styleUrl: './dropdown-button.scss',
})
export class DropdownButton<T extends string = string> {
  @Input() title: string = '';
  @Input() options: T[] = [];
  @Input() selectedOptions: T[] = [];
  @Input() singleSelection: boolean = false;
  @Input() isOpen = false;
  @Output() selectionChange = new EventEmitter<T[]>();
  @Output() isOpenChange = new EventEmitter<boolean>();

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
  }

  toggleOption(option: T) {
    if (this.singleSelection) {
      this.selectedOptions = [option];
      this.isOpen = false;
    } else {
      this.selectedOptions = this.isSelected(option)
        ? this.selectedOptions.filter((selectedOption) => selectedOption !== option)
        : [...this.selectedOptions, option];
    }
    this.selectionChange.emit(this.selectedOptions);
  }

  isSelected(option: T): boolean {
    return this.selectedOptions.includes(option);
  }

  getLabelText(): string {
    switch (this.selectedOptions.length) {
      case 0:
        return this.title;
      case 1:
        return this.selectedOptions[0];
      default:
        return `${this.selectedOptions.length} seleccionados`;
    }
  }
}
