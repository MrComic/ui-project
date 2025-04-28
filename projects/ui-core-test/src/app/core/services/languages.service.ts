import { Injectable, signal } from '@angular/core';
import { HttpService } from '../../../../../ui-core/src/lib/services/http.service';
import { ConfigurationService } from '../../../../../ui-core/src/lib/services/ConfigurationService.service';
import { map, Observable, of, tap } from 'rxjs';
import { LanguageQr } from '../models/languages.model';

@Injectable({ providedIn: 'root' })
export class LanguagesService {
  delete(id: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  constructor(
    private http: HttpService,
    private config: ConfigurationService
  ) {}

  data = signal<LanguageQr[]>([]);
  getavailableLanguages = (): Observable<LanguageQr[]> => {
    if (this.data.length > 0) {
      return of(this.data());
    } else {
      var configs = this.config.getAll();
      return this.http
        .get<LanguageQr[]>(`${configs['apiUrl'] + '/languages'}`)
        .pipe(
          tap((d: LanguageQr[]) => {
            console.log(d);
            this.data.set(d);
          })
        )
        .pipe(map((languages) => languages.filter((x) => x.isActive == true)));
    }
  };

  getAll = (): Observable<LanguageQr[]> => {
    var configs = this.config.getAll();
    return this.http.get<LanguageQr[]>(`${configs['apiUrl'] + '/languages'}`);
  };
}
