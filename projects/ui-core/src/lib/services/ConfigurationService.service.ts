import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private config: any;

  constructor(private http: HttpClient) {}

  public loadConfig(url: string): Observable<any> {
    return this.http
      .get(url)
      .pipe(
        catchError((error) => {
          console.log('error loading application');
          throw error;
        })
      )
      .pipe(
        tap((config) => {
          this.config = config;
          return config;
        })
      );
  }

  getAll() {
    return this.config;
  }

  getConfig(key: string): string {
    return this.config[key];
  }
}
