import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  constructor() {}
  show(id: string = '') {
    this.loaderSubject.next(<LoaderState>{
      show: true,
      id: id,
    });
  }
  hide(id: string = '') {
    this.loaderSubject.next(<LoaderState>{
      show: false,
      id: id,
    });
  }
}
export interface LoaderState {
  show: boolean;
  id: string;
}
