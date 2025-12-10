import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';
import { AuthActions } from '../../Store/auth/auth.actions';
import { AuthDTO } from '../../Models/auth.dto';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {
  @Input() open = false;
  @Input() isLoginMode: boolean = true;

  loginEmail: FormControl;
  registerEmail: FormControl;

  loginPassword: FormControl;
  registerPassword: FormControl;
  name: FormControl;

  loginForm: FormGroup;
  registerForm: FormGroup;

  @Output() closeModal = new EventEmitter<void>();
  @Output() authSuccess = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.loginEmail = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
    ]);
      
    this.registerEmail = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
    ]);

    this.loginPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16)
    ]);
        
    this.registerPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16)
    ]);

    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.loginEmail,
      password: this.loginPassword
    });

    this.registerForm = this.formBuilder.group({
      name: this.name,
      email: this.registerEmail,
      password: this.registerPassword
    });
  }

  ngOnInit(): void {
    this.store.select(state => state.auth.isAuthenticated)
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.authSuccess.emit();
          this.closeModal.emit();
        }
      });
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.loginForm.reset();
    this.registerForm.reset();
  }

  login(): void {
    const credentials: AuthDTO = {
      email: this.loginEmail.value,
      password: this.loginPassword.value
    };

    this.store.dispatch(AuthActions.login({ credentials }));
  }

  register(): void {
    const credentials: AuthDTO = {
      name: this.name.value,
      email: this.registerEmail.value,
      password: this.registerPassword.value
    };

    this.store.dispatch(AuthActions.register({ credentials }));
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
