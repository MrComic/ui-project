import {
  Injectable,
  ComponentRef,
  Injector,
  ViewContainerRef,
  model,
} from '@angular/core';
import { ApplicationRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CoreConfirmModalComponent } from '../core-confirm-modal.component';
import { ModalComponent } from '../../../modal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ConfirmModalServiceService {
  constructor(
    private appRef: ApplicationRef,

    private injector: Injector
  ) {}
  componentRef: any;

  closeModal() {
    this.removeModal(this.componentRef);
  }

  showConfirmModal(
    viewContainerRef: ViewContainerRef,
    model: { title: string; body: string }
  ): Observable<boolean> {
    const subject = new Subject<boolean>();

    this.componentRef = viewContainerRef.createComponent(
      CoreConfirmModalComponent,
      { injector: this.injector }
    );

    this.componentRef.instance.title = model.title;
    this.componentRef.instance.body = model.body;
    this.componentRef.instance.confirm.subscribe((result: boolean) => {
      subject.next(result);
    });

    const domElem = (this.componentRef.hostView as any)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    return subject.asObservable();
  }

  private removeModal(
    componentRef: ComponentRef<CoreConfirmModalComponent>
  ): void {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
