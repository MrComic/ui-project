import { Injectable, signal } from '@angular/core';
import { HttpService } from '../../../../../ui-core/src/lib/services/http.service';
import { ConfigurationService } from '../../../../../ui-core/src/lib/services/ConfigurationService.service';
import { filter, map, Observable, of, tap } from 'rxjs';
import { LanguageQr } from '../models/languages.model';
import { CurrencyQr } from '../models/currencies.model';

@Injectable({ providedIn: 'root' })
export class CurrenciesService {
  delete(id: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  constructor(
    private http: HttpService,
    private config: ConfigurationService
  ) {}

  data = signal<CurrencyQr[]>([]);

  getavailableCurrencies = (): Observable<CurrencyQr[]> => {
    if (this.data.length > 0) {
      return of(this.data());
    } else {
      var configs = this.config.getAll();
      return this.http
        .get<CurrencyQr[]>(`${configs['apiUrl'] + '/currencies'}`)
        .pipe(
          tap((d: CurrencyQr[]) => {
            this.data.set(d);
          })
        )
        .pipe(
          map((currencies) => currencies.filter((x) => x.isActive == true))
        );
    }
  };

  getAllCurrencies = (): Observable<CurrencyQr[]> => {
    var configs = this.config.getAll();
    return this.http.get<CurrencyQr[]>(`${configs['apiUrl'] + '/currencies'}`);
  };
}
