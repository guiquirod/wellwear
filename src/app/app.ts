import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';
import { AuthActions } from './shared/Store/auth/auth.actions';
import { HeaderNav } from './shared/Components/header-nav/header-nav';
import { Footer } from './shared/Components/footer/footer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderNav, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected showNavigation = false;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.showNavigation = event.url !== '/';
        }
      });
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.loadAuthFromStorage());
    this.showNavigation = this.router.url !== '/';
  }
}
