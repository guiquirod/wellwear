import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ModalSection, ModalItemDisplay } from '../modal-selector/modal-selector';
import { Button } from '../button/button';
import { GarmentDTO } from '../../Models/garment.dto';
import { OutfitWithGarments } from '../../Models/outfit-with-garments.dto';
import { GarmentSection } from '../../Enum/garment-type';
import { selectAllGarments } from '../../Store/garment/garment.selectors';
import { OutfitActions } from '../../Store/outfit/outfit.actions';
import { SharedService } from '../../Services/shared.service';
import { ColorApiService } from '../../Services/color-api.service';
import { ImageUrlPipe } from '../../Pipes/image-url.pipe';
import { FabricType } from '../../Enum/fabric-type';

@Component({
  selector: 'app-outfit-form',
  imports: [CommonModule, Button, ImageUrlPipe],
  templateUrl: './outfit-form.html',
  styleUrl: './outfit-form.scss',
})
export class OutfitForm implements OnInit, OnChanges {
  @Input() open = false;
  @Input() outfitToEdit: OutfitWithGarments | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() completed = new EventEmitter<void>();

  selectedGarments: GarmentDTO[] = [];
  allGarments: GarmentDTO[] = [];
  showGarmentModal = false;
  showAddGarmentModal = false;
  isEditMode = false;

  garmentModalSections: ModalSection<GarmentDTO>[] = [];
  allGarmentsModalSections: ModalSection<GarmentDTO>[] = [];

  garmentDisplay: ModalItemDisplay<GarmentDTO> = {
    getIcon: (garment) => garment.picture,
    getLabel: (garment) => garment.type,
  };

  constructor(
    private store: Store,
    private sharedService: SharedService,
    private colorApiService: ColorApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.store.select(selectAllGarments).subscribe((garments) => {
      this.allGarments = garments;
      this.updateGarmentModalSections();
      this.populateFromOutfit();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['outfitToEdit']) {
      this.populateFromOutfit();
    }
  }

  private populateFromOutfit() {
    if (this.outfitToEdit) {
      this.isEditMode = true;
      this.selectedGarments = [...this.outfitToEdit.garments];
    } else {
      this.resetForm();
    }
  }

  updateGarmentModalSections() {
    const topGarments = this.allGarments.filter((g) => g.supType === GarmentSection.Top);
    const bottomGarments = this.allGarments.filter((g) => g.supType === GarmentSection.Bottom);

    this.garmentModalSections = [
      { title: 'Parte Superior', items: topGarments },
      { title: 'Parte Inferior', items: bottomGarments },
    ];

    this.allGarmentsModalSections = [{ title: 'Todas las Prendas', items: this.allGarments }];
  }

  openGarmentModal() {
    this.showGarmentModal = true;
  }

  closeGarmentModal() {
    this.showGarmentModal = false;
  }

  openAddGarmentModal() {
    this.showAddGarmentModal = true;
  }

  closeAddGarmentModal() {
    this.showAddGarmentModal = false;
  }

  toggleGarmentSelection(garment: GarmentDTO) {
    const index = this.selectedGarments.findIndex((g) => g.id === garment.id);
    if (index !== -1) {
      this.selectedGarments = this.selectedGarments.filter((g) => g.id !== garment.id);
    } else {
      this.selectedGarments = [...this.selectedGarments, garment];
    }
  }

  isGarmentSelected(garmentId: string): boolean {
    return this.selectedGarments.some((g) => g.id === garmentId);
  }

  fabricsToString(fabrics: FabricType[]): string {
    return fabrics.map((word) => word.toUpperCase()).join('/');
  }

  isLeastUsed(garment: GarmentDTO): boolean {
    if (this.allGarments.length === 0) return false;
    const avgOutfited =
      this.allGarments.reduce((sum, g) => sum + g.outfited, 0) / this.allGarments.length;
    return garment.outfited < avgOutfited;
  }

  saveOutfit() {
    if (this.selectedGarments.length === 0) {
      this.sharedService.showToast(
        'Por favor, selecciona al menos una prenda para crear un conjunto'
      );
      return;
    }

    const garmentIds = this.selectedGarments.map((g) => g.id);

    if (this.isEditMode && this.outfitToEdit) {
      this.store.dispatch(
        OutfitActions.updateOutfit({
          id: this.outfitToEdit.id,
          garmentIds,
        })
      );
      this.sharedService.showToast('¡Conjunto actualizado!', true);
    } else {
      this.store.dispatch(OutfitActions.createOutfit({ garmentIds }));
    }

    this.resetForm();
    this.completed.emit();
    this.close.emit();
  }

  cancel() {
    this.resetForm();
    this.close.emit();
  }

  resetForm() {
    this.selectedGarments = [];
    this.showGarmentModal = false;
    this.isEditMode = false;
  }

  cantRecommend(): boolean {
    return this.selectedGarments.length !== 1;
  }

  recommendGarment() {
    const baseGarment = this.selectedGarments[0];
    if (!baseGarment) {
      return;
    }

    const targetSection =
      baseGarment.supType === GarmentSection.Top ? GarmentSection.Bottom : GarmentSection.Top;

    this.colorApiService
      .recommendComplementaryGarment(baseGarment, this.allGarments, targetSection)
      .subscribe({
        next: (garmentId) => {
          if (!garmentId) {
            this.sharedService.showToast(
              'No se encontró una prenda compatible para esta temporada'
            );
            return;
          }
          const recommended = this.allGarments.find((g) => g.id === garmentId);
          if (recommended) {
            this.selectedGarments = [...this.selectedGarments, recommended];
            this.changeDetectorRef.detectChanges();
            this.sharedService.showToast('¡Prenda recomendada añadida!', true);
          } else {
            this.sharedService.showToast('No se encontró una prenda compatible');
          }
        },
        error: () => {
          this.sharedService.showToast('Error al obtener recomendación');
        },
      });
  }
}
