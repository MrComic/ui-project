import { BaseComponent } from '../base-component.directive';
import type { ModalFooterClass, ModalFooterTheme } from './modal-footer.theme';
import { ModalFooterThemeService } from './modal-footer.theme.service';
import { ModalComponent } from './modal.component';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  InjectionToken,
  makeEnvironmentProviders,
  model,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'core-modal-footer',
  template: `<ng-content />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFooterComponent extends BaseComponent<ModalFooterClass> {
  /**
   * Service injected used to generate class
   */
  public readonly themeService = inject(ModalFooterThemeService);
  /**
   * The parent `ModalComponent`
   */
  public readonly modalComponent = inject(ModalComponent);

  //#region BaseComponent implementation
  public override fetchClass(): ModalFooterClass {
    return this.themeService.getClasses();
  }
  //#endregion
}
