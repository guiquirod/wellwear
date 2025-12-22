import { Component } from '@angular/core';
import { Button } from '../shared/Components/button/button';
import { AuthModalComponent } from '../shared/Components/auth-modal/auth-modal.component';
import { GenericToast } from '../shared/Components/generic-toast/generic-toast';

@Component({
  selector: 'app-landing',
  imports: [Button, AuthModalComponent, GenericToast],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  loginMode= false;
  openModal = false;

  openLoginModal() {
    this.loginMode = true;
    this.openModal = true;
  }

  openRegisterModal() {
    this.loginMode = false;
    this.openModal = true;
  }

  closeAuthModal() {
    this.openModal = false;
  }
}
