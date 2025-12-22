import { Routes } from '@angular/router';
import { LoggedGuard } from './shared/Guards/logged.guard';
import { NotLoggedGuard } from './shared/Guards/not-logged.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing/landing').then((mod) => mod.Landing),
    canActivate: [NotLoggedGuard],
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then((mod) => mod.Home),
    canActivate: [LoggedGuard],
  },
  {
    path: 'wardrobe',
    loadComponent: () => import('./wardrobe/wardrobe').then((mod) => mod.Wardrobe),
    canActivate: [LoggedGuard],
  },
  {
    path: 'calendar',
    loadComponent: () => import('./calendar-view/calendar-view').then((mod) => mod.CalendarView),
    canActivate: [LoggedGuard],
  },
  {
    path: 'achievements',
    loadComponent: () =>
      import('./achievements-view/achievements-view').then((mod) => mod.AchievementsView),
    canActivate: [LoggedGuard],
  },
];
