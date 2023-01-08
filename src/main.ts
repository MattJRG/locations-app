import { provideHttpClient } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from '@ngneat/dialog';
import { ToastrModule } from 'ngx-toastr';
import { LocationsAppContainer } from './app/locations-app.container';
import { LocationApiService } from './app/store/location.service';
import { LocationStore } from './app/store/location.store';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(LocationsAppContainer, {
  providers: [
    LocationStore,
    LocationApiService,
    provideHttpClient(),
    importProvidersFrom(
      BrowserAnimationsModule,
      DialogModule.forRoot(),
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-bottom-center',
        preventDuplicates: true,
      }),
    ),
  ],
}).catch((err) => {
  console.log(err);
});
