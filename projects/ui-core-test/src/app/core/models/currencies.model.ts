export class CurrencyQr {
  title: string;
  symbol: string;
  isActive: boolean = true;
  constructor(title: string, symbol: string) {
    this.title = title;
    this.symbol = symbol;
  }
}
