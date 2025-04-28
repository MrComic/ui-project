import {
  Component,
  Input,
  HostBinding,
  input,
  InputSignal,
} from '@angular/core';

@Component({
  selector: 'core-layout-item',
  template: '<ng-content></ng-content>',
  standalone: true,
  styleUrls: [],
})
export class CoreLayoutItemComponent {
  cols: InputSignal<number> = input<number>(1);

  public layouts: Record<number, string> = {
    1: 'col-span-1',
    2: 'col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2',
    3: 'col-span-1 md:col-span-3 lg:col-span-3 xl:col-span-3',
    4: 'col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-4',
    5: 'col-span-1 md:col-span-5 lg:col-span-5 xl:col-span-5',
    6: 'col-span-1 md:col-span-6 lg:col-span-6 xl:col-span-6',
    7: 'col-span-1 md:col-span-7 lg:col-span-7 xl:col-span-7',
    8: 'col-span-1 md:col-span-8 lg:col-span-8 xl:col-span-8',
    9: 'col-span-1 md:col-span-9 lg:col-span-9 xl:col-span-9',
    10: 'col-span-1 md:col-span-10 lg:col-span-10 xl:col-span-10',
    11: 'col-span-1 md:col-span-11 lg:col-span-11 xl:col-span-11',
    12: 'col-span-1 md:col-span-12 lg:col-span-12 xl:col-span-12',
  };

  @HostBinding('class')
  get hostClasses(): string {
    return this.layouts[this.cols()];
  }
}
