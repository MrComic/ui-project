import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { initFlowbite } from 'flowbite';
import { SimpleBarOptions } from 'simplebar-core';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { fromEvent } from 'rxjs';
import { ElementRef, Input } from '@angular/core';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { MenuComponent } from './menu/menu/menu.component';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { UserData } from '../../auth/models/user-data.model';
import { ConfigurationService } from '../../services/ConfigurationService.service';

@Component({
  selector: 'core-sidebar',
  imports: [ClickOutsideDirective, MenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements AfterViewInit, OnDestroy {
  width: string = '';
  collapsed: boolean = false;
  resize$ = fromEvent(window, 'resize');
  isMobileMode = false;
  hover: boolean = false;
  user: UserData | null = null;
  config: any;
  image: any;
  showContent() {
    if (this.collapsed) {
      this.hover = true;
    }
    this.sidebarService.setShowContent(true);
  }

  hideContent() {
    if (this.collapsed) {
      this.hover = false;
    }
    this.sidebarService.setShowContent(false);
  }

  onClickOutside(event: Event) {
    if (this.isMobileMode) {
      if (this.collapsed == false) {
        this.sidebarService.toggleCollapsed();
      }
    }
  }

  constructor(
    private elRef: ElementRef,
    private router: Router,
    private authService: AuthService,
    private configService: ConfigurationService,
    private sidebarService: SidebarService
  ) {
    this.config = this.configService.getAll();
    this.user = this.authService.getUserDataFromToken();
  }
  ngOnDestroy(): void {
    URL.revokeObjectURL(this.image);
  }
  convertBlobToImageUrl(blob: Blob): string {
    return URL.createObjectURL(blob);
  }

  ngAfterViewInit(): void {
    this.sidebarService.$isMobileMode.subscribe((isMobile) => {
      this.isMobileMode = isMobile;
    });
    this.sidebarService.$collapsed.subscribe((c) => {
      this.collapsed = c;
    });
    this.authService.getUserImage(this.user?.username || '').subscribe({
      next: (img) => {
        this.image = this.convertBlobToImageUrl(img);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
