import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jalali',
  pure: false,
})
export class JalaliPipe implements PipeTransform {
  transform(value: any, args?: 'time'): any {
    let result;
    var dateWithTime = new Date(value)
      .toLocaleDateString('fa-IR-u-nu-latn', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })
      .replace('،', ' ')
      .replace(',', ' ');

    var date = new Date(value).toLocaleDateString('fa-IR-u-nu-latn', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      formatMatcher: 'basic',
    });

    args == 'time'
      ? (result = value ? dateWithTime : '')
      : (result = value ? date : '');
    return result;
  }
}
