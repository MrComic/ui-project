import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslocoDirective, TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'core-radio',
  imports: [TranslocoPipe, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './core-radio.component.html',
})
export class CoreRadioComponent {
  label: InputSignal<string> = input<string>('');
  items: InputSignal<{ value: string; label: string }[]> = input<
    { value: string; label: string }[]
  >([]);
  controlName: InputSignal<string> = input<string>('');

  control: FormControl = new FormControl();

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    const formGroup = this.controlContainer.control as FormGroup;
    this.control = formGroup?.get(this.controlName()) as FormControl;
  }

  get isInvalid() {
    return this.control?.invalid && this.control?.touched;
  }
}
