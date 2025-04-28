import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class LoaderButtonService {
  private loaderButtonSubject = new Subject<LoaderButtonState>();
  loaderButtonState = this.loaderButtonSubject.asObservable();
  constructor() {}
 
  hide(){
    this.loaderButtonSubject.next(<LoaderButtonState>{
      show:false,
    })
  }
}
export interface LoaderButtonState {
  show: boolean;
}
