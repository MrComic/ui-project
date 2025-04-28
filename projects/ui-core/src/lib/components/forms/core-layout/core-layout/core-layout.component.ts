import {
  AfterContentInit,
  AfterViewInit,
  Component,
  effect,
  input,
  InputSignal,
  OnInit,
  signal,
} from '@angular/core';
import { CoreLayoutItemComponent } from '../core-layout-item/core-layout-item.component';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'core-layout',
  imports: [CommonModule],
  templateUrl: './core-layout.component.html',
})
export class CoreLayoutComponent implements AfterViewInit {
  gridClass(): string {
    let i = `grid gap-4 ${this.getResponsiveCols(this.cols())}`;
    return i;
  }

  col = signal('');

  ngAfterViewInit(): void {
    this.col.set(this.gridClass());
  }

  // Method to generate responsive Tailwind classes
  private getResponsiveCols(cols: number): string {
    switch (cols) {
      case 1:
        return 'py-2 grid-cols-1';
      case 2:
        return 'py-2 grid-cols-1 sm:grid-cols-2';
      case 3:
        return 'py-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
      case 4:
        return 'py-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      case 6:
        return 'py-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6';
      default:
        return 'py-2 grid-cols-1'; // Default fallback
    }
  }

  cols: InputSignal<number> = input<number>(1);
}
