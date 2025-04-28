import { BehaviorSubject, fromEvent } from 'rxjs';
import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  $collapsed = new BehaviorSubject<boolean>(false);
  $showContent = new BehaviorSubject<boolean>(true);
  $isMobileMode = new BehaviorSubject<boolean>(false);
  private resize$ = fromEvent(window, 'resize');
  constructor() {
    this.resize$.subscribe((size) => this.checkWidowWidth(window));
    this.checkWidowWidth(window);
  }

  private checkWidowWidth(w: Window) {
    if (w['innerWidth'] < 1023) {
      this.setCollapsed(true);
      this.$isMobileMode.next(true);
    } else {
      this.setCollapsed(false);
      this.$isMobileMode.next(false);
    }
  }

  setCollapsed(collapsed: boolean) {
    this.$collapsed.next(collapsed);
    this.$showContent.next(!collapsed);
  }

  setShowContent(value: boolean) {
    this.$showContent.next(value);
  }

  toggleCollapsed() {
    const collapsed = this.$collapsed.getValue();
    this.setCollapsed(!collapsed);
  }
}
