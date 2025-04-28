import { CoreClass } from '../../services/theme/Core.theme';
import { createTheme } from '../../services/util/theme/create-theme';

export interface ModalHeaderProperties {}

export interface ModalHeaderTheme {
  root: {
    base: string;
  };
  title: {
    base: string;
  };
  button: {
    base: string;
  };
}

/**
 * Default theme for `ModalComponent`
 */
export const modalHeaderTheme: ModalHeaderTheme = createTheme({
  root: {
    base: 'flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600',
  },
  title: {
    base: 'text-xl font-medium text-gray-900 dark:text-white',
  },
  button: {
    base: 'text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 mr-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white ',
  },
});

/**
 * Generated class definition for `ModalComponent`
 */
export interface ModalHeaderClass extends CoreClass {
  modalHeaderTitleClass: string;
  modalHeaderButtonClass: string;
}
