import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CoreTheme } from './Core.theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  $theme = new BehaviorSubject<CoreTheme>('light');

  setTheme(theme: CoreTheme) {
    this.$theme.next(theme);
  }

  toggleTheme() {
    const theme = this.$theme.getValue();
    console.log(theme);
    this.setTheme(theme === 'dark' ? 'light' : 'dark');
  }
}
