import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from '../models/Notification.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notifications$ = this.notificationSubject.asObservable();

  notify(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    this.notificationSubject.next({ message, type, id: uuidv4() });
  }
}
