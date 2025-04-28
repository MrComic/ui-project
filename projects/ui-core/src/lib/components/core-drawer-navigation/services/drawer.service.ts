import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  public drawerState = new EventEmitter();
  isOpen = false;

  toggleDrawer() {
    this.isOpen = !this.isOpen;
    this.drawerState.next(this.isOpen);
  }
}
