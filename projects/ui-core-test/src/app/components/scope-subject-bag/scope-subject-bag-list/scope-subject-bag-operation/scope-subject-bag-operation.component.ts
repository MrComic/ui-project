import { Component, inject, ViewContainerRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { TranslateService } from '../../../../../../../ui-core/src/lib/translate/services/translate.service';
import { LoaderService } from '../../../../../../../ui-core/src/lib/services/loader.service';
import { ConfirmModalServiceService } from '../../../../../../../ui-core/src/lib/components/forms/core-confirm-modal/services/confirm-modal-service.service';
import { ScopeSubjectBagServiceService } from '../../services/scope-subject-bag.service';

@Component({
  selector: 'app-scope-subject-bag-operation',
  imports: [FontAwesomeModule],
  templateUrl: './scope-subject-bag-operation.component.html',
})
export class ScopeSubjectBagOperationComponent
  implements ICellRendererAngularComp
{
  constructor(
    public translate: TranslateService,
    private service: ScopeSubjectBagServiceService,
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

  ManageSubjects() {
    const parentComponent = this.params.context;
    parentComponent.ManageSubjects(this.params.data.id);
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
