import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-section-title',
  imports: [NgOptimizedImage],
  templateUrl: './section-title.html',
  styleUrl: './section-title.scss',
})
export class SectionTitle {
  @Input() title: string = '';
}
