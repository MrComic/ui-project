import { BaseComponent } from '../base-component.directive';
import type { ModalBodyClass, ModalBodyTheme } from './modal-body.theme';
import { ModalBodyThemeService } from './modal-body.theme.service';
import { ModalComponent } from './modal.component';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'core-modal-body',
  template: `<ng-content />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalBodyComponent extends BaseComponent<ModalBodyClass> {
  public readonly themeService = inject(ModalBodyThemeService);

  public readonly modalComponent = inject(ModalComponent);

  public override fetchClass(): ModalBodyClass {
    return this.themeService.getClasses();
  }
}
