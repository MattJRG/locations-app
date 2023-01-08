import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { LocationApiService, LOCATIONS_JSON_PATH } from './location.service';

describe('Location Service', () => {
  let spectator: SpectatorHttp<LocationApiService>;
  const createHttp = createHttpFactory({
    service: LocationApiService,
  });

  beforeEach(() => (spectator = createHttp()));

  it('should make a GET request when requesting loadMuseumDepartments', () => {
    // WHEN
    spectator.service.loadLocations().subscribe();

    // THEN
    spectator.expectOne(LOCATIONS_JSON_PATH, HttpMethod.GET);
  });
});
