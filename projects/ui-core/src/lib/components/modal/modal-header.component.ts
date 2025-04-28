import { CLOSE_SVG_ICON } from '../../services/util/icon.list';
import { BaseComponent } from '../base-component.directive';
import { IconComponent, IconRegistry } from '../icon';
import type { ModalHeaderClass, ModalHeaderTheme } from './modal-header.theme';
import { ModalHeaderThemeService } from './modal-header.theme.service';
import { ModalComponent } from './modal.component';

import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [IconComponent],
  selector: 'core-modal-header',
  template: `
    <h3 [class]="contentClasses().modalHeaderTitleClass">
      <ng-content />
    </h3>
    <button
      type="button"
      [class]="contentClasses().modalHeaderButtonClass"
      data-modal-hide="medium-modal"
      (click)="modalComponent.close()"
    >
      <core-icon svgIcon="flowbite-angular:close" class="w-5 h-5" />
      <span class="sr-only">Close modal</span>
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalHeaderComponent
  extends BaseComponent<ModalHeaderClass>
  implements OnInit
{
  /**
   * Service injected used to generate class
   */
  public readonly stateService = inject(ModalHeaderThemeService);
  /**
   * The parent `ModalComponent`
   */
  public readonly modalComponent = inject(ModalComponent);
  /**
   * `IconRegistry` service
   */
  public readonly iconRegistry = inject(IconRegistry);
  /**
   * `DomSanitizer` service
   */
  public readonly domSanitizer = inject(DomSanitizer);

  //#region BaseComponent implementation
  public override fetchClass(): ModalHeaderClass {
    return this.stateService.getClasses();
  }

  public override init(): void {
    this.iconRegistry.addRawSvgIconInNamepsace(
      'flowbite-angular',
      'close',
      this.domSanitizer.bypassSecurityTrustHtml(CLOSE_SVG_ICON)
    );
  }
  //#endregion
}
