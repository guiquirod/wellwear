import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductImage } from '../product-image/product-image';
import { GarmentDTO } from '../../Models/garment.dto';

@Component({
  selector: 'app-product-container',
  imports: [CommonModule, ProductImage],
  templateUrl: './product-container.html',
  styleUrl: './product-container.scss',
})
export class ProductContainer {
  @Input() title: string = '';
  @Input() garments: GarmentDTO[] = [];
  @Input() secondStyle = false;
  @Input() clickable = false;
  @Output() addGarmentClick = new EventEmitter<void>();
  @Output() containerClick = new EventEmitter<void>();

  handleAddGarment() {
    this.addGarmentClick.emit();
  }

  handleClick() {
    if (this.clickable) {
      this.containerClick.emit();
    }
  }
}
