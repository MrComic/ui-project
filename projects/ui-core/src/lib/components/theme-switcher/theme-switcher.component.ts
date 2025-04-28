import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'core-theme-switcher',
  imports: [NgIf],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.css',
})
export class ThemeSwitcherComponent {
  private themeSubscription: Subscription | undefined = undefined;

  constructor(readonly themeService: ThemeService, private metaService: Meta) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  ngOnInit(): void {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        'matchMedia' in window &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      this.themeService.setTheme('dark');
      document.documentElement.setAttribute('data-ag-theme-mode', 'dark');

      this.metaService.updateTag({
        name: 'theme-color',
        content: 'rgb(31 41 55)',
      });
      document.documentElement.classList.add('dark');
    } else {
      this.themeService.setTheme('light');
      this.metaService.updateTag({
        name: 'theme-color',
        content: 'white',
      });
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-ag-theme-mode', 'light');
    }

    this.themeSubscription = this.themeService.$theme
      .asObservable()
      .subscribe((theme) => {
        localStorage.setItem('color-theme', theme);
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.setAttribute('data-ag-theme-mode', 'dark');
          this.metaService.updateTag({
            name: 'theme-color',
            content: 'rgb(31 41 55)',
          });
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.setAttribute('data-ag-theme-mode', 'light');
          this.metaService.updateTag({
            name: 'theme-color',
            content: 'white',
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
  }
}
