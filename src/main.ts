import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideState, provideStore } from '@ngrx/store';
import { metaReducers, reducers } from './app/store/reducer';
import { provideEffects } from '@ngrx/effects';
import { LocationsAppContainer } from './app/locations-app.container';
import { LocationEffects } from './app/store/location/location.effects';
import { DialogModule } from '@ngneat/dialog';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(LocationsAppContainer, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    provideStore(reducers, {
      metaReducers
    }),
    provideState('location', reducers.location),
    provideEffects(LocationEffects),
    importProvidersFrom(DialogModule.forRoot())
  ]
})
