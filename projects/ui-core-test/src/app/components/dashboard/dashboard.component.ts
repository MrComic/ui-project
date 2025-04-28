import {
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CardComponent } from '../../../../../ui-core/src/lib/components/card/card.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CoreTextInputComponent } from '../../../../../ui-core/src/lib/components/forms/core-text-input/core-text-input.component';
import { translate, TranslocoPipe } from '@jsverse/transloco';
import { ButtonComponent } from '../../../../../ui-core/src/lib/components/forms/button/button.component';
import { validators } from 'tailwind-merge';
import { CoreCheckboxComponent } from '../../../../../ui-core/src/lib/components/forms/core-checkbox/core-checkbox.component';
import { CoreSelectComponent } from '../../../../../ui-core/src/lib/components/forms/core-select/core-select.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { JalaliDatepickerComponent } from '../../../../../ui-core/src/lib/components/forms/date-picker/jalali-datepicker.component';
import { CoreLayoutComponent } from '../../../../../ui-core/src/lib/components/forms/core-layout/core-layout/core-layout.component';
import { CoreLayoutItemComponent } from '../../../../../ui-core/src/lib/components/forms/core-layout/core-layout-item/core-layout-item.component';
import { AlertService } from '../../../../../ui-core/src/lib/components/alert/services/alert.service';
import { CoreTextAreaComponent } from '../../../../../ui-core/src/lib/components/forms/core-text-area/core-text-area.component';
import { ConfirmModalServiceService } from '../../../../../ui-core/src/lib/components/forms/core-confirm-modal/services/confirm-modal-service.service';
import { TranslateService } from '../../../../../ui-core/src/lib/translate/services/translate.service';
import { CoreToggleComponent } from '../../../../../ui-core/src/lib/components/forms/core-toggle/core-toggle.component';
import { CoreRadioComponent } from '../../../../../ui-core/src/lib/components/forms/core-radio/core-radio.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { LoaderButtonDirective } from '../../../../../ui-core/src/directives/loader-button.directive';
import { LoaderButtonService } from '../../../../../ui-core/src/lib/services/loader-button.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CardComponent,
    ReactiveFormsModule,
    CoreTextInputComponent,
    CoreCheckboxComponent,
    FontAwesomeModule,
    CoreLayoutComponent,
    JalaliDatepickerComponent,
    CoreSelectComponent,
    TranslocoPipe,
    ButtonComponent,
    CommonModule,
    CoreLayoutItemComponent,
    CoreTextAreaComponent,
    LoaderButtonDirective,
    CoreToggleComponent,
    CoreRadioComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  homeIcon = faHome;

  openConfirm: boolean = false;
  form: FormGroup;
  dropdownOptions = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
  ];
  remoteResource: () => Observable<any>;
  showAlert() {
    this.alertService.alert(['مشکلی در انجام عملیات وجود دارد'], 'error');
    setTimeout(() => {
      this.loaderbutton.hide();
    }, 2000);
  }
  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private translateService: TranslateService,
    private loaderbutton: LoaderButtonService,
    private viewContainerRef: ViewContainerRef,
    private confirmModalService: ConfirmModalServiceService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      date: new FormControl(new Date('1991-1-1')),
      selectOption: new FormControl(null),
      terms: new FormControl(null),
      description: new FormControl(null),
      gender: new FormControl(),
      acceptTerms: new FormControl(false, Validators.requiredTrue),
    });
    this.remoteResource = () => {
      return this.http.get('https://jsonplaceholder.typicode.com/todos');
    };

    this.form.get('date')?.valueChanges.subscribe((value) => {
      console.log('Selected Jalali Date:', value);
    });
  }
  cancel() {}

  saveUser() {
    this.confirmModalService
      .showConfirmModal(this.viewContainerRef, {
        title: this.translateService.translate('messages.confirm'),
        body: this.translateService.translate('messages.confirmSaveUser'),
      })
      .subscribe((result) => {
        console.log('modal resolved with :' + result);
      });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
