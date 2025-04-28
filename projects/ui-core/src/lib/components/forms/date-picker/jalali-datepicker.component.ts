import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  input,
  InputSignal,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { ClickOutsideDirective } from '../../../../directives/click-outside.directive';

@Component({
  selector: 'core-jalali-datepicker',
  templateUrl: './jalali-datepicker.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ClickOutsideDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JalaliDatepickerComponent),
      multi: true,
    },
  ],
})
export class JalaliDatepickerComponent implements OnInit, ControlValueAccessor {
  showDatePicker = false;
  yearView = false;
  monthView = false;
  currentJalaliYear: number;
  currentJalaliMonth: number;
  daysInMonth: number[] = [];
  selectedDate: { year: number; month: number; day: number } | null = null;
  label: InputSignal<string> = input('انتخاب تاریخ');
  weekdays: string[] = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  monthNames: string[] = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ];

  yearRange: number[] = [];
  displayValue: string = '';
  actualValue?: Date;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {
    const today = this.toJalali(new Date());
    this.currentJalaliYear = today.year;
    this.currentJalaliMonth = today.month;
    this.generateYearRange();
  }

  ngOnInit() {
    this.generateCalendar();
  }

  writeValue(value: Date): void {
    this.actualValue = value || '';
    let jalaliDate = this.toJalali(value);
    this.currentJalaliYear = jalaliDate.year;
    this.currentJalaliMonth = jalaliDate.month;
    this.selectDate(jalaliDate.day);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  generateCalendar() {
    const days = this.jalaliDaysInMonth(
      this.currentJalaliYear,
      this.currentJalaliMonth
    );
    this.daysInMonth = Array.from({ length: days }, (_, i) => i + 1);
  }

  selectDate(day: number) {
    this.selectedDate = {
      year: this.currentJalaliYear,
      month: this.currentJalaliMonth,
      day,
    };

    const gregorianDate = this.toGregorian(
      this.currentJalaliYear,
      this.currentJalaliMonth,
      day
    );

    this.actualValue = gregorianDate;

    this.displayValue =
      this.selectedDate.year.toString() +
      '/' +
      this.selectedDate.month.toString() +
      '/' +
      this.selectedDate.day.toString();
    this.onChange(this.actualValue);
    this.showDatePicker = false;
  }

  selectToday() {
    // Get today's Jalali date
    const today = this.toJalali(new Date());

    // Set the current month, year, and day to today
    this.currentJalaliYear = today.year;
    this.currentJalaliMonth = today.month;
    this.selectedDate = {
      year: today.year,
      month: today.month,
      day: today.day,
    };

    // Refresh the calendar view
    this.generateCalendar();

    // Do NOT close the datepicker
    this.showDatePicker = true;

    // Update the input field with the Gregorian equivalent
    const gregorianDate = this.toGregorian(today.year, today.month, today.day);
    this.displayValue = gregorianDate.toISOString().split('T')[0];
    this.onChange(this.displayValue);
  }

  // Utility Methods
  jalaliDaysInMonth(year: number, month: number): number {
    return month < 6
      ? 31
      : month < 11
      ? 30
      : this.isJalaliLeapYear(year)
      ? 30
      : 29;
  }

  isJalaliLeapYear(year: number): boolean {
    return ((((year - 474) % 2820) + 474 + 38) * 682) % 2816 < 682;
  }

  toGregorian(jYear: number, jMonth: number, jDay: number): Date {
    const gy = jYear + 621;
    let leapDays = 0;

    // Leap Year Adjustment
    const isLeap = this.isJalaliLeapYear(jYear);
    const jalaliMonthDays = [
      31,
      31,
      31,
      31,
      31,
      31,
      30,
      30,
      30,
      30,
      30,
      isLeap ? 30 : 29,
    ];

    let dayOfYear = jDay;
    for (let i = 0; i < jMonth; i++) {
      dayOfYear += jalaliMonthDays[i];
    }

    // Convert dayOfYear to Gregorian
    const gDate = new Date(gy, 2, 21); // March 21st is the first day of Jalali year
    gDate.setDate(gDate.getDate() + dayOfYear - 1);

    return gDate;
  }

  toJalali(date: Date): { year: number; month: number; day: number } {
    const gDay = date.getDate();
    const gMonth = date.getMonth() + 1; // JavaScript months are 0-based
    const gYear = date.getFullYear();

    const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let jYear: number;
    let jMonth: number;
    let jDay: number;

    const gLeap = (gYear % 4 === 0 && gYear % 100 !== 0) || gYear % 400 === 0;

    if (gLeap) gDaysInMonth[1] = 29;

    const gy = gYear - 1600;
    const gm = gMonth - 1;
    const gd = gDay - 1;

    let gDayNo =
      365 * gy +
      Math.floor((gy + 3) / 4) -
      Math.floor((gy + 99) / 100) +
      Math.floor((gy + 399) / 400);

    for (let i = 0; i < gm; ++i) gDayNo += gDaysInMonth[i];
    gDayNo += gd;

    let jDayNo = gDayNo - 79;

    const jNp = Math.floor(jDayNo / 12053);
    jDayNo %= 12053;

    jYear = 979 + 33 * jNp + 4 * Math.floor(jDayNo / 1461);
    jDayNo %= 1461;

    if (jDayNo >= 366) {
      jYear += Math.floor((jDayNo - 1) / 365);
      jDayNo = (jDayNo - 1) % 365;
    }

    const jalaliDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    jMonth = 0;
    for (; jMonth < 11 && jDayNo >= jalaliDaysInMonth[jMonth]; ++jMonth) {
      jDayNo -= jalaliDaysInMonth[jMonth];
    }
    jDay = jDayNo + 1;

    return { year: jYear, month: jMonth, day: jDay };
  }

  isSelected(day: number): boolean {
    return (
      (this.selectedDate &&
        this.selectedDate.year === this.currentJalaliYear &&
        this.selectedDate.month === this.currentJalaliMonth &&
        this.selectedDate.day === day) ||
      false
    );
  }

  selectMonth(month: number) {
    this.currentJalaliMonth = month;
    this.yearView = false;
    this.monthView = false;
    this.generateCalendar();
  }

  nextMonth() {
    this.currentJalaliMonth++;
    if (this.currentJalaliMonth > 11) {
      this.currentJalaliMonth = 0;
      this.currentJalaliYear++;
    }
    this.generateCalendar();
  }

  previousMonth() {
    this.currentJalaliMonth--;
    if (this.currentJalaliMonth < 0) {
      this.currentJalaliMonth = 11;
      this.currentJalaliYear--;
    }
    this.generateCalendar();
  }

  toggleYearMonthView() {
    if (this.monthView == false && this.yearView == false) {
      this.monthView = true;
    } else if (this.monthView == true && this.yearView == false) {
      this.yearView = true;
      this.monthView = false;
    } else {
      this.monthView = false;
      this.yearView = false;
    }
  }

  onClickOutside() {
    this.showDatePicker = false;
  }

  selectYear(year: number) {
    this.currentJalaliYear = year;
    this.yearView = false;
    this.monthView = false;
    this.generateCalendar();
  }

  generateYearRange() {
    this.yearRange = Array.from({ length: 50 }, (_, i) => 1400 - i)
      .concat(Array.from({ length: 50 }, (_, i) => 1400 + i))
      .sort();
  }
}
