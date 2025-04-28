import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private _alert: Subject<AlertModel> = new Subject();
  readonly alert$: Observable<AlertModel> = this._alert.asObservable();
  constructor() {}
  alert(messages: string[], type: string) {
    let model = new AlertModel();
    model.messages = messages;
    model.type = type;
    this._alert.next(model);
  }
}

export class AlertModel {
  messages?: string[];
  type?: string;
}
