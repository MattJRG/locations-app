import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogModule, DialogService } from '@ngneat/dialog';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockProvider } from 'ng-mocks';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LocationFormDialogComponent } from './components/location-form-dialog/location-form-dialog.component';
import { LocationRowComponent } from './components/location-row/location-row.component';
import { LocationsAppContainer } from './locations-app.container';
import { LocationData } from './models/location.model';
import { PageChangeDirection } from './models/pagination.model';
import * as LocationActions from './stores/location/location.actions';
import { LocationStateAction } from './stores/location/location.reducer';
import { selectCurrentPageLocations } from './stores/location/location.selectors';
import { LocationApiService } from './stores/location/location.service';

export const getLocations = (num: number): LocationData[] => {
  return Array.from({ length: num }, (elem, i) => ({ ...mockLocation }));
};

const mockLocation = <LocationData>{
  id: 1,
  lat: -21.35188,
  lon: -46.4970116,
  address_line_1: '21696 Independence Court',
  city: 'Muzambinho',
  country: 'Brazil',
  property_value: '$6442876.70',
  business_interruption_value: '$4981944.59',
};

const initialState = { locations: getLocations(10), action: LocationStateAction.NO_ACTION };

describe('LocationsAppContainer', () => {
  let spectator: Spectator<LocationsAppContainer>;
  let locationApiService: LocationApiService;
  let store: MockStore;
  let dialogService: DialogService;
  let toastService: ToastrService;

  const createComponent = createComponentFactory({
    component: LocationsAppContainer,
    providers: [
      provideMockStore({
        initialState,
        selectors: [
          {
            selector: selectCurrentPageLocations,
            value: getLocations(10),
          },
        ],
      }),
      MockProvider(DialogService),
      MockProvider(ToastrService),
    ],
    imports: [
      CommonModule,
      HttpClientTestingModule,
      RouterTestingModule,
      LocationFormDialogComponent,
      LocationRowComponent,
      DialogModule.forRoot(),
      ToastrModule.forRoot(),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    locationApiService = spectator.inject(LocationApiService);
    dialogService = spectator.inject(DialogService);
    toastService = spectator.inject(ToastrService);
    store = spectator.inject(MockStore);
  });

  it('should call the loadLocations effect on the locationsStore during ngOnInit.', () => {
    // GIVEN
    const spy = jest.spyOn(store, 'dispatch');

    // WHEN
    spectator.component.ngOnInit();
    spectator.detectComponentChanges();

    // THEN
    expect(spy).toHaveBeenCalledWith(LocationActions.loadLocations());
  });

  it('should call the loadNextPageOfLocations when the onPageChange method is called with the argument of PageChangeDirection.NEXT.', () => {
    // GIVEN
    const spy = jest.spyOn(store, 'dispatch');

    // WHEN
    spectator.component.onPageChange(PageChangeDirection.NEXT);
    spectator.detectComponentChanges();

    // THEN
    expect(spy).toHaveBeenCalledWith(LocationActions.loadNextPageOfLocations());
  });

  it('should call the loadPrevPageOfLocations when the onPageChange method is called with the argument of PageChangeDirection.PREVIOUS.', () => {
    // GIVEN
    const spy = jest.spyOn(store, 'dispatch');

    // WHEN
    spectator.component.onPageChange(PageChangeDirection.PREVIOUS);
    spectator.detectComponentChanges();

    // THEN
    expect(spy).toHaveBeenCalledWith(LocationActions.loadPrevPageOfLocations());
  });

  it('should call the deleteLocationById when the onPageChange method is called with the argument of PageChangeDirection.PREVIOUS.', () => {
    // GIVEN
    const spy = jest.spyOn(store, 'dispatch');

    // WHEN
    spectator.component.onDeleteLocation(1);
    spectator.detectComponentChanges();

    // THEN
    expect(spy).toHaveBeenCalledWith(LocationActions.deleteLocationById({ id: 1 }));
  });
});
