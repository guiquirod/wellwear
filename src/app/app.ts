import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AppState } from './app.reducers';
import { AuthActions } from './shared/Store/auth/auth.actions';
import { HeaderNav } from './shared/Components/header-nav/header-nav';
import { Footer } from './shared/Components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderNav, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  showNavAndFooter = false;
  authChecked$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.authChecked$ = this.store.select((state) => state.auth.authChecked);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && event.url === '/') {
        this.showNavAndFooter = false;
      } else if (event instanceof NavigationEnd && event.url !== '/') {
        this.showNavAndFooter = true;
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.loadAuthFromStorage());
    this.showNavAndFooter = this.router.url !== '/';
  }
}
