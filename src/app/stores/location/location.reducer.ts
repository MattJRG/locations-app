import { createReducer, on } from '@ngrx/store';
import { getNewPageMetaAfterPagination, paginateResults } from '../../helpers/pagination.helper';
import { LocationData } from '../../models/location.model';
import { PageChangeDirection, PageMeta } from '../../models/pagination.model';
import * as LocationActions from './location.actions';

export const locationFeatureKey = 'location';

const DEFAULT_PAGE_SIZE = 20;

export interface LocationState {
  currentPageLocations: LocationData[];
  locations: LocationData[];
  pageMeta: PageMeta;

  action: LocationStateAction;
  payload: any;
  error: any;
}

export enum LocationStateAction {
  NO_ACTION,

  LOCATIONS_LOADED,
  LOCATION_ADDED,
  LOCATION_UPDATED,
  LOCATION_DELETED,

  HAS_ERROR,
}

const initialStateHandling = <LocationState>{
  action: LocationStateAction.NO_ACTION,
  payload: null,
  error: null,
};

export const initialState: LocationState = {
  ...initialStateHandling,
  locations: [],
  pageMeta: {
    currentPage: 1,
    nextPage: null,
    pageSize: DEFAULT_PAGE_SIZE,
    prevPage: null,
    totalCount: 20,
    totalPages: 1,
  },
};

export const reducer = createReducer(
  initialState,

  on(LocationActions.loadLocations, (state) => ({
    ...state,
    ...initialStateHandling,
  })),
  on(LocationActions.loadLocationsSuccess, (state, { locations }) => ({
    ...state,
    locations: [...locations],
    currentPageLocations: locations.slice(0, DEFAULT_PAGE_SIZE),
    pageMeta: getLocationsPageMeta(locations, state.pageMeta),
    action: LocationStateAction.LOCATIONS_LOADED,
  })),
  on(LocationActions.loadLocationsFailure, (state) => ({
    ...state,
    action: LocationStateAction.HAS_ERROR,
  })),
  on(LocationActions.addNewLocation, (state, { location }) => {
    const newLocations = [...state.locations, { ...location, id: state.locations.length }];

    return {
      ...state,
      locations: [...newLocations],
      currentPageLocations: _getLocationsForPage(newLocations, state.pageMeta.currentPage),
      pageMeta: getLocationsPageMeta(newLocations, state.pageMeta),
      action: LocationStateAction.LOCATION_ADDED,
    };
  }),
  on(LocationActions.editLocationById, (state, { location }) => {
    const newLocations = state.locations.map((el) => (el.id === location.id ? location : el));

    return {
      ...state,
      locations: newLocations,
      currentPageLocations: _getLocationsForPage(newLocations, state.pageMeta.currentPage),
      action: LocationStateAction.LOCATION_UPDATED,
    };
  }),
  on(LocationActions.deleteLocationById, (state, { id }) => {
    const newLocations = state.locations.filter((location) => location.id !== id);
    return {
      ...state,
      locations: [...newLocations],
      currentPageLocations: _getLocationsForPage(newLocations, state.pageMeta.currentPage),
      pageMeta: getLocationsPageMeta(newLocations, state.pageMeta),
      action: LocationStateAction.LOCATION_DELETED,
    };
  }),
  on(LocationActions.loadNextPageOfLocations, (state) => ({
    ...state,
    ...initialStateHandling,
    currentPageLocations: _getLocationsForPage(state.locations, state.pageMeta.nextPage!),
    pageMeta: getNewPageMetaAfterPagination(PageChangeDirection.NEXT, state.pageMeta),
  })),
  on(LocationActions.loadPrevPageOfLocations, (state) => ({
    ...state,
    ...initialStateHandling,
    currentPageLocations: _getLocationsForPage(state.locations, state.pageMeta.prevPage!),
    pageMeta: getNewPageMetaAfterPagination(PageChangeDirection.PREVIOUS, state.pageMeta),
  })),
  on(LocationActions.resetLocationStateAction, (state) => ({
    ...state,
    ...initialStateHandling,
  })),
);

const getLocationsPageMeta = (locations: LocationData[], pageMeta: PageMeta): PageMeta => {
  const paginatedLocations = paginateResults(locations, DEFAULT_PAGE_SIZE);
  return {
    pageSize: DEFAULT_PAGE_SIZE,
    currentPage: pageMeta.currentPage,
    nextPage: pageMeta.currentPage === paginatedLocations.length ? null : pageMeta.currentPage + 1,
    prevPage: pageMeta.currentPage === 1 ? null : pageMeta.currentPage - 1,
    totalCount: locations.length,
    totalPages: paginatedLocations.length,
  };
};

const _getLocationsForPage = (locations: LocationData[], page: number): LocationData[] => {
  const paginatedLocations = paginateResults(locations, DEFAULT_PAGE_SIZE);
  return paginatedLocations[page - 1];
};
