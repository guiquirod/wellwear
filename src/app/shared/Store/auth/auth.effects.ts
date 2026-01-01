import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { SharedService } from '../../Services/shared.service';
import { AuthActions, AuthApiActions } from './auth.actions';
import { AuthService } from '../../Services/auth.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private sharedService = inject(SharedService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUser),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((response) => AuthApiActions.loginSuccess({ user: response.data! })),
          catchError((error) => of(AuthApiActions.loginFailure({ error: error.error?.message })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginSuccess),
        tap(() => {
          this.router.navigateByUrl('home');
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUser),
      exhaustMap(({ credentials }) =>
        this.authService.register(credentials).pipe(
          map((response) => AuthApiActions.registerSuccess({ user: response.data! })),
          catchError((error) => of(AuthApiActions.registerFailure({ error: error.error?.message })))
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.registerSuccess),
        tap(() => {
          this.router.navigateByUrl('home');
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.registerFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutUser),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => AuthApiActions.logoutSuccess()),
          catchError((error) => of(AuthApiActions.logoutFailure({ error: error.error?.message })))
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.logoutSuccess),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  logoutFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.logoutFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.deleteUser),
      exhaustMap(() =>
        this.authService.deleteUser().pipe(
          map(() => AuthApiActions.deleteUserSuccess()),
          catchError((error) =>
            of(AuthApiActions.deleteUserFailure({ error: error.error?.message }))
          )
        )
      )
    )
  );

  deleteUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.deleteUserSuccess),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  deleteUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.deleteUserFailure),
        tap(({ error }) => {
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  loadAuthFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadAuthFromStorage),
      exhaustMap(() => {
        return this.authService.checkSessionState().pipe(
          map((response) => {
            return AuthApiActions.loadAuthFromStorageSuccess({ user: response.data! });
          }),
          catchError(() => {
            return of(AuthApiActions.loadAuthFromStorageFailure());
          })
        );
      })
    )
  );
}
