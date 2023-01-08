import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LocationEffects } from './location.effects';
import * as Location from './location.reducer';
import { LocationApiService } from './location.service';

@NgModule({
  imports: [
    StoreModule.forFeature(Location.locationFeatureKey, Location.reducer),
    EffectsModule.forFeature([LocationEffects]),
  ],
  providers: [LocationApiService],
})
export class LocationStoreModule {}
