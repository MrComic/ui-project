import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { TranslateService } from '../translate/services/translate.service';
import { AlertService } from '../components/alert/services/alert.service';
import { HttpStatus } from './util/http-status';
import { Router } from '@angular/router';
import { LoaderButtonService } from './loader-button.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(
    private translate: TranslateService,
    private alertService: AlertService,
    private loaderButtonService: LoaderButtonService,
    private router: Router
  ) {}

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
    } else if (!navigator.onLine) {
      this.alertService.alert(['عدم دسترسی به اینترنت'], 'danger');
    } else if (this.isFrameworkError(error)) {
      console.error('Framework/internal error:', error);
    } else {
      console.error('Unhandled error:', error);
      this.loaderButtonService.hide();
      this.alertService.alert(
        ['خطای ناشناخته‌ای رخ داده است. لطفا با تیم فنی تماس بگیرید.'],
        'danger'
      );
    }
  }

  private handleHttpError(error: HttpErrorResponse): void {
    const status = error?.status;
    const errContent = error?.error;

    if (errContent?.message === 'Token expired') {
      this.router.navigate(['login']);
      return;
    }

    switch (status) {
      case HttpStatus.NotFound:
      case HttpStatus.BadRequest:
      case HttpStatus.UnprocessableEntity:
      case HttpStatus.Conflict:
      case HttpStatus.NoContent:
        this.alertService.alert(
          Array.isArray(errContent) ? errContent : [errContent],
          'Error'
        );
        return;

      case HttpStatus.InternalServerError:
        if (Array.isArray(errContent)) {
          this.alertService.alert(errContent, 'danger');
        } else if (errContent?.generalErrors) {
          this.alertService.alert(
            [this.translate.translate(errContent.generalErrors)],
            'danger'
          );
        } else {
          this.alertService.alert(
            [
              'خطایی در سرویس رخ داده است. در صورت ادامه مشکل با تیم پشتیبانی تماس بگیرید',
            ],
            'danger'
          );
        }
        return;

      case 502:
      case 504:
      case 503:
      case 403:
      case 413:
        this.alertService.alert(
          ['سرویس در دسترس نیست یا پاسخ نمی‌دهد. لطفا بعدا تلاش کنید.'],
          'danger'
        );
        return;

      default:
        if (
          typeof errContent === 'string' &&
          errContent.startsWith('<!DOCTYPE html')
        ) {
          this.alertService.alert(
            [
              'خطای نامشخصی از سمت سرور دریافت شد (پاسخ HTML). لطفا با پشتیبانی تماس بگیرید.',
            ],
            'danger'
          );
        }
    }
  }

  private isFrameworkError(error: any): boolean {
    // Common Angular error patterns to ignore
    const ignoredPatterns = [
      /ExpressionChangedAfterItHasBeenCheckedError/,
      /NG0100:/, // Angular's new error codes (v16+)
      /Loading chunk \d+ failed/,
      /Cannot read propert(y|ies)/,
      /Cannot set propert(y|ies)/,
      /undefined is not a function/,
      /null is not an object/,
      /zone-evergreen/,
      /core.js/,
      /vendor.js/,
      /polyfills.js/,
      /Uncaught \(in promise\)/,
      /TypeError/,
      /ReferenceError/,
    ];

    if (error?.message) {
      return ignoredPatterns.some((pattern) => pattern.test(error.message));
    }

    if (error?.stack) {
      return (
        ignoredPatterns.some((pattern) => pattern.test(error.stack)) ||
        error.stack.includes('zone-evergreen') ||
        error.stack.includes('core.js') ||
        error.stack.includes('vendor.js') ||
        error.stack.includes('polyfills.js')
      );
    }

    return false;
  }
}
