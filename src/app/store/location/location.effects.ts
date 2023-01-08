import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as LocationActions from './location.actions';
import { LocationApiService } from './location.service';

@Injectable()
export class LocationEffects {
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

  constructor(
    private readonly _actions$: Actions,
    private readonly _locationApi: LocationApiService,
  ) {}
}
