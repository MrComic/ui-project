import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  HostListener,
  Input,
  TemplateRef,
} from '@angular/core';
import { DrawerService } from './services/drawer.service';
import { initFlowbite } from 'flowbite';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'core-drawer-navigation',
  imports: [CommonModule],
  standalone: true,
  styles: [
    `
      #drawer-default-container {
        transition: transform 0.3s ease-in-out;
      }
    `,
  ],
  templateUrl: './core-drawer-navigation.component.html',
})
export class CoreDrawerNavigationComponent implements AfterViewInit {
  @Input() drawerId: string = 'drawer-default';
  @Input() title: string = '';
  drawerOpen: boolean = false;

  constructor(private drawerService: DrawerService) {
    this.drawerService.drawerState.pipe(takeUntilDestroyed()).subscribe(() => {
      this.toggleDrawer();
    });
  }
  ngAfterViewInit(): void {
    initFlowbite();
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
    const drawer = document.getElementById(this.drawerId + '-container');
    const backdrop = document.getElementById(this.drawerId);
    if (drawer && backdrop) {
      drawer.classList.toggle('-translate-x-full');
      backdrop.classList.toggle('hidden');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const drawer = document.getElementById(this.drawerId + '-container');
    const button = document.getElementById(this.drawerId + '-button');
    if (
      this.drawerOpen &&
      drawer &&
      !drawer.contains(target) &&
      button &&
      !button.contains(target)
    ) {
      this.toggleDrawer();
    }
  }
}
