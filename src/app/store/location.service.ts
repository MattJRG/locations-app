import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LocationData } from '../models/location.model';

export const LOCATIONS_JSON_PATH = './assets/json/locations.json';

@Injectable({
  providedIn: 'root',
})
export class LocationApiService {
  constructor(private _http: HttpClient) {}

  loadLocations(): Observable<LocationData[]> {
    return this._http.get<LocationData[]>(LOCATIONS_JSON_PATH).pipe(
      map((res) => res),
      catchError((error) => throwError(error)),
    );
  }
}
