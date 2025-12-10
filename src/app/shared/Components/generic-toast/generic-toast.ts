import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'app-generic-toast',
  imports: [CommonModule],
  templateUrl: './generic-toast.html',
  styleUrl: './generic-toast.scss',
})
export class GenericToast implements OnDestroy {
  message = signal('');
  isVisible = signal(false);
  success = signal(false);
  private subscription: Subscription;

  constructor(private sharedService: SharedService) {
    this.subscription = this.sharedService.toast$.subscribe(({ message, success }) => {
      this.showToast(message, success);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private showToast(message: string, success: boolean = false): void {
    this.message.set(message);
    this.success.set(success)
    this.isVisible.set(true);

    setTimeout(() => {
      this.isVisible.set(false);
    }, 2500);
  }
}
