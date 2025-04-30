import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="absolute bg-white w-48 shadow-lg rounded-md py-1 z-50  border border-gray-200"
      [style.top.px]="position.top"
      [style.left.px]="position.left"
    >
      <button
        *ngFor="let action of actions"
        (click)="action.action(); close.emit()"
        class="w-full text-right px-4 py-2 hover:bg-gray-100 text-gray-800"
      >
        {{ action.label }}
      </button>
    </div>
  `,
})
export class ContextMenuComponent {
  @Input() position: { top: number; left: number } = { top: 0, left: 0 };
  @Input() actions: { label: string; action: () => void }[] = [];
  @Output() close = new EventEmitter<void>();
}
