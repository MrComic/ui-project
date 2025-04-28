import { booleanToCoreBoolean } from '../../services/util/boolean.util';
import { BaseComponent } from '../base-component.directive';
import { ModalBodyComponent } from './modal-body.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalHeaderComponent } from './modal-header.component';
import type { ModalClass, ModalPositions, ModalSizes } from './modal.theme';
import { ModalThemeService } from './modal.theme.service';

import type { EmbeddedViewRef } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  inject,
  InjectionToken,
  input,
  makeEnvironmentProviders,
  model,
  TemplateRef,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'core-modal',
  template: `
    <ng-template #modal>
      <div
        class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-[99]"
      ></div>
      <div
        [class]="contentClasses().modalWrapperClass"
        (click)="onBackdropClick($event)"
      >
        <div [class]="contentClasses().modalContainerClass">
          <div [class]="contentClasses().modalContentClass">
            <ng-content />
          </div>
        </div>
      </div>
    </ng-template>
  `,
  host: {
    tabindex: '-1',
    '(document:keydown)': 'onKeydownHandler($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent extends BaseComponent<ModalClass> {
  public readonly themeService = inject(ModalThemeService);
  public readonly modalHeaderChild = contentChild(ModalHeaderComponent);

  public readonly modalBodyChild = contentChild.required(ModalBodyComponent);

  public readonly modalFooterChild = contentChild(ModalFooterComponent);

  private readonly template = viewChild.required('modal', {
    read: TemplateRef,
  });

  private readonly viewContainer = inject(ViewContainerRef);
  private readonly router = inject(Router);

  private embeddedView?: EmbeddedViewRef<unknown>;

  public size = input<string>('md');

  public position = input('center');

  public isDismissable = model(false);

  public isOpen = model(false);

  constructor() {
    super();
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (this.isOpen() && event instanceof NavigationStart) {
        this.close();
      }
    });
  }
  public override fetchClass(): ModalClass {
    return this.themeService.getClasses({
      isOpen: booleanToCoreBoolean(this.isOpen()),
      size: this.size(),
      position: this.position(),
    });
  }

  public open(): void {
    this.isOpen.set(true);
    this.changeBackdrop();
  }

  public close(): void {
    this.isOpen.set(false);
    this.changeBackdrop();
  }

  public toggle(): void {
    this.isOpen.set(!this.isOpen());
    this.changeBackdrop();
  }

  public changeBackdrop(): void {
    if (this.isOpen()) {
      this.createTemplate();
    } else {
      this.destroyTemplate();
    }
  }

  protected onKeydownHandler(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  protected onBackdropClick(event: MouseEvent): void {
    if (event.target == event.currentTarget && this.isDismissable()) {
      this.close();
    }
  }

  private createTemplate(): void {
    if (this.embeddedView) {
      this.destroyTemplate();
    }

    this.embeddedView = this.viewContainer.createEmbeddedView(this.template());
  }

  private destroyTemplate(): void {
    this.embeddedView?.destroy();
  }
}
