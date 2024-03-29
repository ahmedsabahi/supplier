import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule
} from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatNativeDateModule } from '@angular/material/core';
import { provideIcons } from './core/icons/icons.provider';
import { provideLuxon } from './core/luxon/luxon.provider';
import { provideVex } from '@vex/vex.provider';
import { provideNavigation } from './core/navigation/navigation.provider';
import { vexConfigs } from '@vex/config/vex-configs';
import { provideQuillConfig } from 'ngx-quill';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthInterceptorService } from './core/services/auth-interceptor.service';
import { LoggingInterceptorService } from './core/services/logging-interceptor.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {
  MatSnackBarModule,
  MatSnackBarConfig,
  MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material/snack-bar';

const matSnackbarDefaultConfig: MatSnackBarConfig = {
  verticalPosition: 'top',
  horizontalPosition: 'right',
  duration: 2500
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: matSnackbarDefaultConfig
    },
    importProvidersFrom(
      BrowserModule,
      MatDialogModule,
      MatBottomSheetModule,
      MatNativeDateModule,
      HttpClientModule,
      SweetAlert2Module.forRoot(),

      TranslateModule.forRoot({
        defaultLanguage: localStorage.getItem('selectedLanguage') ?? 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    },
    provideRouter(
      appRoutes,
      // TODO: Add preloading withPreloading(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      })
    ),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),

    provideVex({
      /**
       * The config that will be used by default.
       * This can be changed at runtime via the config panel or using the VexConfigService.
       */
      config: vexConfigs.poseidon,
      /**
       * Only themes that are available in the config in tailwind.config.ts should be listed here.
       * Any theme not listed here will not be available in the config panel.
       */
      availableThemes: [
        {
          name: 'Default',
          className: 'vex-theme-default'
        },
        {
          name: 'Teal',
          className: 'vex-theme-teal'
        },
        {
          name: 'Green',
          className: 'vex-theme-green'
        },
        {
          name: 'Purple',
          className: 'vex-theme-purple'
        },
        {
          name: 'Red',
          className: 'vex-theme-red'
        },
        {
          name: 'Orange',
          className: 'vex-theme-orange'
        }
      ]
    }),
    provideNavigation(),
    provideIcons(),
    provideLuxon(),
    provideQuillConfig({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['clean'],
          ['link', 'image']
        ]
      }
    })
  ]
};
