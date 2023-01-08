import { getLocations } from '../../mocks/location.mock';
import * as fromActions from './location.actions';
import * as fromReducer from './location.reducer';

describe('locationReducer', () => {
  describe('LOAD_LOCATIONS action', () => {
    it('should set the initial state', () => {
      const { initialState } = fromReducer;
      const action = fromActions.loadLocations();
      const state = fromReducer.reducer(initialState, action);

      expect(state.locations).toEqual(initialState.locations);
    });
  });

  describe('LOAD_LOCATIONS_SUCCESS action', () => {
    it('should set locations in the state', () => {
      const locations = getLocations(10);
      const { initialState } = fromReducer;

      const action = fromActions.loadLocationsSuccess({ locations });
      const state = fromReducer.reducer(initialState, action);

      expect(state.locations).toEqual(locations);
    });
  });

  describe('LOAD_LOCATIONS_FAILURE action', () => {
    it('should set locations in the state', () => {
      const { initialState } = fromReducer;
      const action = fromActions.loadLocationsFailure({ error: 'Some Error' });
      const state = fromReducer.reducer(initialState, action);

      expect(state.action).toEqual(fromReducer.LocationStateAction.HAS_ERROR);
    });
  });
});
