import { Component, signal, Signal } from '@angular/core';
import { ConfigurationService } from '../../services/ConfigurationService.service';
import { ThemeSwitcherComponent } from '../../components/theme-switcher/theme-switcher.component';
import { SidebarService } from '../../services/sidebar/sidebar.service';

@Component({
  selector: 'ui-default-header',
  imports: [ThemeSwitcherComponent],
  templateUrl: './default-header.component.html',
  styleUrl: './default-header.component.css',
})
export class DefaultHeaderComponent {
  public logo = signal<string>('logo.png');
  public name = signal<string>('');

  constructor(
    private config: ConfigurationService,
    public sidebarService: SidebarService
  ) {
    this.logo.set(config.getConfig('applicationImage'));
    this.name.set(config.getConfig('applicationName'));
  }

  toggleContent() {
    this.sidebarService.toggleCollapsed();
  }
}
