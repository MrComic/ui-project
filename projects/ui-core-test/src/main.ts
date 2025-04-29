import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import AppComponent from './app/app.component';

import {
  ClientSideRowModelApiModule,
  ClientSideRowModelModule,
  ColumnAutoSizeModule,
  InfiniteRowModelModule,
  ModuleRegistry,
  NumberEditorModule,
  NumberFilterModule,
  PaginationModule,
  RowSelectionModule,
  TextEditorModule,
  TextFilterModule,
  ValidationModule,
} from 'ag-grid-community';
import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  LicenseManager,
  ServerSideRowModelApiModule,
  ServerSideRowModelModule,
} from 'ag-grid-enterprise';

import { RenderApiModule } from 'ag-grid-community';

ModuleRegistry.registerModules([RenderApiModule]);

LicenseManager.setLicenseKey(
  'DownloadDevTools_COM_NDEwMjM0NTgwMDAwMA==59158b5225400879a12a96634544f5b6'
);

ModuleRegistry.registerModules([
  NumberEditorModule,
  ColumnAutoSizeModule,
  TextEditorModule,
  RenderApiModule,
  TextFilterModule,
  NumberFilterModule,
  RowSelectionModule,
  PaginationModule,
  ClientSideRowModelModule,
  ClientSideRowModelApiModule,
  InfiniteRowModelModule,
  ValidationModule,
  ServerSideRowModelModule,
  ServerSideRowModelApiModule,
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
]);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
