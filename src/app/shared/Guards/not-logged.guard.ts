import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from '../../app.reducers';

@Injectable({
  providedIn: 'root',
})
export class NotLoggedGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store
      .select((state) => state.auth)
      .pipe(
        filter((auth) => auth.authChecked),
        map((auth) => {
          if (!auth.isAuthenticated) {
            return true;
          } else {
            this.router.navigate(['/home']);
            return false;
          }
        })
      );
  }
}
