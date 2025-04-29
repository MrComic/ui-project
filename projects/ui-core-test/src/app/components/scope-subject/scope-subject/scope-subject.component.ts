import { Component, ViewChild } from '@angular/core';
import { CardComponent } from '../../../../../../ui-core/src/lib/components/card/card.component';
import { ButtonComponent } from '../../../../../../ui-core/src/lib/components/forms/button/button.component';
import { CoreCustomGridComponent } from '../../../../../../ui-core/src/lib/components/core-custom-grid/core-custom-grid.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faPlus, faRemove } from '@fortawesome/free-solid-svg-icons';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { map, Observable, of } from 'rxjs';
import { ScopeSubjectService } from '../services/scope-subject.service';
import { ScopeSubjectModel } from '../models/scope-subject.model';
import { TranslateService } from '../../../../../../ui-core/src/lib/translate/services/translate.service';
import { AttendeeLevel } from '../../../common/atendees-level.enum';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../../../../../../ui-core/src/lib/components/modal/modal.component';
import { ModalHeaderComponent } from '../../../../../../ui-core/src/lib/components/modal/modal-header.component';
import { ModalBodyComponent } from '../../../../../../ui-core/src/lib/components/modal/modal-body.component';
import { CoreLayoutComponent } from '../../../../../../ui-core/src/lib/components/forms/core-layout/core-layout/core-layout.component';
import { CoreLayoutItemComponent } from '../../../../../../ui-core/src/lib/components/forms/core-layout/core-layout-item/core-layout-item.component';
import { CoreTextInputComponent } from '../../../../../../ui-core/src/lib/components/forms/core-text-input/core-text-input.component';
import { ModalFooterComponent } from '../../../../../../ui-core/src/lib/components/modal/modal-footer.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CoreSelectComponent } from '../../../../../../ui-core/src/lib/components/forms/core-select/core-select.component';
import { ScopeSubjectOperationComponent } from './scope-subject-operation/scope-subject-operation.component';

@Component({
  selector: 'app-scope-subject',
  imports: [
    CardComponent,
    ButtonComponent,
    CoreCustomGridComponent,
    TranslocoPipe,
    FontAwesomeModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    CoreLayoutComponent,
    CoreLayoutItemComponent,
    CoreTextInputComponent,
    ModalFooterComponent,
    ReactiveFormsModule,
    CoreSelectComponent,
  ],
  providers: [ScopeSubjectService],
  templateUrl: './scope-subject.component.html',
  styleUrl: './scope-subject.component.scss',
})
export class ScopeSubjectComponent {
  faPlus = faPlus;
  components: any[] = [ScopeSubjectOperationComponent];

  colDefs: ColDef[];
  data: ScopeSubjectModel[] = [];
  form: FormGroup;
  title: string;
  levels: string;
  addEntry = faAdd;
  noIcon = faRemove;
  @ViewChild('form_modal') modalEl?: ModalComponent;
  AvailableLevels: () => Observable<{ title: string; value: any }[]>;
  constructor(
    private formBuilder: FormBuilder,
    private service: ScopeSubjectService,
    private activatedRoute: ActivatedRoute,
    public translateService: TranslateService
  ) {
    this.form = this.formBuilder.group({
      id: [null],
      scopeId: [this.activatedRoute.snapshot.params['ScopeId']],
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

    this.title = this.translateService.translate('ScopeSubjects.Title');
    this.levels = this.translateService.translate('ScopeSubjects.Levels');

    this.colDefs = [
      {
        field: 'title',
        headerName: this.translateService.translate('ScopeSubjects.Title'),
      },
      {
        field: 'scopeTitle',
        headerName: this.translateService.translate('ScopeSubjects.ScopeTitle'),
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
        cellRenderer: ScopeSubjectOperationComponent,
      },
    ];

    this.activatedRoute.data
      .pipe(map((data) => data['data']))
      .subscribe((response: any) => {
        console.log(response);
        this.data = response;
      });
  }

  gridapi?: GridApi;

  onGridReady(event: GridReadyEvent) {
    this.gridapi = event.api;
  }

  create() {
    this.modalEl?.open();
  }
  edit(id: number) {
    console.log(id);
    this.service.get(id).subscribe((p) => {
      console.log(p);
      this.form.patchValue({
        id: p?.id,
        scopeId: this.activatedRoute.snapshot.params['ScopeId'],
        title: p?.title,
        levels: p?.levels,
      });
      this.modalEl?.open();
    });
  }

  Save() {
    console.log(this.form.value.id);
    if (!this.form.value.id) {
      let model: ScopeSubjectModel = {
        id: this.data.length + 1,
        scopeTitle: 'بعد از وصل شدن به سرور اصلاح خواهد شد',
        scopeId: this.form.value.scopeId,
        title: this.form.value.title,
        levels: this.form.value.levels,
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
    this.service
      .getWithSubjectId(this.activatedRoute.snapshot.params['ScopeId'])
      .subscribe((p) => {
        this.data = p;
        this.gridapi?.setGridOption('rowData', p);
        this.gridapi?.refreshClientSideRowModel();

        this.gridapi?.refreshCells();
      });
  }

  onNo() {
    this.form.reset();
    this.modalEl?.close();
  }
}
