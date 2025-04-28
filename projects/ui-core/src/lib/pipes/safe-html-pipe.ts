import { Pipe, PipeTransform } from '@angular/core';
import { PersianDate } from '../services/PersianDate';

@Pipe({
  name: 'safeHtml',
  pure: false,
})
export class SafeHtmlPipe implements PipeTransform {
  transform(value: any, args?: 'time'): any {
    let result;
    var date = new PersianDate(value);
    args == 'time'
      ? (result = value
          ? `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
          : (result = value ? date.toLocaleDateString() : ''))
      : '';
    return result;
  }
}
