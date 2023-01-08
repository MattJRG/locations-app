import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogModule, DialogService } from '@ngneat/dialog';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { MockProvider } from 'ng-mocks';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { LocationFormDialogComponent } from './components/location-form-dialog/location-form-dialog.component';
import { LocationsAppContainer } from './locations-app.container';
import { LocationData } from './models/location.model';
import { PageChangeDirection, PageMeta } from './models/pagination.model';
import { LocationApiService } from './store/location.service';
import { LocationStore } from './store/location.store';

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

const locationsStoreStub = {
  state$: of({}),
  locations$: of(getLocations(10)),
  currentPageLocations: of(getLocations(10)),
  pageMeta$: of(<PageMeta>{}),
  loadLocations: () => {},
  loadNextPageOfLocations: () => {},
  loadPrevPageOfLocations: () => {},
  deleteLocationById: (id: number) => {},
};

describe('LocationsAppContainer', () => {
  let spectator: Spectator<LocationsAppContainer>;
  let locationApiService: LocationApiService;
  let locationStore: LocationStore;
  let dialogService: DialogService;
  let toastService: ToastrService;

  const createComponent = createComponentFactory({
    component: LocationsAppContainer,
    componentProviders: [
      {
        provide: LocationStore,
        useValue: locationsStoreStub,
      },
      MockProvider(DialogService),
      MockProvider(ToastrService),
    ],
    imports: [
      CommonModule,
      HttpClientTestingModule,
      RouterTestingModule,
      LocationFormDialogComponent,
      DialogModule.forRoot(),
      ToastrModule.forRoot(),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    locationApiService = spectator.inject(LocationApiService);
    dialogService = spectator.inject(DialogService);
    toastService = spectator.inject(ToastrService);
    locationStore = spectator.fixture.debugElement.injector.get(LocationStore);
  });

  it('should call the loadLocations effect on the locationsStore during ngOnInit.', () => {
    // GIVEN
    const loadLocationsSpy = jest.spyOn(locationStore, 'loadLocations');

    // WHEN
    spectator.component.ngOnInit();
    spectator.detectComponentChanges();

    // THEN
    expect(loadLocationsSpy).toHaveBeenCalled();
  });

  it('should call the loadNextPageOfLocations when the onPageChange method is called with the argument of PageChangeDirection.NEXT.', () => {
    // GIVEN
    const loadNextPageOfLocationsSpy = jest.spyOn(locationStore, 'loadNextPageOfLocations');

    // WHEN
    spectator.component.onPageChange(PageChangeDirection.NEXT);
    spectator.detectComponentChanges();

    // THEN
    expect(loadNextPageOfLocationsSpy).toHaveBeenCalled();
  });

  it('should call the loadPrevPageOfLocations when the onPageChange method is called with the argument of PageChangeDirection.PREVIOUS.', () => {
    // GIVEN
    const loadPrevPageOfLocationsSpy = jest.spyOn(locationStore, 'loadPrevPageOfLocations');

    // WHEN
    spectator.component.onPageChange(PageChangeDirection.PREVIOUS);
    spectator.detectComponentChanges();

    // THEN
    expect(loadPrevPageOfLocationsSpy).toHaveBeenCalled();
  });

  it('should call the deleteLocationById when the onPageChange method is called with the argument of PageChangeDirection.PREVIOUS.', () => {
    // GIVEN
    const deleteLocationByIdSpy = jest.spyOn(locationStore, 'deleteLocationById');

    // WHEN
    spectator.component.onDeleteLocation(1);
    spectator.detectComponentChanges();

    // THEN
    expect(deleteLocationByIdSpy).toHaveBeenCalledWith(1);
  });
});
