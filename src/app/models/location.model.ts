import { FormControl } from '@angular/forms';

export interface LocationData {
  id: number;
  lat: number;
  lon: number;
  address_line_1: string;
  city: string;
  country: string;
  property_value: string;
  business_interruption_value: string;
}

export interface LocationForm {
  lat: FormControl<number>;
  lon: FormControl<number>;
  address_line_1: FormControl<string>;
  city: FormControl<string>;
  country: FormControl<string>;
  property_value: FormControl<string>;
  business_interruption_value: FormControl<string>;
}
