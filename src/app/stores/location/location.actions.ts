import { createAction, props } from '@ngrx/store';
import { LocationData } from '../../models/location.model';

export const LOAD_LOCATIONS = '[Location] Load Locations';
export const LOAD_LOCATIONS_SUCCESS = '[Location] Load Locations Success';
export const LOAD_LOCATIONS_FAILURE = '[Location] Load Locations Failure';
export const ADD_NEW_LOCATION = '[Location] Add New Location';
export const EDIT_LOCATION_BY_ID = '[Location] Edit Location By Id';
export const DELETE_LOCATION_BY_ID = '[Location] Delete Location By Id';
export const LOAD_NEXT_PAGE_OF_LOCATIONS = '[Location] Load Next Page Of Locations';
export const LOAD_PREV_PAGE_OF_LOCATIONS = '[Location] Load Prev Page Of Locations';
export const RESET_LOCATION_STATE_ACTION = '[Location] Reset Location State Action';

export const loadLocations = createAction(LOAD_LOCATIONS);
export const loadLocationsSuccess = createAction(
  LOAD_LOCATIONS_SUCCESS,
  props<{ locations: LocationData[] }>(),
);
export const loadLocationsFailure = createAction(LOAD_LOCATIONS_FAILURE, props<{ error: any }>());

export const addNewLocation = createAction(ADD_NEW_LOCATION, props<{ location: LocationData }>());
export const editLocationById = createAction(
  EDIT_LOCATION_BY_ID,
  props<{ location: LocationData }>(),
);
export const deleteLocationById = createAction(DELETE_LOCATION_BY_ID, props<{ id: number }>());

export const loadNextPageOfLocations = createAction(LOAD_NEXT_PAGE_OF_LOCATIONS);
export const loadPrevPageOfLocations = createAction(LOAD_PREV_PAGE_OF_LOCATIONS);
export const resetLocationStateAction = createAction(RESET_LOCATION_STATE_ACTION);
