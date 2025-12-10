import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { GarmentActions, GarmentApiActions } from './garment.actions';
import { OutfitActions } from '../outfit/outfit.actions';
import { GarmentService } from '../../Services/garment.service';
import { SharedService } from '../../Services/shared.service';

@Injectable()
export class GarmentEffects {
  private actions$ = inject(Actions);
  private garmentService = inject(GarmentService);
  private sharedService = inject(SharedService);

  loadGarments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarmentActions.loadGarments),
      exhaustMap(() =>
        this.garmentService.getGarments().pipe(
          map((garments) => GarmentApiActions.loadGarmentsSuccess({ garments })),
          catchError((error) =>
            of(GarmentApiActions.loadGarmentsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadGarmentsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GarmentApiActions.loadGarmentsFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  deleteGarment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarmentActions.deleteGarment),
      exhaustMap(({ id }) =>
        this.garmentService.deleteGarment(id).pipe(
          map(() => {
            this.sharedService.showToast('Prenda eliminada correctamente', true);
            return GarmentApiActions.deleteGarmentSuccess({ id });
          }),
          catchError((error) =>
            of(GarmentApiActions.deleteGarmentFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteGarmentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GarmentApiActions.deleteGarmentFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  createGarment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarmentActions.createGarment),
      exhaustMap(({ garment, imageFile }) =>
        this.garmentService.createGarment(garment, imageFile).pipe(
          map((response) => GarmentApiActions.createGarmentSuccess({ garment: response.data! })),
          catchError((error) =>
            of(GarmentApiActions.createGarmentFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createGarmentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GarmentApiActions.createGarmentFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  updateGarment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarmentActions.updateGarment),
      exhaustMap(({ garment }) =>
        this.garmentService.updateGarment(garment.id, garment).pipe(
          map((response) => GarmentApiActions.updateGarmentSuccess({ garment: response.data! })),
          catchError((error) =>
            of(GarmentApiActions.updateGarmentFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateGarmentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GarmentApiActions.updateGarmentFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  reloadOutfitsOnGarmentChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarmentApiActions.deleteGarmentSuccess, GarmentApiActions.updateGarmentSuccess),
      map(() => OutfitActions.loadOutfits())
    )
  );
}
