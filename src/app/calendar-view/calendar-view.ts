import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Calendar } from '../shared/Components/calendar/calendar';
import { SectionTitle } from '../shared/Components/section-title/section-title';
import { ProductContainer } from '../shared/Components/product-container/product-container';
import { OutfitService } from '../shared/Services/outfit.service';
import { GarmentDTO } from '../shared/Models/garment.dto';
import { OutfitWithGarments } from '../shared/Models/outfit-with-garments.dto';
import { GarmentActions } from '../shared/Store/garment/garment.actions';
import { selectAllGarments } from '../shared/Store/garment/garment.selectors';
import { GenericToast } from '../shared/Components/generic-toast/generic-toast';

@Component({
  selector: 'app-calendar-view',
  imports: [CommonModule, Calendar, SectionTitle, ProductContainer, GenericToast],
  templateUrl: './calendar-view.html',
  styleUrl: './calendar-view.scss',
})
export class CalendarView implements OnInit {
  selectedDateOutfits$!: Observable<OutfitWithGarments[]>;
  garments: GarmentDTO[] = [];

  constructor(
    private store: Store,
    private outfitService: OutfitService
  ) {}

  ngOnInit() {
    this.store.dispatch(GarmentActions.loadGarments());

    this.store.select(selectAllGarments).subscribe(garments => {
      this.garments = garments;
      this.loadOutfitsForDate(new Date());
    });
  }

  onDayChange(date: Date) {
    this.loadOutfitsForDate(date);
  }

  private loadOutfitsForDate(date: Date) {
    this.selectedDateOutfits$ = this.outfitService.getOutfits(this.formatDate(date)).pipe(
      map(response => response.data ?? [])
    );
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
