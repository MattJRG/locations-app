import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { asyncScheduler, Observable, of, scheduled, throwError } from 'rxjs';

// Mocks
import { getLocations } from '../../mocks/location.mock';
import * as LocationActions from './location.actions';

// Store
import { LocationEffects } from './location.effects';
import { LocationApiService } from './location.service';

// Stubs
const serviceStub = {
  loadLocations() {
    return scheduled('', asyncScheduler);
  },
};

const locations = getLocations(10);

describe('LocationEffects', () => {
  let actions$: Observable<Action>;
  let spectator: SpectatorService<LocationEffects>;
  let service: LocationApiService;
  let effects: LocationEffects;

  const createService = createServiceFactory({
    service: LocationEffects,
    providers: [
      provideMockStore({}),
      provideMockActions(() => actions$),
      {
        provide: LocationApiService,
        useValue: serviceStub,
      },
    ],
  });

  beforeEach(() => {
    spectator = createService();
    actions$ = spectator.inject(Actions);
    service = spectator.inject(LocationApiService);
    effects = spectator.inject(LocationEffects);
  });

  describe('loadLocations$', () => {
    it('should return a collection from loadLocationsSuccess', () => {
      // GIVEN
      const spy = jest.spyOn(service, 'loadLocations');
      spy.mockReturnValue(of(locations));

      const action = LocationActions.loadLocations();
      const completion = LocationActions.loadLocationsSuccess({
        locations,
      });

      // WHEN
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      // THEN
      expect(effects.loadLocations$).toBeObservable(expected);
    });

    it('should return an error from loadLocationsFailure', () => {
      // GIVEN
      const spy = jest.spyOn(service, 'loadLocations');
      spy.mockReturnValue(throwError('Fake error'));

      const action = LocationActions.loadLocations();
      const completion = LocationActions.loadLocationsFailure({
        error: 'Fake error',
      });

      // WHEN
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      // THEN
      expect(effects.loadLocations$).toBeObservable(expected);
    });
  });
});
