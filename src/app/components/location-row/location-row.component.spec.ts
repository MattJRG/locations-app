import { mockLocation } from '../../mocks/location.mock';
import { LocationRowComponent } from './location-row.component';

describe('LocationRowComponent', () => {
  let component: LocationRowComponent;
  let mockEditLocation: jest.Mock;
  let mockDeleteLocation: jest.Mock;

  beforeEach(() => {
    component = new LocationRowComponent();
    component.location = mockLocation;

    mockEditLocation = jest.fn();
    component.editLocation.subscribe(mockEditLocation);
    mockDeleteLocation = jest.fn();
    component.deleteLocation.subscribe(mockDeleteLocation);
  });

  it('onEditLocation calls the editLocation event emitter with the correct argument', () => {
    // WHEN
    component.onEditLocation();

    // THEN
    expect(mockEditLocation).toHaveBeenCalledWith(component.location);
  });

  it('onDeleteLocation calls the deleteLocation event emitter with the correct argument', () => {
    // WHEN
    component.onDeleteLocation(1);

    // THEN
    expect(mockDeleteLocation).toHaveBeenCalledWith(component.location.id);
  });
});
