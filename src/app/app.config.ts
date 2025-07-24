import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { formBuilderFeature } from './store/form-builder.feature';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { icons } from './icons-provider';
import { FormBuilderEffects } from './store/form-builder.effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { FormEffects } from './store/form.effects';
import { stepFeature } from './store/step.feature';
import { StepEffects } from './store/step.effects';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideEffects([FormEffects, FormBuilderEffects, StepEffects]),
    provideStore({
      router: routerReducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState(formBuilderFeature),
    provideState(stepFeature),
    provideNzIcons(icons),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideRouterStore(),
  ],
};
