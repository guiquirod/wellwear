import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ProductContainer } from '../shared/Components/product-container/product-container';
import { ProductImage } from '../shared/Components/product-image/product-image';
import { SectionTitle } from '../shared/Components/section-title/section-title';
import { Button } from '../shared/Components/button/button';
import { ConfirmationModal, ConfirmationOption } from '../shared/Components/confirmation-modal/confirmation-modal';
import { OutfitForm } from '../shared/Components/outfit-form/outfit-form';
import { GarmentForm } from '../shared/Components/garment-form/garment-form';
import { GarmentDTO } from '../shared/Models/garment.dto';
import { OutfitWithGarments } from '../shared/Models/outfit-with-garments.dto';
import { GarmentType } from '../shared/Enum/garment-type';
import { GarmentActions } from '../shared/Store/garment/garment.actions';
import { OutfitActions } from '../shared/Store/outfit/outfit.actions';
import { selectAllGarments } from '../shared/Store/garment/garment.selectors';
import { selectAllOutfits } from '../shared/Store/outfit/outfit.selectors';
import { GenericToast } from '../shared/Components/generic-toast/generic-toast';

export interface GarmentsByType {
  type: GarmentType;
  typeName: string;
  garments: GarmentDTO[];
}

@Component({
  selector: 'app-wardrobe',
  imports: [CommonModule, ProductContainer, ProductImage, SectionTitle, Button, GenericToast, ConfirmationModal, OutfitForm, GarmentForm],
  templateUrl: './wardrobe.html',
  styleUrl: './wardrobe.scss',
})
export class Wardrobe implements OnInit {
  garments$: Observable<GarmentDTO[]>;
  outfits$: Observable<OutfitWithGarments[]>;
  garmentsByType$: Observable<GarmentsByType[]>;

  showConfirmationModal = false;
  showGarmentConfirmationModal = false;
  showOutfitForm = false;
  showGarmentForm = false;
  selectedOutfit: OutfitWithGarments | null = null;
  selectedGarment: GarmentDTO | null = null;

  confirmationOptions: ConfirmationOption[] = [
    { label: 'Actualizar', value: 'update', variant: 'primary' },
    { label: 'Eliminar', value: 'delete', variant: 'secondary' }
  ];

  constructor(
    private store: Store
  ) {
    this.garments$ = this.store.select(selectAllGarments);
    this.outfits$ = this.store.select(selectAllOutfits);

    this.garmentsByType$ = this.garments$.pipe(
      map(garments => {
        const groupedMap = new Map<GarmentType, GarmentDTO[]>();

        garments.forEach(garment => {
          const existing = groupedMap.get(garment.type) || [];
          groupedMap.set(garment.type, [...existing, garment]);
        });

        return Array.from(groupedMap.entries())
          .map(([type, garments]) => ({
            type,
            typeName: this.getPluralTypeName(type),
            garments
          }));
      })
    );
  }

  ngOnInit() {
    this.store.dispatch(GarmentActions.loadGarments());
    this.store.dispatch(OutfitActions.loadOutfits());
  }

  createOrUpdateOutfit() {
    this.showOutfitForm = true;
  }

  onOutfitClick(outfit: OutfitWithGarments) {
    this.selectedOutfit = outfit;
    this.showConfirmationModal = true;
  }

  closeConfirmationModal() {
    this.showConfirmationModal = false;
    this.selectedOutfit = null;
  }

  handleConfirmationOption(option: string) {
    if (!this.selectedOutfit) {
      return;
    }

    if (option === 'delete') {
      this.deleteOutfit(this.selectedOutfit.id);
      this.closeConfirmationModal();
    } else if (option === 'update') {
      this.showConfirmationModal = false;
      this.createOrUpdateOutfit();
    }
  }

  deleteOutfit(outfitId: string) {
    this.store.dispatch(OutfitActions.deleteOutfit({ id: outfitId }));
  }

  closeOutfitForm() {
    this.showOutfitForm = false;
    this.selectedOutfit = null;
  }

  createGarment() {
    this.selectedGarment = null;
    this.showGarmentForm = true;
  }

  onGarmentClick(garment: GarmentDTO) {
    this.selectedGarment = garment;
    this.showGarmentConfirmationModal = true;
  }

  closeGarmentConfirmationModal() {
    this.showGarmentConfirmationModal = false;
    this.selectedGarment = null;
  }

  handleGarmentConfirmationOption(option: string) {
    if (!this.selectedGarment) {
      return;
    }

    if (option === 'delete') {
      this.deleteGarment(this.selectedGarment.id);
      this.closeGarmentConfirmationModal();
    } else if (option === 'update') {
      this.showGarmentConfirmationModal = false;
      this.showGarmentForm = true;
    }
  }

  deleteGarment(garmentId: string) {
    this.store.dispatch(GarmentActions.deleteGarment({ id: garmentId }));
  }

  closeGarmentForm() {
    this.showGarmentForm = false;
    this.selectedGarment = null;
  }

  private getPluralTypeName(type: GarmentType): string {
    const plurals: Record<GarmentType, string> = {
      [GarmentType.Camiseta]: 'Camisetas',
      [GarmentType.Camisa]: 'Camisas',
      [GarmentType.Polo]: 'Polos',
      [GarmentType.Cazadora]: 'Cazadoras',
      [GarmentType.Sudadera]: 'Sudaderas',
      [GarmentType.Chandal]: 'Chándales',
      [GarmentType.Jersey]: 'Jerséis',
      [GarmentType.Abrigo]: 'Abrigos',
      [GarmentType.Vestido]: 'Vestidos',
      [GarmentType.Pantalon]: 'Pantalones',
      [GarmentType.Falda]: 'Faldas',
      [GarmentType.Zapatos]: 'Zapatos',
      [GarmentType.Botines]: 'Botines',
      [GarmentType.Sandalias]: 'Sandalias',
      [GarmentType.Botas]: 'Botas'
    };
    return plurals[type] || type;
  }
}
