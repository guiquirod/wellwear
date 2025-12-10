import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { ImageUrlPipe } from '../../Pipes/image-url.pipe';

@Component({
  selector: 'app-product-image',
  imports: [NgOptimizedImage, ImageUrlPipe, CommonModule],
  templateUrl: './product-image.html',
  styleUrl: './product-image.scss',
})
export class ProductImage {
  @Input() imageSrc: string = '../../../../assets/icons/Star 1.png';
  @Input() alt: string = '';
  @Input() clickable: boolean = false;
  @Input() isSecondHand: boolean = false;
  @Output() imageClick = new EventEmitter<void>();

  onClick() {
    if (this.clickable) {
      this.imageClick.emit();
    }
  }
}
