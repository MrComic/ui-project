import type {
  ModalHeaderClass,
  ModalHeaderProperties,
  ModalHeaderTheme,
} from './modal-header.theme';

import { inject, Injectable, InjectionToken } from '@angular/core';
import { twMerge } from 'tailwind-merge';
import { modalHeaderTheme } from '.';

@Injectable({
  providedIn: 'root',
})
export class ModalHeaderThemeService {
  public getClasses(): ModalHeaderClass {
    const theme: ModalHeaderTheme = modalHeaderTheme;

    const output: ModalHeaderClass = {
      rootClass: twMerge(theme.root.base),
      modalHeaderTitleClass: twMerge(theme.title.base),
      modalHeaderButtonClass: twMerge(theme.button.base),
    };

    return output;
  }
}
