import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { OutfitWithGarments } from '../../Models/outfit-with-garments.dto';

export const OutfitActions = createActionGroup({
  source: 'Outfit',
  events: {
    'Load Outfits': emptyProps(),
    'Load Today Outfits': emptyProps(),
    'Create Outfit': props<{ garmentIds: string[] }>(),
    'Update Outfit': props<{ id: string; garmentIds: string[] }>(),
    'Delete Outfit': props<{ id: string }>(),
    'Wear Outfit': props<{ id: string }>(),
    'Unwear Outfit': props<{ id: string; date: string }>(),
  },
});

export const OutfitApiActions = createActionGroup({
  source: 'Outfit API',
  events: {
    'Load Outfits Success': props<{ outfits: OutfitWithGarments[] }>(),
    'Load Outfits Failure': props<{ error: string }>(),
    'Load Today Outfits Success': props<{ todayOutfits: OutfitWithGarments[] }>(),
    'Load Today Outfits Failure': props<{ error: string }>(),
    'Create Outfit Success': emptyProps(),
    'Create Outfit Failure': props<{ error: string }>(),
    'Update Outfit Success': emptyProps(),
    'Update Outfit Failure': props<{ error: string }>(),
    'Delete Outfit Success': props<{ id: string }>(),
    'Delete Outfit Failure': props<{ error: string }>(),
    'Wear Outfit Success': props<{ id: string }>(),
    'Wear Outfit Failure': props<{ error: string }>(),
    'Unwear Outfit Success': props<{ id: string; date: string }>(),
    'Unwear Outfit Failure': props<{ error: string }>(),
  },
});
