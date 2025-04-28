import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  InputSignal,
  forwardRef,
  input,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslocoModule, TranslocoPipe } from '@jsverse/transloco';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'core-currency-input',
  standalone: true,
  template: `
    <div class="">
      <label
        for="input"
        class="block dark:text-white text-sm font-medium text-gray-700"
      >
        {{ label() }}
      </label>

      <input
        id="input"
        [mask]="maskPattern"
        [dropSpecialCharacters]="false"
        [thousandSeparator]="thousandSeparator"
        (input)="onInput($event)"
        (blur)="onTouched()"
        [(ngModel)]="value"
        class="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
      />

      <div *ngIf="isInvalid" class="text-red-500 text-xs mt-1">
        <ng-container *ngIf="control?.hasError('required')">
          {{ 'commonErrors.required' | transloco }}
        </ng-container>
        <ng-container *ngIf="control?.hasError('minlength')">
          {{ 'commonErrors.minlength' | transloco: { value: control.errors?.['minlength']?.requiredLength } }}
        </ng-container>
        <ng-container *ngIf="control?.hasError('maxlength')">
          {{ 'commonErrors.maxlength' | transloco: { value: control.errors?.['maxlength']?.requiredLength } }}
        </ng-container>
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CurrencyInputComponent,
      multi: true,
    },
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxMaskDirective,
    TranslocoPipe,
  ],
})
export class CurrencyInputComponent implements ControlValueAccessor {
  @Input() allowDecimals: boolean = true;
  @Input() maxDecimals: number = 2;
  @Input() thousandSeparator: string = ',';
  label: InputSignal<string> = input<string>('');
  formControlName: InputSignal<string> = input<string>('');
  value: string = '';
  onChange = (_: any) => {};
  onTouched = () => {};
  control: FormControl = new FormControl();

  get maskPattern(): string {
    return this.allowDecimals ? `separator.${this.maxDecimals}` : 'separator';
  }

  writeValue(value: any): void {
    this.value = value ? value.toString().replace(/,/g, '') : '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  get isInvalid() {
    return this.control?.invalid && this.control?.touched;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    const formGroup = this.controlContainer.control as FormGroup;
    this.control = formGroup?.get(this.formControlName()) as FormControl;
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement) return;

    this.value = inputElement.value;
    this.onChange(this.value.replace(/,/g, ''));
  }
}
