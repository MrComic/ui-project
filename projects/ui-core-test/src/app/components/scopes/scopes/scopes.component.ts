import { Component, HostListener, ViewChild } from '@angular/core';
import { CardComponent } from '../../../../../../ui-core/src/lib/components/card/card.component';

import { TranslocoModule } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../../../ui-core/src/lib/components/forms/button/button.component';
import { faAdd, faCancel, faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from '../../../../../../ui-core/src/lib/components/modal/modal.component';
import { ModalHeaderComponent } from '../../../../../../ui-core/src/lib/components/modal/modal-header.component';
import { ModalBodyComponent } from '../../../../../../ui-core/src/lib/components/modal/modal-body.component';
import { CoreLayoutComponent } from '../../../../../../ui-core/src/lib/components/forms/core-layout/core-layout/core-layout.component';
import { CoreLayoutItemComponent } from '../../../../../../ui-core/src/lib/components/forms/core-layout/core-layout-item/core-layout-item.component';
import { ModalFooterComponent } from '../../../../../../ui-core/src/lib/components/modal/modal-footer.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CoreTextInputComponent } from '../../../../../../ui-core/src/lib/components/forms/core-text-input/core-text-input.component';
import { TranslateService } from '../../../../../../ui-core/src/lib/translate/services/translate.service';
import { ScopesService } from '../services/scopes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeComponent } from '../../../../../../ui-core/src/lib/components/tree/tree.component';
import { ContextMenuComponent } from '../../../../../../ui-core/src/lib/components/context-menu/context-menu.component';

@Component({
  selector: 'app-scopes',
  standalone: true,
  imports: [
    TreeComponent,
    CommonModule,
    ContextMenuComponent,
    TranslocoModule,
    FontAwesomeModule,
    CardComponent,
    ButtonComponent,
    ModalComponent,
    ReactiveFormsModule,
    ModalHeaderComponent,
    ModalBodyComponent,
    CoreLayoutComponent,
    CoreLayoutItemComponent,
    ModalFooterComponent,
    CoreTextInputComponent,
  ],
  templateUrl: './scopes.component.html',
})
export class ScopesComponent {
  contextMenuVisible = false;
  @ViewChild('form_modal') modalEl?: ModalComponent;
  contextMenuPosition = { top: 0, left: 0 };
  contextMenuNode: any = null;
  contextMenuActions: { label: string; action: () => void }[] = [];
  addEntry = faAdd;
  name: string;
  form: FormGroup;
  noIcon = faRemove;
  maxId = 100;
  expandedNodes = new Set<number>();
  constructor(
    public service: ScopesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translateService: TranslateService
  ) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      id: [null],
      parentId: [null],
    });
    this.name = this.translateService.translate('Scopes.Name');
  }

  Save() {
    if (!this.form.value.id) {
      let node = {
        label: this.form.value.name,
        id: this.maxId + 1,
        children: [],
        parentId: this.form.value.parentId ?? null,
      };
      this.service.addData(node);
      this.maxId += 1;
      this.modalEl?.close();
    } else {
      var obj = this.service.getData().find((p) => p.id == this.form.value.id);
      if (obj) obj.label = this.form.value.name;
      this.modalEl?.close();
    }
    this.form.reset();
  }

  onNo() {
    this.modalEl?.close();
  }

  openRootScope() {
    this.modalEl?.open();
  }

  onNodeRightClick(event: MouseEvent, node: any) {
    event.preventDefault();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const menuWidth = 150;
    const menuHeight = 120;

    let left = event.clientX;
    let top = event.clientY;

    if (left + menuWidth > viewportWidth) left = viewportWidth - menuWidth;
    if (top + menuHeight > viewportHeight) top = viewportHeight - menuHeight;

    this.contextMenuNode = node;
    this.contextMenuPosition = { top, left };
    this.contextMenuActions = this.getContextMenuActions(node);
    this.contextMenuVisible = true;
  }

  private addChildren(node: any) {
    this.form.patchValue({
      id: undefined,
      label: '',
      parentId: node.id,
    });
    this.modalEl?.open();
  }

  private getContextMenuActions(node: any) {
    return [
      {
        label: 'افزودن فرزند',
        action: () => this.addChildren(node),
      },
      {
        label: 'مدیریت مباحث',
        action: () => this.goToSubjects(node),
      },
      {
        label: 'ویرایش',
        action: () => this.editNode(node),
      },
      {
        label: 'حذف',
        action: () => this.deleteNode(node),
      },
      {
        label: node['expanded'] ? 'بستن' : 'نمایش فرزندان',
        action: () => this.toggleNode(node),
      },
    ];
  }

  editNode(node: any) {
    this.contextMenuVisible = false;
    this.form.patchValue({
      name: node.label,
      id: node.id,
      parentId: node.parentId,
    });
    this.modalEl?.open();
  }

  goToSubjects(node: any) {
    this.router.navigate(['scope-subjects', node.id], {
      relativeTo: this.route,
    });
  }

  deleteNode(node: any) {
    this.contextMenuVisible = false;
    var index = this.service.getData().findIndex((p) => p.id == node.id);
    this.service.getData().splice(index, 1);
  }

  toggleNode(node: any) {
    node.expanded = !node.expanded;
    this.contextMenuVisible = false;
  }

  createRootScope() {}

  @HostListener('document:click')
  closeContextMenu() {
    this.contextMenuVisible = false;
  }
}
