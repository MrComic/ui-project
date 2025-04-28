import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import {
  ClientSideRowModelModule,
  ColDef,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsParams,
} from 'ag-grid-community';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'core-custom-grid',
  imports: [CommonModule, AgGridModule],
  standalone: true,
  templateUrl: './core-custom-grid.component.html',
})
export class CoreCustomGridComponent {
  isDarkTheme: boolean = false;
  @Input() columnDefs: any[] = [];
  @Input() context: any;
  @Input() defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: false,
  };
  @Input() frameworkComponents: any = {};
  @Input() theme: string = 'ag-theme-alpine';

  @Input() rowData?: any[];
  @Input() rowDataObservable?: Observable<any[]>;
  @Input() serverSideDataSource?: IServerSideDatasource;

  @Output() gridReady = new EventEmitter<GridReadyEvent>();

  @ViewChild('agGrid') agGrid!: AgGridAngular;

  /**
   *
   */
  constructor(private themeService: ThemeService) {
    this.themeService.$theme.subscribe((theme) => {
      this.isDarkTheme = theme == 'light';
    });
  }
  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50, 100],
    rowModelType: 'clientSide',
    cacheBlockSize: 10,
    animateRows: true,
    rowSelection: 'single',
  };

  private storageKey = 'agGridState'; // Local storage key for state

  ngOnInit(): void {
    if (this.serverSideDataSource) {
      this.gridOptions.rowModelType = 'serverSide';
    }
  }

  ngAfterViewInit(): void {}

  onGridReady(event: GridReadyEvent): void {
    this.gridReady.emit(event);
    this.agGrid.api = event.api;
    if (this.rowData) {
      this.gridOptions.rowData = this.rowData;
    }
    if (this.serverSideDataSource && this.agGrid.api) {
      this.gridOptions.serverSideDatasource = this.serverSideDataSource;
      event.api.setGridOption(
        'serverSideDatasource',
        this.serverSideDataSource
      );

      event.api.refreshServerSide();
    } else if (this.rowDataObservable) {
      this.subscribeToRowDataObservable();
    }
  }

  private subscribeToRowDataObservable(): void {
    if (this.rowDataObservable && this.agGrid.api) {
      this.rowDataObservable.subscribe((data) => {
        this.rowData = data;
        this.gridOptions.rowData = this.rowData;
        this.agGrid.api.refreshClientSideRowModel();
      });
    }
  }

  clearGridState(): void {
    localStorage.removeItem(this.storageKey);
    console.log('Grid state cleared');
  }

  sizeColumnsToFit(): void {
    if (this.agGrid && this.agGrid.api) {
      this.agGrid.api.sizeColumnsToFit();
    }
  }

  exportToCsv(): void {
    if (this.agGrid && this.agGrid.api) {
      this.agGrid.api.exportDataAsCsv();
    }
  }
}
