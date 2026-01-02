import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './app.reducers';
import { AuthActions } from './shared/Store/auth/auth.actions';
import { HeaderNav } from './shared/Components/header-nav/header-nav';
import { Footer } from './shared/Components/footer/footer';
import { Spinner } from './shared/Components/spinner/spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderNav, Footer, Spinner, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  showNavAndFooter = false;
  authChecked$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.store.dispatch(AuthActions.loadAuthFromStorage());
    this.authChecked$ = this.store.select((state) => state.auth.authChecked);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && event.url === '/landing') {
        this.showNavAndFooter = false;
      } else if (event instanceof NavigationEnd && event.url !== '/landing') {
        this.showNavAndFooter = true;
      }
    });
  }

  ngOnInit(): void {
    this.showNavAndFooter = this.router.url !== '/landing';
  }
}
