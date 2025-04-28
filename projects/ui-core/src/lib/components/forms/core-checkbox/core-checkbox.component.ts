import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'core-checkbox',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CoreCheckboxComponent),
      multi: true,
    },
  ],
  templateUrl: './core-checkbox.component.html',
  styleUrl: './core-checkbox.component.css',
})
export class CoreCheckboxComponent {
  label = input<string>();
  name = input<string>();
  checked = false;

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {}

  toggleCheckbox() {
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouched();
  }

  writeValue(value: boolean): void {
    if (value !== undefined) {
      this.checked = value;
    }
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
