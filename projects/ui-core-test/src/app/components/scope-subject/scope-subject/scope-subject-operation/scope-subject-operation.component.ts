import { Component, inject, ViewContainerRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { TranslateService } from '../../../../../../../ui-core/src/lib/translate/services/translate.service';
import { LoaderService } from '../../../../../../../ui-core/src/lib/services/loader.service';
import { ConfirmModalServiceService } from '../../../../../../../ui-core/src/lib/components/forms/core-confirm-modal/services/confirm-modal-service.service';
import { ScopeSubjectComponent } from '../scope-subject.component';
import { ScopeSubjectService } from '../../services/scope-subject.service';

@Component({
  selector: 'app-food-category-operation',
  imports: [FontAwesomeModule],
  templateUrl: './scope-subject-operation.component.html',
})
export class ScopeSubjectOperationComponent
  implements ICellRendererAngularComp
{
  constructor(
    public translate: TranslateService,
    private service: ScopeSubjectService,
    private viewContainerRef: ViewContainerRef,
    private confirmModalService: ConfirmModalServiceService
  ) {}
  private params: any;
  deleteIcon: any = faTrash;
  editIcon: any = faEdit;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  onEdit() {
    const parentComponent = this.params.context;
    parentComponent.edit(this.params.data.id);
  }
  onDelete() {
    this.confirmModalService
      .showConfirmModal(this.viewContainerRef, {
        title: this.translate.translate('messages.confirm'),
        body: this.translate.translate('ScopeSubjects.ensureDelete'),
      })
      .subscribe((result) => {
        if (result == true) {
          this.service.deleteSubject(this.params.data.id);

          this.confirmModalService.closeModal();
          const parentComponent = this.params.context;
          parentComponent.refereshGrid();
        }
      });
  }
}
