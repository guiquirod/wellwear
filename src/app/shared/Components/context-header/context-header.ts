import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-context-header',
  imports: [CommonModule],
  templateUrl: './context-header.html',
  styleUrl: './context-header.scss',
})
export class ContextHeader implements OnInit {
  weekday: string = '';
  dateFormatted: string = '';
  season: string = '';

  ngOnInit(): void {
    const today = new Date();
    this.weekday = new Intl.DateTimeFormat('es-ES', { weekday: 'long' }).format(today);

    const day = today.getDate();
    const month = today.getMonth() + 1;
    this.dateFormatted = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;

    this.season = this.getSeason(today.getMonth());
  }

  private getSeason(month: number): string {
    switch (month) {
      case 3:
      case 4:
      case 5:
        return 'Primavera';
      case 6:
      case 7:
      case 8:
        return 'Verano';
      case 9:
      case 10:
      case 11:
        return 'Otoño';
      default:
        return 'Invierno';
    }
  }
}
