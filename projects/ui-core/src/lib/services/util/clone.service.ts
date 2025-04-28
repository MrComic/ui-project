import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class CloneService {
  deepClone<T>(value: any): T {
    return JSON.parse(JSON.stringify(value));
  }
}
