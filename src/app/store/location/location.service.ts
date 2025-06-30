import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocationData } from '../../models/location.model';

export const LOCATIONS_JSON_PATH = './assets/json/locations.json';

@Injectable({
  providedIn: 'root',
})
export class LocationApiService {
  private readonly _http = inject(HttpClient);

  loadLocations(): Observable<LocationData[]> {
    return this._http.get<LocationData[]>(LOCATIONS_JSON_PATH).pipe(
      catchError((error) => throwError(() => error)),
    );
  }
}
