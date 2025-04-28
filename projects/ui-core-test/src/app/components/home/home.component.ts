import { CommonModule, NgClass } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DefaultHeaderComponent } from '../../../../../ui-core/src/lib/layout/default-header/default-header.component';
import { CoreLoginComponent } from '../../../../../ui-core/src/lib/auth/components/core-login/core-login.component';
import { SidebarComponent } from '../../../../../ui-core/src/lib/layout/sidebar/sidebar.component';
import { BreadcrumbComponent } from '../../../../../ui-core/src/lib/components/breadcrumb/breadcrumb.component';
import { ConfigurationService } from '../../../../../ui-core/src/lib/services/ConfigurationService.service';
import { MenuService } from '../../../../../ui-core/src/lib/services/sidebar/menu.service';
import { SidebarService } from '../../../../../ui-core/src/lib/services/sidebar/sidebar.service';
import { fromEvent } from 'rxjs';
import { initFlowbite } from 'flowbite';
import Menus from '../../core/constants/static-menus';
import { CardComponent } from '../../../../../ui-core/src/lib/components/card/card.component';
import {
  provideRouter,
  RouterModule,
  RouterOutlet,
  Routes,
} from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AlertComponent } from '../../../../../ui-core/src/lib/components/alert/alert.component';
import { CoreRouterSpinnerComponent } from '../../../../../ui-core/src/lib/components/core-router-spinner/core-router-spinner.component';
import { ModalHeaderComponent } from '../../../../../ui-core/src/lib/components/modal/modal-header.component';
import { CoreToastComponent } from '../../../../../ui-core/src/lib/components/core-toast/core-toast.component';

export const dashboardRoutes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent },
];

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    NgClass,
    RouterOutlet,
    DefaultHeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    AlertComponent,
    CoreRouterSpinnerComponent,
    CoreToastComponent,
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  title = 'ui-core-test';
  collapsed: boolean = false;
  resize$ = fromEvent(window, 'resize');
  isMobileMode = false;
  constructor(
    config: ConfigurationService,
    private menuService: MenuService,
    public sidebarService: SidebarService
  ) {
    console.log(config.getAll());
  }
  ngOnInit(): void {
    this.menuService.setMenus(Menus);
  }
  ngAfterViewInit(): void {
    this.sidebarService.$isMobileMode.subscribe((isMobile) => {
      this.isMobileMode = isMobile;
    });
    this.sidebarService.$collapsed.subscribe((c) => {
      this.collapsed = c;
    });

    initFlowbite();
  }
}
