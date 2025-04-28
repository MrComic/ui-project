import {
  Component,
  input,
  InputSignal,
  effect,
  ViewChild,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { ModalHeaderComponent } from '../../modal/modal-header.component';
import { ModalBodyComponent } from '../../modal/modal-body.component';
import { ModalFooterComponent } from '../../modal/modal-footer.component';
import { ButtonComponent } from '../button/button.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { CardComponent } from '../../card/card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { LoaderButtonDirective } from '../../../../directives/loader-button.directive';

@Component({
  selector: 'core-confirm-modal',
  imports: [
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    LoaderButtonDirective,
    FontAwesomeModule,
    TranslocoPipe,
    ButtonComponent,
  ],
  standalone: true,
  templateUrl: './core-confirm-modal.component.html',
})
export class CoreConfirmModalComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.modalEl?.open();
  }
  yesIcon: any = faCheck;
  noIcon: any = faExclamation;
  title: string = '';
  body: string = '';
  @Output() confirm = new EventEmitter<boolean>();
  @ViewChild('default_modal') modalEl?: ModalComponent;

  onYes() {
    this.confirm.emit(true);
  }

  onNo() {
    this.modalEl?.close();
    this.confirm.emit(false);
  }
}
