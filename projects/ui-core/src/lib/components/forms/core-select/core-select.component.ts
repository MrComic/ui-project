import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  input,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgModel,
} from '@angular/forms';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';
import { Observable } from 'rxjs';

@Component({
  selector: 'core-select',
  imports: [CommonModule, NgSelectComponent, FormsModule],
  standalone: true,
  templateUrl: './core-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CoreSelectComponent,
      multi: true,
    },
  ],
  styleUrl: './core-select.component.css',
})
export class CoreSelectComponent {
  @Input() options: any[] = [];
  @Input() remoteSource!: () => Observable<any[]>;
  @Input() Label = 'label';
  LabelText = input();
  @Input() Value = 'value';
  @Input() multiple = false;
  @Input() clearable = true;
  @Input() placeholder = 'Select an option';

  // Signal for the selected value(s)
  value: WritableSignal<any> = signal(null);

  // Signal for dropdown options
  dropdownOptions: WritableSignal<any[]> = signal([]);

  // Loading state for remote data
  loading: WritableSignal<boolean> = signal(false);

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      this.onChange(this.value());
    });
  }
  ngOnInit(): void {
    if (this.remoteSource != undefined) {
      this.fetchRemoteData();
    } else {
      this.dropdownOptions.set(this.options);
    }
  }

  fetchRemoteData(): void {
    this.loading.set(true);
    this.remoteSource().subscribe({
      next: (data) => {
        this.dropdownOptions.set(data);
        this.loading.set(false);
      },
      error: () => {
        console.error('Failed to fetch remote data');
        this.loading.set(false);
      },
    });
  }

  writeValue(value: any): void {
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  onSelectionChange(selectedValue: any): void {
    this.value.set(selectedValue);
  }
}
