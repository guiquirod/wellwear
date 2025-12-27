import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Calendar } from '../shared/Components/calendar/calendar';
import { SectionTitle } from '../shared/Components/section-title/section-title';
import { ProductContainer } from '../shared/Components/product-container/product-container';
import { OutfitWithGarments } from '../shared/Models/outfit-with-garments.dto';
import { OutfitActions } from '../shared/Store/outfit/outfit.actions';
import { selectTodayOutfits } from '../shared/Store/outfit/outfit.selectors';
import { GenericToast } from '../shared/Components/generic-toast/generic-toast';

@Component({
  selector: 'app-calendar-view',
  imports: [CommonModule, Calendar, SectionTitle, ProductContainer, GenericToast],
  templateUrl: './calendar-view.html',
  styleUrl: './calendar-view.scss',
})
export class CalendarView implements OnInit {
  selectedDateOutfits$!: Observable<OutfitWithGarments[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.selectedDateOutfits$ = this.store.select(selectTodayOutfits);
    this.loadOutfitsForDate(new Date());
  }

  onDayChange(date: Date) {
    this.loadOutfitsForDate(date);
  }

  private loadOutfitsForDate(date: Date) {
    this.store.dispatch(OutfitActions.loadTodayOutfits({ date: this.formatDate(date) }));
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
