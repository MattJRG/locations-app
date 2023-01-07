import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LocationsAppContainer } from './locations-app.container';

@NgModule({
  declarations: [
    LocationsAppContainer
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [LocationsAppContainer]
})
export class LocationsAppContainerModule { }
