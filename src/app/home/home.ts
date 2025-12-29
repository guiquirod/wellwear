import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ContextHeader } from '../shared/Components/context-header/context-header';
import { SectionTitle } from '../shared/Components/section-title/section-title';
import { ProductContainer } from '../shared/Components/product-container/product-container';
import { Button } from '../shared/Components/button/button';
import {
  ModalSelector,
  ModalSection,
  ModalItemDisplay,
} from '../shared/Components/modal-selector/modal-selector';
import { GarmentForm } from '../shared/Components/garment-form/garment-form';
import { OutfitForm } from '../shared/Components/outfit-form/outfit-form';
import { GenericToast } from '../shared/Components/generic-toast/generic-toast';
import { AchievementRow } from '../shared/Components/achievement-row/achievement-row';
import { GarmentDTO } from '../shared/Models/garment.dto';
import { AchievementDTO } from '../shared/Models/achievement.dto';
import { OutfitWithGarments } from '../shared/Models/outfit-with-garments.dto';
import { GarmentActions } from '../shared/Store/garment/garment.actions';
import { OutfitActions } from '../shared/Store/outfit/outfit.actions';
import { AchievementActions } from '../shared/Store/achievement/achievement.actions';
import { selectAllGarments } from '../shared/Store/garment/garment.selectors';
import { selectAllOutfits, selectTodayOutfits } from '../shared/Store/outfit/outfit.selectors';
import {
  selectDailyAchievements,
  selectAutomaticAchievements,
} from '../shared/Store/achievement/achievement.selectors';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ContextHeader,
    SectionTitle,
    ProductContainer,
    Button,
    ModalSelector,
    GarmentForm,
    OutfitForm,
    GenericToast,
    AchievementRow,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  showOutfitModal = false;
  showGarmentForm = false;
  showOutfitForm = false;
  allOutfitsWithGarments: OutfitWithGarments[] = [];

  garments$: Observable<GarmentDTO[]>;
  outfits$: Observable<OutfitWithGarments[]>;
  todayOutfits$: Observable<OutfitWithGarments[]>;
  dailyAchievements$: Observable<AchievementDTO[]>;
  automaticAchievements$: Observable<AchievementDTO[]>;
  hasLessThanTwoGarments$: Observable<boolean>;
  hasNoOutfits$: Observable<boolean>;

  outfitModalSections: ModalSection<OutfitWithGarments>[] = [];

  outfitDisplay: ModalItemDisplay<OutfitWithGarments> = {
    getIcon: (outfit) => {
      return this.getImageUrl(outfit.garments.find((g) => g.picture)?.picture ?? '');
    },
    getLabel: (outfit) => `(${outfit.garments.length} prendas)`,
  };

  constructor(private store: Store) {
    this.garments$ = this.store.select(selectAllGarments);
    this.outfits$ = this.store.select(selectAllOutfits);
    this.todayOutfits$ = this.store.select(selectTodayOutfits);
    this.dailyAchievements$ = this.store.select(selectDailyAchievements);

    this.hasLessThanTwoGarments$ = this.garments$.pipe(map((garments) => garments.length < 2));
    this.hasNoOutfits$ = this.outfits$.pipe(map((outfits) => outfits.length === 0));
    this.automaticAchievements$ = this.store.select(selectAutomaticAchievements);

    this.outfits$.subscribe((outfits) => {
      this.allOutfitsWithGarments = outfits;
      this.updateOutfitModalSections();
    });
  }

  updateOutfitModalSections() {
    this.outfitModalSections = [{ title: 'Mis conjuntos', items: this.allOutfitsWithGarments }];
  }

  ngOnInit() {
    this.store.dispatch(GarmentActions.loadGarments());
    this.store.dispatch(OutfitActions.loadOutfits());
    this.store.dispatch(OutfitActions.loadOutfitsByDate({}));
    this.store.dispatch(AchievementActions.loadAchievements());
  }

  onAchievementComplete(achievementId: number) {
    this.store.dispatch(AchievementActions.completeAchievement({ achievementId }));
  }

  openOutfitCreationModal() {
    this.showOutfitForm = true;
  }

  openAddOutfitModal() {
    this.showOutfitModal = true;
  }

  closeOutfitModal() {
    this.showOutfitModal = false;
  }

  selectOutfitForToday(outfit: OutfitWithGarments) {
    this.store.dispatch(OutfitActions.wearOutfit({ id: outfit.id }));
    this.closeOutfitModal();
  }

  addGarment() {
    this.showGarmentForm = true;
  }

  closeGarmentForm() {
    this.showGarmentForm = false;
  }

  closeOutfitForm() {
    this.showOutfitForm = false;
  }

  private getImageUrl(path: string): string {
    return path?.startsWith('http') ? path : `http://localhost/wellwear-api/${path}`;
  }
}
