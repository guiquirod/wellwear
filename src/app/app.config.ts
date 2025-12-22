import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appReducers } from './app.reducers';
import { AuthEffects } from './shared/Store/auth/auth.effects';
import { GarmentEffects } from './shared/Store/garment/garment.effects';
import { OutfitEffects } from './shared/Store/outfit/outfit.effects';
import { AchievementEffects } from './shared/Store/achievement/achievement.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideStore(appReducers),
    provideEffects(AuthEffects, GarmentEffects, OutfitEffects, AchievementEffects),
  ],
};
