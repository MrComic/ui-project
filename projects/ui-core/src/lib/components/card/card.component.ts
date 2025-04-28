import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'core-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  host: { class: 'h-full' },
})
export class CardComponent {
  fullHeight: InputSignal<boolean> = input<boolean>(false);
}
