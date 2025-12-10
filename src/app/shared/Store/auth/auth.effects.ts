import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, tap } from 'rxjs/operators';
import { SharedService } from '../../Services/shared.service';
import { AuthActions, AuthApiActions } from './auth.actions';
import { AuthService } from '../../Services/auth.service';

@Injectable()
export class AuthEffects {
  private responseOK: boolean = false;

  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private sharedService = inject(SharedService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((user) => {
            return AuthApiActions.loginSuccess({ user });
          }),
          catchError((error) => {
            return of(AuthApiActions.loginFailure({ error: error.message }));
          }),
          finalize(() => {
            if (this.responseOK) {
              this.router.navigateByUrl('home');
            }
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginSuccess),
        tap(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginFailure),
        tap(({ error }) => {
          this.responseOK = false;
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ credentials }) =>
        this.authService.register(credentials).pipe(
          map((user) => AuthApiActions.registerSuccess({ user })),
          catchError((error) =>
            of(AuthApiActions.registerFailure({ error: error.message }))
          ),
          finalize(() => {
            if (this.responseOK) {
              this.router.navigateByUrl('home');
            }
          })
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.registerSuccess),
        tap(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.registerFailure),
        tap(({ error }) => {
          this.responseOK = false;
          this.sharedService.showToast(error);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => AuthApiActions.logoutSuccess()),
          tap(() => {
            this.router.navigateByUrl('/');
          }),
          catchError(() => of(AuthApiActions.logoutSuccess()))
        )
      )
    )
  );

  loadAuthFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadAuthFromStorage),
      exhaustMap(() => {
        return this.authService.checkSessionState().pipe(
          map((user) => {
            return AuthApiActions.loadAuthFromStorageSuccess({ user });
          }),
          catchError(() => {
            return of(AuthApiActions.logoutSuccess());
          })
        );
      })
    )
  );
}
