import { Component } from '@angular/core';
import { CardComponent } from '../../../../../../ui-core/src/lib/components/card/card.component';
import { ButtonComponent } from '../../../../../../ui-core/src/lib/components/forms/button/button.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { CoreLayoutComponent } from '../../../../../../ui-core/src/lib/components/forms/core-layout/core-layout/core-layout.component';
import { CoreLayoutItemComponent } from '../../../../../../ui-core/src/lib/components/forms/core-layout/core-layout-item/core-layout-item.component';
import { TreeComponent } from '../../../../../../ui-core/src/lib/components/tree/tree.component';
import { ScopesService } from '../../scopes/services/scopes.service';
import { ScopeSubjectService } from '../../scope-subject/services/scope-subject.service';
import { CoreCustomGridComponent } from '../../../../../../ui-core/src/lib/components/core-custom-grid/core-custom-grid.component';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  RowClickedEvent,
} from 'ag-grid-community';
import { TranslateService } from '../../../../../../ui-core/src/lib/translate/services/translate.service';
import { AttendeeLevel } from '../../../common/atendees-level.enum';
import { ScopeSubjectBagServiceService } from '../services/scope-subject-bag.service';
import { ActivatedRoute } from '@angular/router';
import ScopeSubjectBagModel, {
  scopeSubjectBagItem,
} from '../models/scope-subject-bag.model';

@Component({
  selector: 'app-manage-subjects',
  imports: [
    CardComponent,
    TranslocoPipe,
    CoreLayoutComponent,
    CoreLayoutItemComponent,
    TreeComponent,
    CoreCustomGridComponent,
  ],
  providers: [
    ScopeSubjectBagServiceService,
    ScopeSubjectService,
    ScopesService,
  ],
  templateUrl: './manage-subjects.component.html',
  styleUrl: './manage-subjects.component.scss',
})
export class ManageSubjectsComponent {
  SCopeSubjectsColDefs: ColDef[];
  bagSubjectsColDefs: ColDef[];
  id: number = 0;
  selectedSubject: number = 0;
  selectedSubjectTitle: string = '';
  subjectData?: scopeSubjectBagItem[] = [];
  subjectClick(event: RowClickedEvent) {
    this.selectedSubject = event.data.id;
    this.selectedSubjectTitle = event.data.title;
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.scopeSubjectBagService.addSubjectBagSubject(
      this.id,
      this.selectedScopeTitle,
      this.selectedScope,
      this.selectedSubjectTitle,
      this.selectedSubject
    );
    this.refereshGrid();
  }

  refereshGrid() {
    this.scopeSubjectBagService.get(this.id).subscribe((p) => {
      this.subjectData = p?.scopeSubjectBagItems;
      this.bagSubjectOnGridApi?.setGridOption(
        'rowData',
        p?.scopeSubjectBagItems
      );
      this.bagSubjectOnGridApi?.refreshClientSideRowModel();
      this.bagSubjectOnGridApi?.refreshCells();
    });
  }

  constructor(
    private route: ActivatedRoute,
    public scopeService: ScopesService,
    public translateService: TranslateService,
    public scopeSubjectService: ScopeSubjectService,
    public scopeSubjectBagService: ScopeSubjectBagServiceService
  ) {
    this.bagSubjectsColDefs = [
      {
        field: 'scopetitle',
        headerName: this.translateService.translate(
          'ScopeSubjectBag.scopeTitle'
        ),
      },
      {
        field: 'subjectTitle',
        headerName: this.translateService.translate(
          'ScopeSubjectBag.subjectTitle'
        ),
      },
    ];

    this.SCopeSubjectsColDefs = [
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
    ];
  }

  scopeSubjectGridapi?: GridApi;

  scopeSubjectOnGridReady(event: GridReadyEvent) {
    this.scopeSubjectGridapi = event.api;
  }
  bagSubjectOnGridApi?: GridApi;
  bagSubjectOnGridReady(event: GridReadyEvent) {
    this.bagSubjectOnGridApi = event.api;
  }

  data: any[] = [];
  public selectedScope: number = 0;
  public selectedScopeTitle: string = '';
  scopeSubjectComponents: any[] = [];
  onNodeClick(event: MouseEvent, node: any) {
    console.log(node);
    this.selectedScope = node.id;
    this.selectedScopeTitle = node.label;
    this.scopeSubjectService
      .getWithSubjectId(this.selectedScope)
      .subscribe((p) => {
        this.data = p;
        this.scopeSubjectGridapi?.setGridOption('rowData', p);
        this.scopeSubjectGridapi?.refreshClientSideRowModel();

        this.scopeSubjectGridapi?.refreshCells();
      });
  }
}
