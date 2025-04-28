import {
  modalFooterTheme,
  type ModalFooterClass,
  type ModalFooterTheme,
} from './modal-footer.theme';

import { inject, Injectable, InjectionToken } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Injectable({
  providedIn: 'root',
})
export class ModalFooterThemeService {
  private readonly baseTheme = modalFooterTheme;

  public getClasses(): ModalFooterClass {
    const theme: ModalFooterTheme = this.baseTheme;

    const output: ModalFooterClass = {
      rootClass: twMerge(theme.root.base),
    };

    return output;
  }
}
