import { CoreClass } from '../../services/theme/Core.theme';
import { createTheme } from '../../services/util/theme/create-theme';

/**
 * Theme definition for `ModalFooteromponent`
 */
export interface ModalFooterTheme {
  root: {
    base: string;
  };
}

/**
 * Default theme for `ModalFooterComponent`
 */
export const modalFooterTheme: ModalFooterTheme = createTheme({
  root: {
    base: 'flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600',
  },
});

/**
 * Generated class definition for `ModalFooterComponent`
 */
export type ModalFooterClass = CoreClass;
