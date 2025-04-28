import { Component, ElementRef, Input, input } from '@angular/core';
import { SidebarService } from '../../../../../services/sidebar/sidebar.service';
import { MenuService } from '../../../../../services/sidebar/menu.service';
import { Menu } from '../menu.component';
import { IsActiveMatchOptions, Router, RouterModule } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { initFlowbite } from 'flowbite';
import { NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'core-menu-item',
  imports: [RouterModule, TranslocoPipe, NgClass, FontAwesomeModule],
  templateUrl: './menu-item.component.html',
})
export class MenuItemComponent {
  collapsed: boolean = false;
  isMobileMode = false;
  hover = input<boolean>(false);
  item = input<Menu>();
  hasChild = input<boolean>(false);
  id = uuidv4();
  constructor(
    private elRef: ElementRef,
    private sidebarService: SidebarService,
    public MenuService: MenuService,
    private router: Router
  ) {
    this.sidebarService.$isMobileMode
      .pipe(takeUntilDestroyed())
      .subscribe((isMobile) => {
        this.isMobileMode = isMobile;
      });
    this.sidebarService.$collapsed.pipe(takeUntilDestroyed()).subscribe((c) => {
      this.collapsed = c;
    });
  }

  isActive(routes: string[] = []): boolean {
    const matchOptions: IsActiveMatchOptions = {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    };
    return routes?.some((route) => {
      const routeUrlTree = this.router.createUrlTree([route]);
      return this.router.isActive(routeUrlTree, matchOptions);
    });
  }

  ngAfterViewInit(): void {
    initFlowbite();
  }
}
