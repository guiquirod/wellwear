import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AppState } from '../../app.reducers';

@Injectable({
  providedIn: 'root',
})
export class NotLoggedGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store
      .select((state) => state.auth)
      .pipe(
        filter((auth) => auth.authChecked),
        map((auth) => auth.isAuthenticated ? this.router.createUrlTree(['/home']) : true),
      );
  }
}
