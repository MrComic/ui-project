export class PersianDate extends Date {
  constructor(date) {
    super(date);
  }

  toLocaleDateString = () => super.toLocaleDateString('fa-IR-u-nu-latn');
  getParts = () =>
    super
      .toLocaleDateString('fa-IR-u-nu-latn')
      .split('/')
      .map((p) => Number(p));
  getPersianDay = () => (super.getDay() === 6 ? 0 : super.getDay() + 1);
  getPersianDate = () => this.getParts()[2];
  getPersianMonth = () => this.getParts()[1] - 1;
  toLocaleTimeString = () => super.toLocaleTimeString('fa-IR-u-nu-latn');
  getPersianYear = () => this.getParts()[0];
  getMonthName = () => super.toLocaleDateString('fa-IR', { month: 'long' });
  getDayName = () => super.toLocaleDateString('fa-IR', { weekday: 'long' });
}
