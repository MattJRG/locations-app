import { getLocations, mockLocation } from '../../mocks/location.mock';
import * as fromActions from './location.actions';
import { loadLocations, loadLocationsFailure, loadLocationsSuccess } from './location.actions';

describe('Location Actions', () => {
  describe('loadLocations', () => {
    it('should create an action', () => {
      // GIVEN
      const action = fromActions.loadLocations();

      // THEN
      expect(action).toEqual({
        type: fromActions.LOAD_LOCATIONS,
      });
    });
  });

  describe('loadLocationsSuccess', () => {
    it('should create an action', () => {
      // GIVEN
      const locations = getLocations(10);
      const action = fromActions.loadLocationsSuccess({ locations });

      // THEN
      expect(action).toEqual({
        type: fromActions.LOAD_LOCATIONS_SUCCESS,
        locations,
      });
    });
  });

  describe('loadLocationsFailure', () => {
    it('should create an action', () => {
      // GIVEN
      const error = 'Something is wrong';
      const payload = {
        error,
      };
      const action = fromActions.loadLocationsFailure(payload);

      // THEN
      expect(action).toEqual({
        type: fromActions.LOAD_LOCATIONS_FAILURE,
        error,
      });
    });
  });

  describe('addNewLocation', () => {
    it('should create an action', () => {
      // GIVEN
      const location = mockLocation;
      const action = fromActions.addNewLocation({ location });

      // THEN
      expect(action).toEqual({
        type: fromActions.ADD_NEW_LOCATION,
        location,
      });
    });
  });

  describe('editLocationById', () => {
    it('should create an action', () => {
      // GIVEN
      const location = mockLocation;
      const action = fromActions.editLocationById({ location });

      // THEN
      expect(action).toEqual({
        type: fromActions.EDIT_LOCATION_BY_ID,
        location,
      });
    });
  });

  describe('deleteLocationById', () => {
    it('should create an action', () => {
      // GIVEN
      const id = 1;
      const action = fromActions.deleteLocationById({ id });

      // THEN
      expect(action).toEqual({
        type: fromActions.DELETE_LOCATION_BY_ID,
        id,
      });
    });
  });

  describe('loadNextPageOfLocations', () => {
    it('should create an action', () => {
      // GIVEN
      const action = fromActions.loadNextPageOfLocations();

      // THEN
      expect(action).toEqual({
        type: fromActions.LOAD_NEXT_PAGE_OF_LOCATIONS,
      });
    });
  });

  describe('loadPrevPageOfLocations', () => {
    it('should create an action', () => {
      // GIVEN
      const action = fromActions.loadPrevPageOfLocations();

      // THEN
      expect(action).toEqual({
        type: fromActions.LOAD_PREV_PAGE_OF_LOCATIONS,
      });
    });
  });

  describe('resetLocationStateAction', () => {
    it('should create an action', () => {
      // GIVEN
      const action = fromActions.resetLocationStateAction();

      // THEN
      expect(action).toEqual({
        type: fromActions.RESET_LOCATION_STATE_ACTION,
      });
    });
  });
});
