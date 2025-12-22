import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AchievementActions, AchievementApiActions } from './achievement.actions';
import { AchievementService } from '../../Services/achievement.service';
import { SharedService } from '../../Services/shared.service';

@Injectable()
export class AchievementEffects {
  private actions$ = inject(Actions);
  private achievementService = inject(AchievementService);
  private sharedService = inject(SharedService);

  loadUserLevel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AchievementActions.loadUserLevel),
      exhaustMap(() =>
        this.achievementService.getUserAchievement().pipe(
          map((response) =>
            AchievementApiActions.loadUserLevelSuccess({ userAchievement: response.data! })
          ),
          catchError((error) =>
            of(AchievementApiActions.loadUserLevelFailure({ error: error.error?.message }))
          )
        )
      )
    )
  );

  loadUserLevelFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AchievementApiActions.loadUserLevelFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  loadAchievements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AchievementActions.loadAchievements),
      exhaustMap(() =>
        this.achievementService.getAchievements().pipe(
          map((response) =>
            AchievementApiActions.loadAchievementsSuccess({ achievements: response.data! })
          ),
          catchError((error) =>
            of(AchievementApiActions.loadAchievementsFailure({ error: error.error?.message }))
          )
        )
      )
    )
  );

  loadAchievementsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AchievementApiActions.loadAchievementsFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  completeAchievement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AchievementActions.completeAchievement),
      exhaustMap(({ achievementId }) =>
        this.achievementService.completeAchievement(achievementId).pipe(
          map((response) => {
            return AchievementApiActions.completeAchievementSuccess({
              userAchievement: response.data!,
            });
          }),
          catchError((error) =>
            of(AchievementApiActions.completeAchievementFailure({ error: error.error?.message }))
          )
        )
      )
    )
  );

  completeAchievementSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AchievementApiActions.completeAchievementSuccess),
      map(() => AchievementActions.loadAchievements())
    )
  );

  completeAchievementFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AchievementApiActions.completeAchievementFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  checkAutomaticAchievements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AchievementActions.checkAutomaticAchievements),
      exhaustMap(() =>
        this.achievementService.checkAutomaticAchievements().pipe(
          map((response) =>
            AchievementApiActions.checkAutomaticAchievementsSuccess({
              completedAchievements: response.data!.completedAchievements,
            })
          ),
          catchError((error) =>
            of(
              AchievementApiActions.checkAutomaticAchievementsFailure({
                error: error.error?.message,
              })
            )
          )
        )
      )
    )
  );

  checkAutomaticAchievementsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AchievementApiActions.checkAutomaticAchievementsSuccess),
      map(() => AchievementActions.loadAchievements())
    )
  );

  checkAutomaticAchievementsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AchievementApiActions.checkAutomaticAchievementsFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );
}
