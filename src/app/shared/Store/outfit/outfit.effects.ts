import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { OutfitActions, OutfitApiActions } from './outfit.actions';
import { GarmentApiActions } from '../garment/garment.actions';
import { AchievementActions } from '../achievement/achievement.actions';
import { OutfitService } from '../../Services/outfit.service';
import { SharedService } from '../../Services/shared.service';

@Injectable()
export class OutfitEffects {
  private actions$ = inject(Actions);
  private outfitService = inject(OutfitService);
  private sharedService = inject(SharedService);

  loadOutfits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OutfitActions.loadOutfits),
      exhaustMap(() =>
        this.outfitService.getOutfits().pipe(
          map((response) => OutfitApiActions.loadOutfitsSuccess({ outfits: response.data! })),
          catchError((error) =>
            of(OutfitApiActions.loadOutfitsFailure({ error: error.error?.message }))
          )
        )
      )
    )
  );

  loadOutfitsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OutfitApiActions.loadOutfitsFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  loadTodayOutfits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OutfitActions.loadTodayOutfits),
      exhaustMap(({ date }) => {
        const queryDate = date ?? new Date().toISOString().split('T')[0];
        return this.outfitService.getOutfits(queryDate).pipe(
          map((response) =>
            OutfitApiActions.loadTodayOutfitsSuccess({ todayOutfits: response.data! })
          ),
          catchError((error) =>
            of(OutfitApiActions.loadTodayOutfitsFailure({ error: error.error?.message }))
          )
        );
      })
    )
  );

  loadTodayOutfitsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OutfitApiActions.loadTodayOutfitsFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  createOutfit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OutfitActions.createOutfit),
      exhaustMap(({ garmentIds }) =>
        this.outfitService.createOutfit(garmentIds).pipe(
          map(() => OutfitApiActions.createOutfitSuccess()),
          catchError((error) =>
            of(OutfitApiActions.createOutfitFailure({ error: error.error?.message }))
          )
        )
      )
    )
  );

  createOutfitSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OutfitApiActions.createOutfitSuccess),
      tap(() => {
        this.sharedService.showToast('¡Conjunto creado!', true);
      }),
      map(() => OutfitActions.loadOutfits())
    )
  );

  createOutfitFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OutfitApiActions.createOutfitFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  updateOutfit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OutfitActions.updateOutfit),
      exhaustMap(({ id, garmentIds }) =>
        this.outfitService.updateOutfit(id, garmentIds).pipe(
          map(() => OutfitApiActions.updateOutfitSuccess()),
          catchError((error) =>
            of(OutfitApiActions.updateOutfitFailure({ error: error.error?.message }))
          )
        )
      )
    )
  );

  updateOutfitSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OutfitApiActions.updateOutfitSuccess),
      tap(() => {
        this.sharedService.showToast('¡Conjunto actualizado!', true);
      }),
      map(() => OutfitActions.loadOutfits())
    )
  );

  updateOutfitFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OutfitApiActions.updateOutfitFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  deleteOutfit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OutfitActions.deleteOutfit),
      exhaustMap(({ id }) =>
        this.outfitService.deleteOutfit(id).pipe(
          map(() => {
            this.sharedService.showToast('Conjunto eliminado correctamente', true);
            return OutfitApiActions.deleteOutfitSuccess({ id });
          }),
          catchError((error) =>
            of(OutfitApiActions.deleteOutfitFailure({ error: error.error?.message }))
          )
        )
      )
    )
  );

  deleteOutfitFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OutfitApiActions.deleteOutfitFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  wearOutfit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OutfitActions.wearOutfit),
      exhaustMap(({ id }) =>
        this.outfitService.wearOutfit(id).pipe(
          map(() => {
            this.sharedService.showToast('¡Conjunto añadido a hoy!', true);
            return OutfitApiActions.wearOutfitSuccess({ id });
          }),
          catchError((error) =>
            of(OutfitApiActions.wearOutfitFailure({ error: error.error?.message }))
          )
        )
      )
    )
  );

  wearOutfitSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OutfitApiActions.wearOutfitSuccess),
      map(() => OutfitActions.loadTodayOutfits({}))
    )
  );

  wearOutfitFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OutfitApiActions.wearOutfitFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  unwearOutfit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OutfitActions.unwearOutfit),
      exhaustMap(({ id, date }) =>
        this.outfitService.unwearOutfit(id, date).pipe(
          map(() => OutfitApiActions.unwearOutfitSuccess({ id, date })),
          catchError((error) =>
            of(OutfitApiActions.unwearOutfitFailure({ error: error.error?.message }))
          )
        )
      )
    )
  );

  unwearOutfitSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OutfitApiActions.unwearOutfitSuccess),
        tap(() => {
          this.sharedService.showToast('Conjunto eliminado de hoy', true);
        })
      ),
    { dispatch: false }
  );

  unwearOutfitFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OutfitApiActions.unwearOutfitFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  reloadOutfitsOnGarmentUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarmentApiActions.updateGarmentSuccess),
      map(() => OutfitActions.loadOutfits())
    )
  );

  checkAchievementsOnOutfitChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OutfitApiActions.createOutfitSuccess, OutfitApiActions.updateOutfitSuccess),
      map(() => AchievementActions.checkAutomaticAchievements())
    )
  );
}
