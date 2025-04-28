import { CommonModule, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Breadcrumb } from '../Breadcrumb.model';

@Component({
  selector: 'breadcrumb-item',
  templateUrl: './breadcrumb-item.html',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './breadcrumb-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbItemComponent {
  @Input() breadcrumb: Breadcrumb = new Breadcrumb();
  @Input() last: boolean = false;
  @Input() index: number = 0;
  @Input() color: string = '';
  @Output() clicked: EventEmitter<number> = new EventEmitter<number>();
  navigate(index: number) {
    this.clicked.emit(index);
  }
  getColor() {
    return this.last ? 'text-gray-700' : this.color;
  }
}
