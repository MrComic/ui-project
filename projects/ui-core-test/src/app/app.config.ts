import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  Router,
  withDebugTracing,
  withPreloading,
} from '@angular/router';
import Environment from '../environment/environment';
import { routes } from './app.routes';
import { ConfigurationService } from '../../../ui-core/src/lib/services/ConfigurationService.service';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { isDevMode } from '@angular/core';
import { provideAppInitializer } from '@angular/core';
import { inject } from '@angular/core';
import {
  concat,
  concatMap,
  firstValueFrom,
  forkJoin,
  from,
  map,
  Observable,
  tap,
} from 'rxjs';
import { TranslateLoader } from '../../../ui-core/src/lib/translate/services/translate-loader';
import { TranslateService } from '../../../ui-core/src/lib/translate/services/translate.service';
import { ErrorHandlerService } from '../../../ui-core/src/lib/services/error-handler.service';
import { AuthInterceptor } from '../../../ui-core/src/lib/auth/interceptors/auth.interceptor';
import { LanguagesService } from './core/services/languages.service';
import { AuthService } from '../../../ui-core/src/lib/auth/services/auth.service';
import { CurrenciesService } from './core/services/currencies.service';
import { provideEnvironmentNgxMask } from 'ngx-mask';
const DEFAULT_LANGAGE = 'fa';

export function loadConfigurationData(
  configService: ConfigurationService,
  TranslateService: TranslocoService,
  languageService: LanguagesService,
  currencyService: CurrenciesService
): Observable<any> {
  return configService.loadConfig(Environment.address).pipe(
    concatMap((config) => {
      return TranslateService.load(config.default_language).pipe(
        concatMap((translation) =>
          languageService
            .getavailableLanguages()
            .pipe(
              concatMap((currencies) =>
                currencyService.getavailableCurrencies()
              )
            )
            .pipe(
              map((languages, currencies) => ({
                config,
                translate: translation,
                languages,
                currencies,
              }))
            )
        )
      );
    })
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules)
      // withDebugTracing()
    ),
    ConfigurationService,
    provideHttpClient(withInterceptors([AuthInterceptor])),
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
    provideEnvironmentNgxMask(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'fa'],
        defaultLang: 'fa',
        missingHandler: {
          allowEmpty: true,
          logMissingKey: true,
        },
        interpolation: ['{{', '}}'],
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslateLoader,
    }),
    provideHttpClient(),
    provideAppInitializer(() =>
      loadConfigurationData(
        inject(ConfigurationService),
        inject(TranslateService),
        inject(LanguagesService),
        inject(CurrenciesService)
      )
    ),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return localStorage.getItem('access_token');
          },
        },
      })
    ),
  ],
};
