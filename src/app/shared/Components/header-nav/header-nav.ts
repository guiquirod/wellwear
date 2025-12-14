import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AuthActions } from '../../Store/auth/auth.actions';
import { ConfirmationModal, ConfirmationOption } from '../confirmation-modal/confirmation-modal';

@Component({
  selector: 'app-header-nav',
  imports: [CommonModule, ConfirmationModal],
  templateUrl: './header-nav.html',
  styleUrl: './header-nav.scss',
})
export class HeaderNav {
  currentUrl: string = '';
  showLogoutModal = false;
  mobileMenuOpen = false;

  logoutOptions: ConfirmationOption[] = [
    {
      text: 'Confirmar',
      action: () => this.handleConfirm()
    },
    {
      text: 'Cancelar',
      action: () => this.handleCancel()
    }
  ];

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store
  ) {
    this.currentUrl = this.router.url;

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentUrl = this.router.url;
        this.changeDetectorRef.markForCheck();
      });
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.currentUrl === route;
  }

  openLogoutModal() {
    this.showLogoutModal = true;
  }

  closeLogoutModal() {
    this.showLogoutModal = false;
  }

  handleConfirm() {
    this.store.dispatch(AuthActions.logout());
    this.closeLogoutModal();
  }

  handleCancel() {
    this.closeLogoutModal();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  navigateAndClose(route: string) {
    this.navigate(route);
    this.closeMobileMenu();
  }
}
