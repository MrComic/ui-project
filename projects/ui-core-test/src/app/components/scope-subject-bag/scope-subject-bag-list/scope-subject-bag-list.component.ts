import { Component, ViewChild } from '@angular/core';
import { CardComponent } from '../../../../../../ui-core/src/lib/components/card/card.component';
import { ButtonComponent } from '../../../../../../ui-core/src/lib/components/forms/button/button.component';
import { CoreCustomGridComponent } from '../../../../../../ui-core/src/lib/components/core-custom-grid/core-custom-grid.component';
import { ModalComponent } from '../../../../../../ui-core/src/lib/components/modal/modal.component';
import { ModalHeaderComponent } from '../../../../../../ui-core/src/lib/components/modal/modal-header.component';
import { ModalBodyComponent } from '../../../../../../ui-core/src/lib/components/modal/modal-body.component';
import { CoreLayoutComponent } from '../../../../../../ui-core/src/lib/components/forms/core-layout/core-layout/core-layout.component';
import { CoreLayoutItemComponent } from '../../../../../../ui-core/src/lib/components/forms/core-layout/core-layout-item/core-layout-item.component';
import { CoreTextInputComponent } from '../../../../../../ui-core/src/lib/components/forms/core-text-input/core-text-input.component';
import { CoreSelectComponent } from '../../../../../../ui-core/src/lib/components/forms/core-select/core-select.component';
import { ModalFooterComponent } from '../../../../../../ui-core/src/lib/components/modal/modal-footer.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable, of } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '../../../../../../ui-core/src/lib/translate/services/translate.service';
import { faAdd, faPlus, faRemove } from '@fortawesome/free-solid-svg-icons';
import { AttendeeLevel } from '../../../common/atendees-level.enum';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import ScopeSubjectBagModel from '../models/scope-subject-bag.model';
import { ScopeSubjectBagServiceService } from '../services/scope-subject-bag.service';
import { ScopeSubjectBagOperationComponent } from './scope-subject-bag-operation/scope-subject-bag-operation.component';
import { ScopeSubjectService } from '../../scope-subject/services/scope-subject.service';

@Component({
  selector: 'app-scope-subject-bag-list',
  imports: [
    CardComponent,
    ButtonComponent,
    TranslocoPipe,
    FontAwesomeModule,
    CoreCustomGridComponent,
    ModalComponent,
    ReactiveFormsModule,
    ModalHeaderComponent,
    ModalBodyComponent,
    CoreLayoutComponent,
    CoreLayoutItemComponent,
    CoreTextInputComponent,
    CoreSelectComponent,
    ModalFooterComponent,
  ],
  providers: [ScopeSubjectBagServiceService],
  templateUrl: './scope-subject-bag-list.component.html',
  styleUrl: './scope-subject-bag-list.component.scss',
})
export class ScopeSubjectBagListComponent {
  faPlus = faPlus;
  addEntry = faAdd;
  noIcon = faRemove;
  form: FormGroup;
  colDefs: ColDef[];
  @ViewChild('form_modal') modalEl?: ModalComponent;
  AvailableLevels: () => Observable<{ title: string; value: any }[]>;
  title: string;
  levels: string;

  components: any[] = [ScopeSubjectBagOperationComponent];
  data: ScopeSubjectBagModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: ScopeSubjectBagServiceService,
    public translateService: TranslateService
  ) {
    this.form = this.formBuilder.group({
      id: [null],
      title: [null, Validators.required],
      levels: [null, Validators.required],
    });

    this.AvailableLevels = () =>
      of(
        Object.keys(AttendeeLevel)
          .filter((key) => isNaN(Number(key)))
          .map((key) => ({
            value: AttendeeLevel[key as keyof typeof AttendeeLevel],
            title: key,
          }))
      );
    this.title = this.translateService.translate('ScopeSubjectBag.Title');
    this.levels = this.translateService.translate('ScopeSubjectBag.Levels');

    this.colDefs = [
      {
        field: 'title',
        headerName: this.translateService.translate('ScopeSubjectBag.Title'),
      },
      {
        field: 'levels',
        headerName: this.translateService.translate('ScopeSubjects.Levels'),
        cellRenderer: (data: any) => {
          const levelNames = data.data.levels
            .map((d: AttendeeLevel) =>
              translateService.translate('AttendeeLevel.' + AttendeeLevel[d])
            )
            .join(',');

          return levelNames;
        },
      },
      {
        field: '',
        cellRenderer: ScopeSubjectBagOperationComponent,
      },
    ];
  }

  create() {
    this.modalEl?.open();
  }

  onNo() {
    this.form.reset();
    this.modalEl?.close();
  }

  gridapi?: GridApi;

  edit(id: number) {
    this.service.get(id).subscribe((p) => {
      this.form.patchValue({
        id: p?.id,
        title: p?.title,
        levels: p?.levels,
      });
      this.modalEl?.open();
    });
  }

  Save() {
    if (!this.form.value.id) {
      let model: ScopeSubjectBagModel = {
        id: this.data.length + 1,
        title: this.form.value.title,
        levels: this.form.value.levels,
        scopeSubjectBagItems: [],
      };
      this.service.addSubject(model);

      this.data.push(model);
      this.gridapi?.setGridOption('rowData', this.data);
      this.gridapi?.refreshClientSideRowModel();

      this.gridapi?.refreshCells();
      this.form.reset();
      this.modalEl?.close();
    } else {
      var data = this.data.find((p) => p.id == this.form.value.id);
      this.service.updateSubject(this.form.value.id, data ?? {});
      if (data) {
        data.title = this.form.value.title;
        data.levels = this.form.value.levels;
      }

      this.gridapi?.setGridOption('rowData', this.data);
      this.gridapi?.refreshClientSideRowModel();

      this.gridapi?.refreshCells();
      this.form.reset();
      this.modalEl?.close();
    }
  }

  refereshGrid() {
    this.service.getAll().subscribe((p) => {
      this.data = p;
      this.gridapi?.setGridOption('rowData', p);
      this.gridapi?.refreshClientSideRowModel();

      this.gridapi?.refreshCells();
    });
  }

  onGridReady(event: GridReadyEvent) {
    this.gridapi = event.api;
  }
}
