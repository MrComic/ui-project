import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TranslateLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(langPath: string) {
    return this.http.get<Translation>(`./translate/${langPath}.json`);
  }
}
