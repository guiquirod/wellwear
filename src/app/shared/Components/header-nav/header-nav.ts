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
  showMenuModal = false;
  showDeleteModal = false;
  mobileMenuOpen = false;

  profileOptions: ConfirmationOption[] = [
    {
      text: 'Cerrar sesión',
      action: () => this.handleLogout(),
    },
    {
      text: 'Borrar usuario',
      action: () => this.handleDeleteOptions(),
    },
    {
      text: 'Cancelar',
      action: () => this.handleCancel(),
    },
  ];

  deleteOptions: ConfirmationOption[] = [
    {
      text: 'Confirmar',
      action: () => this.handleDelete(),
    },
    {
      text: 'Cancelar',
      action: () => this.handleCancel(),
    },
  ];

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store
  ) {
    this.currentUrl = this.router.url;

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
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

  openProfileModal() {
    this.showMenuModal = true;
  }

  closeProfileModal() {
    this.showMenuModal = false;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  handleDeleteOptions() {
    this.showDeleteModal = true;
  }

  handleLogout() {
    this.store.dispatch(AuthActions.logout());
    this.closeProfileModal();
  }

  handleDelete() {
    this.store.dispatch(AuthActions.deleteUser());
    this.closeProfileModal();
    this.closeDeleteModal();
  }

  handleCancel() {
    this.closeProfileModal();
    this.closeDeleteModal();
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
