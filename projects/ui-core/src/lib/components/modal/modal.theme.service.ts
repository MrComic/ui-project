import {
  modalTheme,
  type ModalClass,
  type ModalProperties,
  type ModalTheme,
} from './modal.theme';

import { inject, Injectable, InjectionToken } from '@angular/core';
import { twMerge } from 'tailwind-merge';
export const FLOWBITE_MODAL_THEME_TOKEN = new InjectionToken<ModalTheme>(
  'FLOWBITE_MODAL_THEME_TOKEN'
);

@Injectable({
  providedIn: 'root',
})
export class ModalThemeService {
  public getClasses(properties: ModalProperties): ModalClass {
    const theme: ModalTheme = modalTheme;

    const output: ModalClass = {
      rootClass: twMerge(theme.root.base),
      modalWrapperClass: twMerge(
        theme.wrapper.base,
        theme.wrapper.position[properties.position]
      ),
      modalContainerClass: twMerge(
        theme.container.base,
        theme.container.size[properties.size]
      ),
      modalContentClass: twMerge(theme.content.base),
    };

    return output;
  }
}
