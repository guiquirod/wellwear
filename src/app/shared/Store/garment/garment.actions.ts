import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { GarmentDTO } from '../../Models/garment.dto';

export const GarmentActions = createActionGroup({
  source: 'Garment',
  events: {
    'Load Garments': emptyProps(),
    'Create Garment': props<{ garment: Omit<GarmentDTO, 'id' | 'picture'>; imageFile: File }>(),
    'Update Garment': props<{ id: string; garment: Omit<GarmentDTO, 'id' | 'picture'>; imageFile?: File }>(),
    'Delete Garment': props<{ id: string }>(),
  },
});

export const GarmentApiActions = createActionGroup({
  source: 'Garment API',
  events: {
    'Load Garments Success': props<{ garments: GarmentDTO[] }>(),
    'Load Garments Failure': props<{ error: string }>(),
    'Create Garment Success': props<{ garment: GarmentDTO }>(),
    'Create Garment Failure': props<{ error: string }>(),
    'Update Garment Success': props<{ garment: GarmentDTO }>(),
    'Update Garment Failure': props<{ error: string }>(),
    'Delete Garment Success': props<{ id: string }>(),
    'Delete Garment Failure': props<{ error: string }>(),
  },
});
