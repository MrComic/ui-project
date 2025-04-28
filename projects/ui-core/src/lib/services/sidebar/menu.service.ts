import { BehaviorSubject, fromEvent } from 'rxjs';
import { ElementRef, Injectable } from '@angular/core';
import { Menu } from '../../layout/sidebar/menu/menu/menu.component';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menus = new BehaviorSubject<Menu[]>([]);
  constructor() {}

  setMenus(menus: Menu[]) {
    this.menus.next(menus);
  }
}
