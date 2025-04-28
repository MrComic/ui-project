import { Component, signal } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { CommonModule } from '@angular/common';
import { Notification } from './models/Notification.model';
import {
  faCheck,
  faExclamation,
  faExclamationCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'core-toast',
  imports: [CommonModule, FontAwesomeModule],
  standalone: true,
  templateUrl: './core-toast.component.html',
  styleUrl: './core-toast.component.css',
})
export class CoreToastComponent {
  notifications = signal<Notification[]>([]);
  checkIcon = faCheck;
  errorIcon = faExclamation;
  infoIcon = faExclamationCircle;
  warningIcon = faExclamationTriangle;
  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe((notification) => {
      this.notifications.set([...this.notifications(), notification]);
      setTimeout(() => {
        this.notifications().shift();
        this.notifications.set([...this.notifications()]);
      }, 5000);
    });
  }

  dismissNotification(index: number) {
    this.notifications.set(
      this.notifications().filter((p) => p.id != this.notifications()[index].id)
    );
  }
}
