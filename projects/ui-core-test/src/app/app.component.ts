import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreRouterSpinnerComponent } from '../../../ui-core/src/lib/components/core-router-spinner/core-router-spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreRouterSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export default class AppComponent {
  /**
   *
   */
  constructor() {}
}
