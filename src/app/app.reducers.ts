import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './shared/Store/auth/auth.reducer';
import { GarmentState, garmentReducer } from './shared/Store/garment/garment.reducer';
import { OutfitState, outfitReducer } from './shared/Store/outfit/outfit.reducer';
import { AchievementState, achievementReducer } from './shared/Store/achievement/achievement.reducer';

export interface AppState {
  auth: AuthState;
  garment: GarmentState;
  outfit: OutfitState;
  achievement: AchievementState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  garment: garmentReducer,
  outfit: outfitReducer,
  achievement: achievementReducer,
};
