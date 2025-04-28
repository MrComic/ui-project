import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  InputSignal,
  signal,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { SimplebarAngularModule } from 'simplebar-angular';
import { SidebarService } from '../../../../services/sidebar/sidebar.service';
import { MenuService } from '../../../../services/sidebar/menu.service';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-menu',
  imports: [SimplebarAngularModule, MenuItemComponent, CommonModule],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements AfterViewInit {
  collapsed: boolean = false;
  resize$ = fromEvent(window, 'resize');
  isMobileMode = false;
  hover = input<boolean>(false);
  menus = signal<Menu[]>([]);
  constructor(
    private sidebarService: SidebarService,
    public MenuService: MenuService
  ) {}
  ngAfterViewInit(): void {
    this.sidebarService.$isMobileMode.subscribe((isMobile) => {
      this.isMobileMode = isMobile;
    });
    this.sidebarService.$collapsed.subscribe((c) => {
      this.collapsed = c;
    });
    this.MenuService.menus.subscribe((arg) => this.menus.set(arg));
  }
}

export class Menu {
  constructor(
    public label: string = ' ',
    public route?: Array<string>,
    public icon?: any,
    public childs?: Menu[]
  ) {}
}
