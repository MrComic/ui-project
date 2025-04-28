import {
  HttpClient,
  HttpContext,
  HttpEvent,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoaderButtonService } from './loader-button.service';
import { LoaderService } from './loader.service';
import { createFormData } from './util/helper';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService,
    private loaderButtonService: LoaderButtonService
  ) {}
  get<T>(
    url: string,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body';
      params?: HttpParams | { [param: string]: string | string[] };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
    withSpinner: boolean = true,
    withSpinnerButton: boolean = true,
    id: string = ''
  ): Observable<T> {
    if (withSpinner && !withSpinnerButton) this.loaderService.show();
    return this.httpClient.get<T>(url, options).pipe(
      finalize(() => {
        if (withSpinner && !withSpinnerButton) {
          setTimeout(() => {
            this.loaderService.hide(id);
          }, 300);
        } else if (withSpinnerButton) {
          this.loaderButtonService.hide();
        }
      })
    );
  }

  getWithFile(
    url: string,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body';
      params?: HttpParams | { [param: string]: string | string[] };
      reportProgress?: boolean;
      responseType?: any; // Corrected responseType type
      withCredentials?: boolean;
    },
    withSpinner: boolean = true,
    withSpinnerButton: boolean = true
  ): Observable<Blob> {
    if (withSpinner && !withSpinnerButton) {
      this.loaderService.show();
    }
    return this.httpClient.get<Blob>(url, { ...options }).pipe(
      finalize(() => {
        if (withSpinner && !withSpinnerButton) {
          this.loaderService.hide();
        } else if (withSpinnerButton) {
          this.loaderButtonService.hide();
        }
      })
    );
  }
  post<T>(
    url: string,
    body: any | null,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body';
      params?: HttpParams | { [param: string]: string | string[] };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
    withSpinner: boolean = true,
    withSpinnerButton: boolean = true
  ): Observable<T> {
    if (withSpinner && !withSpinnerButton) this.loaderService.show();
    return this.httpClient.post<T>(url, body, options).pipe(
      finalize(() => {
        if (withSpinner && !withSpinnerButton) {
          this.loaderService.hide();
        } else if (withSpinnerButton) {
          this.loaderButtonService.hide();
        }
      })
    );
  }
  postWithFile<T>(
    url: string,
    body: any | null,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe: 'body';
      params?: HttpParams | { [param: string]: string | string[] };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
    withSpinnerButton: boolean = true
  ): Observable<T> {
    return this.httpClient.post<T>(url, createFormData(body), options).pipe(
      finalize(() => {
        this.loaderService.hide();
        this.loaderButtonService.hide();
      })
    );
  }

  putWithFile<T>(
    url: string,
    body: any | null,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe: 'body';
      params?: HttpParams | { [param: string]: string | string[] };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
    withSpinnerButton: boolean = true
  ): Observable<T> {
    return this.httpClient.put<T>(url, createFormData(body), options).pipe(
      finalize(() => {
        this.loaderService.hide();
        this.loaderButtonService.hide();
      })
    );
  }

  postWithFileAndReturn(
    url: string,
    body: any | null,
    options: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      context?: HttpContext;
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | ReadonlyArray<string | number | boolean>;
          };
      reportProgress?: boolean;
      responseType: 'blob';
      withCredentials?: boolean;
      transferCache?:
        | {
            includeHeaders?: string[];
          }
        | boolean;
    },
    withSpinnerButton: boolean = true
  ): Observable<Blob> {
    return this.httpClient.post(url, createFormData(body), options).pipe(
      finalize(() => {
        this.loaderService.hide();
        this.loaderButtonService.hide();
      })
    );
  }
  put<T>(
    url: string,
    body: any | null,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body';
      params?: HttpParams | { [param: string]: string | string[] };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
    withSpinnerButton: boolean = true
  ): Observable<T> {
    return this.httpClient.put<T>(url, body, options).pipe(
      finalize(() => {
        this.loaderService.hide();
        this.loaderButtonService.hide();
      })
    );
  }
  delete<T>(
    url: string,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body';
      params?: HttpParams | { [param: string]: string | string[] };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.httpClient.delete<T>(url, options).pipe(
      finalize(() => {
        this.loaderService.hide();
        this.loaderButtonService.hide();
      })
    );
  }
  private checkConfirmModal(): boolean {
    return document.getElementsByTagName('app-confirm-modal').length > 0;
  }
}
