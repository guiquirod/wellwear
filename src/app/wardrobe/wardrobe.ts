import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ProductContainer } from '../shared/Components/product-container/product-container';
import { ProductImage } from '../shared/Components/product-image/product-image';
import { SectionTitle } from '../shared/Components/section-title/section-title';
import { Button } from '../shared/Components/button/button';
import {
  ConfirmationModal,
  ConfirmationOption,
} from '../shared/Components/confirmation-modal/confirmation-modal';
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
  imports: [
    CommonModule,
    ProductContainer,
    ProductImage,
    SectionTitle,
    Button,
    GenericToast,
    ConfirmationModal,
    OutfitForm,
    GarmentForm,
  ],
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

  outfitConfirmationOptions: ConfirmationOption[] = [
    {
      text: 'Actualizar',
      action: () => this.handleOutfitUpdate(),
    },
    {
      text: 'Eliminar',
      action: () => this.handleOutfitDelete(),
    },
  ];

  garmentConfirmationOptions: ConfirmationOption[] = [
    {
      text: 'Actualizar',
      action: () => this.handleGarmentUpdate(),
    },
    {
      text: 'Eliminar',
      action: () => this.handleGarmentDelete(),
    },
  ];

  constructor(private store: Store) {
    this.garments$ = this.store.select(selectAllGarments);
    this.outfits$ = this.store.select(selectAllOutfits);

    this.garmentsByType$ = this.garments$.pipe(
      map((garments) =>
        Object.values(
          garments.reduce((accumulator, garment) => {
            accumulator[garment.type] ??= {
              type: garment.type,
              typeName: this.getPluralTypeName(garment.type),
              garments: [],
            };
            accumulator[garment.type].garments.push(garment);
            return accumulator;
          }, {} as Record<GarmentType, GarmentsByType>)
        )
      )
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

  closeOutfitConfirmationModal() {
    this.showConfirmationModal = false;
    this.selectedOutfit = null;
  }

  handleOutfitUpdate() {
    if (!this.selectedOutfit) {
      return;
    }
    this.showConfirmationModal = false;
    this.createOrUpdateOutfit();
  }

  handleOutfitDelete() {
    if (!this.selectedOutfit) {
      return;
    }
    this.deleteOutfit(this.selectedOutfit.id);
    this.closeOutfitConfirmationModal();
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

  handleGarmentUpdate() {
    if (!this.selectedGarment) {
      return;
    }
    this.showGarmentConfirmationModal = false;
    this.showGarmentForm = true;
  }

  handleGarmentDelete() {
    if (!this.selectedGarment) {
      return;
    }
    this.deleteGarment(this.selectedGarment.id);
    this.closeGarmentConfirmationModal();
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
      [GarmentType.Botas]: 'Botas',
    };
    return plurals[type] || type;
  }
}
