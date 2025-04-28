import type { OnInit } from '@angular/core';
import {
  afterNextRender,
  computed,
  Directive,
  inject,
  Injector,
  signal,
} from '@angular/core';
import { CoreClass } from '../services/theme/Core.theme';
import { generateId, Guid } from '../services/util/theme/id.generator';

@Directive({
  standalone: true,
  host: {
    '[class]': 'this.contentClasses().rootClass',
    '[attr.core-id]': 'this.coreId()',
  },
})
export abstract class BaseComponent<TClass extends CoreClass>
  implements OnInit
{
  public readonly injector = inject(Injector);

  public readonly coreId = signal<Guid>(new Guid(Guid.empty));

  public contentClasses = computed<TClass>(() => this.fetchClass());

  public ngOnInit(): void {
    this.init();

    afterNextRender(
      () => {
        this.coreId.set(generateId());
      },
      { injector: this.injector }
    );
  }

  public init(): void {}

  public abstract fetchClass(): TClass;
}
