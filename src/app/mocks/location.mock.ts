import { LocationData } from '../models/location.model';

export const mockLocation = <LocationData>{
  id: 1,
  lat: -21.35188,
  lon: -46.4970116,
  address_line_1: '21696 Independence Court',
  city: 'Muzambinho',
  country: 'Brazil',
  property_value: '$6442876.70',
  business_interruption_value: '$4981944.59',
};

export const getLocations = (num: number): LocationData[] => {
  return Array.from({ length: num }, (elem, i) => ({ ...mockLocation }));
};
