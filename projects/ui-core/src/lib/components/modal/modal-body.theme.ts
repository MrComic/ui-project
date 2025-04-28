import { CoreClass } from '../../services/theme/Core.theme';
import { createTheme } from '../../services/util/theme/create-theme';

export interface ModalBodyTheme {
  root: {
    base: string;
  };
}

export const modalBodyTheme: ModalBodyTheme = createTheme({
  root: {
    base: 'block p-6 space-y-6',
  },
});

export type ModalBodyClass = CoreClass;
