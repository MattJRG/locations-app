import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, throwError } from 'rxjs';
import { getNewPageMetaAfterPagination, paginateResults } from '../helpers/pagination.helper';
import { LocationData } from '../models/location.model';
import { PageChangeDirection, PageMeta } from '../models/pagination.model';
import { LocationApiService } from './location.service';

const DEFAULT_PAGE_SIZE = 20;

export interface LocationsState {
  currentPageLocations: LocationData[];
  locations: LocationData[];
  pageMeta: PageMeta;

  action: LocationStateAction;
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

const initialStateHandling: Partial<LocationsState> = {
  action: LocationStateAction.NO_ACTION,
  error: null,
};

export const initialState: Partial<LocationsState> = {
  locations: [],
  pageMeta: {
    currentPage: 1,
    nextPage: null,
    pageSize: DEFAULT_PAGE_SIZE,
    prevPage: null,
    totalCount: 20,
    totalPages: 1,
  },
  ...initialStateHandling,
};

@Injectable()
export class LocationStore extends ComponentStore<LocationsState> {
  readonly setInitialStateHandling = this.updater((state: LocationsState) => {
    return {
      ...state,
      ...initialStateHandling,
    };
  });

  readonly loadNextPageOfLocations = this.updater((state: LocationsState) => {
    return {
      ...state,
      currentPageLocations: _getLocationsForPage(state.locations, state.pageMeta.nextPage!),
      // Update page meta
      pageMeta: getNewPageMetaAfterPagination(PageChangeDirection.NEXT, state.pageMeta),
      ...initialStateHandling,
    };
  });

  readonly loadPrevPageOfLocations = this.updater((state: LocationsState) => {
    return {
      ...state,
      currentPageLocations: _getLocationsForPage(state.locations, state.pageMeta.prevPage!),
      // Update page meta
      pageMeta: getNewPageMetaAfterPagination(PageChangeDirection.PREVIOUS, state.pageMeta),
      ...initialStateHandling,
    };
  });

  readonly addNewLocation = this.updater((state: LocationsState, newLocation: LocationData) => {
    const newLocations = [...state.locations, { ...newLocation, id: state.locations.length }];
    return {
      ...state,
      locations: [...newLocations],
      currentPageLocations: _getLocationsForPage(newLocations, state.pageMeta.currentPage),
      pageMeta: getLocationsPageMeta(newLocations, state.pageMeta),
      ...initialStateHandling,
      action: LocationStateAction.LOCATION_ADDED,
    };
  });

  readonly editLocationById = this.updater(
    (state: LocationsState, editedLocation: LocationData) => {
      return {
        ...state,
        locations: state.locations.map((location) =>
          location.id === editedLocation.id ? editedLocation : location,
        ),
        ...initialStateHandling,
        action: LocationStateAction.LOCATION_UPDATED,
      };
    },
  );

  readonly deleteLocationById = this.updater((state: LocationsState, locationId: number) => {
    const newLocations = state.locations.filter((location) => location.id !== locationId);
    return {
      ...state,
      locations: [...newLocations],
      currentPageLocations: _getLocationsForPage(newLocations, state.pageMeta.currentPage),
      pageMeta: getLocationsPageMeta(newLocations, state.pageMeta),
      ...initialStateHandling,
      action: LocationStateAction.LOCATION_DELETED,
    };
  });

  readonly loadLocations = this.effect(() => {
    return this._location.loadLocations().pipe(
      tapResponse(
        (locations) => {
          this.setState((state) => ({
            ...state,
            locations: [...locations],
            currentPageLocations: locations.slice(0, DEFAULT_PAGE_SIZE),
            pageMeta: getLocationsPageMeta(locations, state.pageMeta),
            ...initialStateHandling,
            action: LocationStateAction.LOCATIONS_LOADED,
          }));
        },
        (error) => this._handleError(error),
      ),
    );
  });

  readonly locations$ = this.select((state) => {
    return state.locations;
  });

  readonly currentPageLocations$ = this.select((state) => {
    return state.currentPageLocations;
  });

  readonly pageMeta$ = this.select((state) => {
    return state.pageMeta;
  });

  constructor(private readonly _location: LocationApiService) {
    super(<LocationsState>initialState);
  }

  private _handleError(
    error: any,
    action: LocationStateAction = LocationStateAction.HAS_ERROR,
  ): Observable<never> {
    this.setState((state) => ({
      ...state,
      action,
    }));

    return throwError(error);
  }
}

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
