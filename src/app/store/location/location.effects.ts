import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as LocationActions from './location.actions';
import { LocationApiService } from './location.service';

@Injectable()
export class LocationEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _locationApi = inject(LocationApiService);
  
  loadLocations$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(LocationActions.loadLocations),
      exhaustMap((action) =>
        this._locationApi.loadLocations().pipe(
          map((locations) =>
            LocationActions.loadLocationsSuccess({
              locations,
            }),
          ),
          catchError((error) => of(LocationActions.loadLocationsFailure({ error }))),
        ),
      ),
    );
  });
}
