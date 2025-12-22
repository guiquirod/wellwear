import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AddGarmentButton } from '../add-garment-button/add-garment-button';

export interface ModalSection<T> {
  title: string;
  items: T[];
}

export interface ModalItemDisplay<T> {
  getIcon: (item: T) => string;
  getLabel: (item: T) => string;
}

@Component({
  selector: 'app-modal-selector',
  imports: [CommonModule, NgOptimizedImage, AddGarmentButton],
  templateUrl: './modal-selector.html',
  styleUrl: './modal-selector.scss',
})
export class ModalSelector<T> {
  @Input() sections: ModalSection<T>[] = [];
  @Input() display!: ModalItemDisplay<T>;
  @Input() adButtonText = '';
  @Input() open = false;
  @Input() showAddButton = false;

  @Output() close = new EventEmitter<void>();
  @Output() selectOption = new EventEmitter<T>();
  @Output() addButtonClick = new EventEmitter<void>();

  pickOption(option: T) {
    this.selectOption.emit(option);
    this.close.emit();
  }

  handleAddClick() {
    this.addButtonClick.emit();
  }
}
