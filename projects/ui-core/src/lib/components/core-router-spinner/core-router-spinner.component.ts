import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'core-router-spinner',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './core-router-spinner.component.html',
})
export class CoreRouterSpinnerComponent {
  isLoading: boolean = false;
  considerSidebar: InputSignal<boolean> = input<boolean>(true);
  oneTimeUsage: InputSignal<boolean> = input<boolean>(false);
  shown = false;
  constructor(private router: Router) {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.shown = true;
        this.isLoading = false;
      }
    });
  }
}
