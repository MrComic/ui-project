import {
  modalBodyTheme,
  type ModalBodyClass,
  type ModalBodyTheme,
} from './modal-body.theme';

import { inject, Injectable, InjectionToken } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Injectable({
  providedIn: 'root',
})
export class ModalBodyThemeService {
  private readonly baseTheme = modalBodyTheme;

  public getClasses(): ModalBodyClass {
    const theme = this.baseTheme;

    const output: ModalBodyClass = {
      rootClass: twMerge(theme.root.base),
    };

    return output;
  }
}
