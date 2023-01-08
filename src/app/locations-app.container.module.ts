import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from '@ngneat/dialog';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { LocationRowComponent } from './components/location-row/location-row.component';
import { PaginationComponent } from './components/pagination/pagination.component';

import { LocationsAppContainer } from './locations-app.container';
import { LocationStoreModule } from './store/location/location-store.module';
import { LocationApiService } from './store/location/location.service';
import { metaReducers, reducers } from './store/reducer';

@NgModule({
  declarations: [LocationsAppContainer],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    PaginationComponent,
    LocationRowComponent,
    LocationStoreModule,
    DialogModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot(),
  ],
  providers: [LocationApiService],
  bootstrap: [LocationsAppContainer],
})
export class LocationsAppContainerModule {
}
