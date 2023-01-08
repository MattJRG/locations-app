import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as LocationStore from './location/location.reducer';
import { locationFeatureKey } from './location/location.reducer';

export interface State {
  [locationFeatureKey]: LocationStore.LocationState;
}

export const reducers: ActionReducerMap<State> = {
  [locationFeatureKey]: LocationStore.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];
