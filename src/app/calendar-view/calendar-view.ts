import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Calendar } from '../shared/Components/calendar/calendar';
import { SectionTitle } from '../shared/Components/section-title/section-title';
import { ProductContainer } from '../shared/Components/product-container/product-container';
import { OutfitWithGarments } from '../shared/Models/outfit-with-garments.dto';
import { OutfitActions } from '../shared/Store/outfit/outfit.actions';
import {
  selectTodayOutfits,
  selectOutfitLoading,
  selectOutfitError,
} from '../shared/Store/outfit/outfit.selectors';
import { GenericToast } from '../shared/Components/generic-toast/generic-toast';
import { Spinner } from '../shared/Components/spinner/spinner';
import { ErrorView } from '../shared/Components/error-view/error-view';

@Component({
  selector: 'app-calendar-view',
  imports: [
    CommonModule,
    Calendar,
    SectionTitle,
    ProductContainer,
    GenericToast,
    Spinner,
    ErrorView,
  ],
  templateUrl: './calendar-view.html',
  styleUrl: './calendar-view.scss',
})
export class CalendarView implements OnInit {
  selectedDateOutfits$!: Observable<OutfitWithGarments[]>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  constructor(private store: Store) {
    this.loading$ = this.store.select(selectOutfitLoading);
    this.error$ = this.store.select(selectOutfitError);
  }

  ngOnInit() {
    this.selectedDateOutfits$ = this.store.select(selectTodayOutfits);
    this.loadOutfitsForDate(new Date());
  }

  onDayChange(date: Date) {
    this.loadOutfitsForDate(date);
  }

  private loadOutfitsForDate(date: Date) {
    this.store.dispatch(OutfitActions.loadOutfitsByDate({ date: this.formatDate(date) }));
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
