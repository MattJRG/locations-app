import { createFeatureSelector, createSelector } from '@ngrx/store';
import { locationFeatureKey, LocationState } from './location.reducer';

export const selectLocationState = createFeatureSelector<LocationState>(locationFeatureKey);

export const selectLocationStateAction = createSelector(
  selectLocationState,
  (state) => state?.action,
);

export const selectLocations = createSelector(selectLocationState, (state) => state.locations);
export const selectCurrentPageLocations = createSelector(
  selectLocationState,
  (state) => state.currentPageLocations,
);
export const selectPageMeta = createSelector(selectLocationState, (state) => state.pageMeta);
