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
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { extractColors } from '@ltcode/color-extractor';
import { ModalSelector, ModalSection, ModalItemDisplay } from '../modal-selector/modal-selector';
import { ConfirmationModal, ConfirmationOption } from '../confirmation-modal/confirmation-modal';
import { FabricType, allFabricTypes } from '../../Enum/fabric-type';
import { Season, allSeasons } from '../../Enum/season';
import { GarmentLenght, allLenghts } from '../../Enum/garment-lenght';
import {
  GarmentType,
  GarmentSection,
  topGarments,
  bottomGarments,
  garmentIcon,
} from '../../Enum/garment-type';
import { GarmentDTO } from '../../Models/garment.dto';
import { Button } from '../button/button';
import { DropdownButton } from '../dropdown-button/dropdown-button';
import { ColorPicker } from '../color-picker/color-picker';
import { SharedService } from '../../Services/shared.service';
import { GarmentActions } from '../../Store/garment/garment.actions';
import { ImageUrlPipe } from '../../Pipes/image-url.pipe';

export interface GarmentFormData {
  garment: Omit<GarmentDTO, 'id' | 'picture'>;
  imageFile?: File;
}

@Component({
  selector: 'app-garment-form',
  imports: [
    CommonModule,
    ColorPicker,
    ModalSelector,
    ConfirmationModal,
    ReactiveFormsModule,
    Button,
    DropdownButton,
    ImageUrlPipe,
  ],
  templateUrl: './garment-form.html',
  styleUrl: './garment-form.scss',
})
export class GarmentForm implements OnInit, OnChanges {
  @Input() garment?: GarmentDTO;
  @Input() open = false;
  @Output() completed = new EventEmitter<GarmentFormData>();
  @Output() close = new EventEmitter<void>();

  isEditMode = false;

  constructor(
    private sharedService: SharedService,
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  form = new FormGroup({
    type: new FormControl<GarmentType | null>(null, { validators: [Validators.required] }),
    fabric: new FormControl<FabricType[]>([], {
      validators: [Validators.required],
      nonNullable: true,
    }),
    seasons: new FormControl<Season[]>([], {
      validators: [Validators.required],
      nonNullable: true,
    }),
    sleeve: new FormControl<GarmentLenght | null>(null, { validators: [Validators.required] }),
    mainColor: new FormControl<string>('#000000', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    pattern: new FormControl<boolean>(false, { nonNullable: true }),
    isSecondHand: new FormControl<boolean>(false, { nonNullable: true }),
    picture: new FormControl<File | null>(null, { validators: [Validators.required] }),
  });

  selectedFile: File | null = null;
  imagePreview: string | null = null;
  selectedFileName: string | null = null;
  extractedColor: string = '#000000';

  fabricOptions = allFabricTypes;
  seasonOptions = allSeasons;
  lengthOptions = allLenghts;

  selectedFabrics: FabricType[] = [];
  selectedSeasons: Season[] = [];
  selectedLength: GarmentLenght | null = null;

  fabricDropdownOpen = false;
  seasonDropdownOpen = false;
  lengthDropdownOpen = false;

  garmentModalSections: ModalSection<GarmentType>[] = [
    { title: 'Parte Superior', items: topGarments },
    { title: 'Parte Inferior', items: bottomGarments },
  ];

  garmentDisplay: ModalItemDisplay<GarmentType> = {
    getIcon: (type) => `assets/icons/garmentType_${garmentIcon(type)}.png`,
    getLabel: (type) => type,
  };

  showTypeModal = false;
  showSuccessModal = false;

  successModalOptions: ConfirmationOption[] = [
    {
      text: 'Añadir otra prenda',
      action: () => this.handleAddAnother(),
    },
    {
      text: 'Finalizar',
      action: () => this.handleFinish(),
    },
  ];

  ngOnInit() {
    if (this.garment) {
      this.isEditMode = true;
      this.populateForm(this.garment);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['garment'] && changes['garment'].currentValue) {
      this.isEditMode = true;
      this.populateForm(changes['garment'].currentValue);
    } else if (changes['garment'] && !changes['garment'].currentValue) {
      this.resetForm();
    }
  }

  private populateForm(garment: GarmentDTO) {
    this.form.patchValue({
      type: garment.type,
      fabric: garment.fabricType,
      seasons: garment.seasons,
      sleeve: garment.sleeve,
      mainColor: garment.mainColor,
      pattern: garment.pattern,
      isSecondHand: garment.isSecondHand,
    });

    this.selectedFabrics = garment.fabricType;
    this.selectedSeasons = garment.seasons;
    this.selectedLength = garment.sleeve;
    this.extractedColor = garment.mainColor;

    this.imagePreview = garment.picture;
    this.form.controls.picture.clearValidators();
    this.form.controls.picture.updateValueAndValidity();
  }

  openTypeModal() {
    this.showTypeModal = true;
  }
  closeTypeModal() {
    this.showTypeModal = false;
  }

  pickType(type: GarmentType) {
    this.form.controls.type.setValue(type);
  }

  getTypeButtonTitle(): string {
    const selectedType = this.form.controls.type.value;
    return selectedType || 'Elegir tipo de prenda';
  }

  onFabricChange(selected: FabricType[]) {
    this.selectedFabrics = selected;
    this.form.controls.fabric.setValue(selected);
  }

  onSeasonChange(selected: Season[]) {
    this.selectedSeasons = selected;
    this.form.controls.seasons.setValue(selected);
  }

  onLengthChange(selected: GarmentLenght[]) {
    if (selected.length > 0) {
      this.selectedLength = selected[0];
      this.form.controls.sleeve.setValue(this.selectedLength);
    }
  }

  onFabricDropdownToggle(isOpen: boolean) {
    if (isOpen) {
      this.seasonDropdownOpen = false;
      this.lengthDropdownOpen = false;
    }
    this.fabricDropdownOpen = isOpen;
  }

  onSeasonDropdownToggle(isOpen: boolean) {
    if (isOpen) {
      this.fabricDropdownOpen = false;
      this.lengthDropdownOpen = false;
    }
    this.seasonDropdownOpen = isOpen;
  }

  onLengthDropdownToggle(isOpen: boolean) {
    if (isOpen) {
      this.fabricDropdownOpen = false;
      this.seasonDropdownOpen = false;
    }
    this.lengthDropdownOpen = isOpen;
  }

  onMainColorChange(color: string) {
    this.form.controls.mainColor.setValue(color);
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    const maxSize = 3000 * 1024;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      this.sharedService.showToast('Solo se permiten imágenes con formato JPG, PNG y WEBP');
      this.form.controls.picture.setValue(null);
      this.selectedFile = null;
      this.imagePreview = null;
      this.selectedFileName = null;
      return;
    }

    if (file.size > maxSize) {
      this.sharedService.showToast('La imagen no puede superar los 3MB');
      this.form.controls.picture.setValue(null);
      this.selectedFile = null;
      this.imagePreview = null;
      this.selectedFileName = null;
      return;
    }

    this.selectedFile = file;
    this.form.controls.picture.setValue(file);
    this.selectedFileName = this.shorterFileName(file.name);

    try {
      const colors = (await extractColors(file, { format: 'hex', maxColors: 1 })) as string[];
      if (colors.length > 0) {
        this.extractedColor = colors[0];
        this.form.controls.mainColor.setValue(colors[0]);
        this.changeDetectorRef.markForCheck();
      }
    } catch (error) {
      console.log('No se pudo extraer el color', error);
    }

    const reader = new FileReader();
    reader.onloadend = (readerEvent: any) => {
      setTimeout(() => {
        this.imagePreview = readerEvent.target?.result as string;
        this.changeDetectorRef.markForCheck();
      }, 0);
    };
    reader.readAsDataURL(file);
  }

  private shorterFileName(fileName: string): string {
    if (fileName.length <= 20) return fileName;

    const dotIndex = fileName.lastIndexOf('.');
    const extension = fileName.substring(dotIndex);
    const maxNameLength = 20 - extension.length - 3;

    return `${fileName.substring(0, maxNameLength)}...${extension}`;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      if (!this.selectedFile && !this.isEditMode) {
        this.sharedService.showToast('Por favor, selecciona una imagen');
      }
      return;
    }

    if (!this.selectedFile && !this.isEditMode) {
      this.sharedService.showToast('Por favor, selecciona una imagen');
      return;
    }

    const formValue = this.form.getRawValue();

    if (!formValue.type) {
      this.sharedService.showToast('Por favor, selecciona un tipo de prenda');
      return;
    }

    if (!formValue.sleeve) {
      this.sharedService.showToast('Por favor, selecciona una longitud');
      return;
    }

    const garmentType = formValue.type;
    const supType = topGarments.includes(garmentType) ? GarmentSection.Top : GarmentSection.Bottom;

    const garmentData = {
      type: garmentType,
      supType: supType,
      fabricType: formValue.fabric,
      mainColor: formValue.mainColor,
      sleeve: formValue.sleeve,
      seasons: formValue.seasons,
      pattern: formValue.pattern,
      isSecondHand: formValue.isSecondHand,
      worn: 0,
      outfited: 0,
    };

    const formData: GarmentFormData = {
      garment: garmentData,
      imageFile: this.selectedFile || undefined,
    };

    if (this.isEditMode && this.garment) {
      this.updateGarment(this.garment.id, formData);
    } else {
      this.createGarment(formData);
    }
  }

  createGarment(formData: GarmentFormData) {
    if (!formData.imageFile) {
      this.sharedService.showToast('Se necesita una imagen');
      return;
    }

    this.store.dispatch(
      GarmentActions.createGarment({
        garment: formData.garment,
        imageFile: formData.imageFile,
      })
    );
    this.resetForm();
    this.showSuccessModal = true;
  }

  updateGarment(id: string, formData: GarmentFormData) {
    this.store.dispatch(
      GarmentActions.updateGarment({
        id,
        garment: formData.garment,
        imageFile: formData.imageFile,
      })
    );
    this.resetForm();
    this.close.emit();
  }

  handleAddAnother() {
    this.showSuccessModal = false;
    this.resetForm();
  }

  handleFinish() {
    this.showSuccessModal = false;
    this.closeForm();
  }

  closeForm() {
    this.resetForm();
    this.close.emit();
  }

  resetForm() {
    this.form.reset({
      type: null,
      fabric: [],
      seasons: [],
      sleeve: null,
      mainColor: '#000000',
      pattern: false,
      isSecondHand: false,
      picture: null,
    });
    this.selectedFile = null;
    this.imagePreview = null;
    this.selectedFileName = null;
    this.selectedFabrics = [];
    this.selectedSeasons = [];
    this.selectedLength = null;
    this.extractedColor = '#000000';
    this.isEditMode = false;
  }
}
