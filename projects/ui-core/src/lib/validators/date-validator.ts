import { AbstractControl } from '@angular/forms';

export class DateValidator {
  static dateValidator(AC: AbstractControl) {
    if (AC && AC.value) {
      let date = new Date(AC.value).toLocaleDateString('fa-IR-u-nu-latn');
      if (date == 'Invalid Date') {
        return { dateValidator: true };
      }
    }
    return null;
  }
}

export function DateLessOrEqualThenValidator(lessThenDate: Date): any {
  return (AC: AbstractControl): { [key: string]: any } => {
    if (AC && AC.value) {
      let date = new Date(AC.value).toLocaleDateString('fa-IR-u-nu-latn');
      if (date != 'Invalid Date' && new Date(AC.value) > lessThenDate) {
        return { dateLessOrEqualThenValidator: true };
      }
    }
    return { dateLessOrEqualThenValidator: false };
  };
}
