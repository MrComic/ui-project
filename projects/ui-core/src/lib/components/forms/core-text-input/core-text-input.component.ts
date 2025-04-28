import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'core-text-input',
  imports: [ReactiveFormsModule, CommonModule, TranslocoPipe],
  standalone: true,
  templateUrl: './core-text-input.component.html',
})
export class CoreTextInputComponent {
  label: InputSignal<string> = input<string>('');
  controlName: InputSignal<string> = input<string>('');
  type: InputSignal<string> = input<string>('');
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
