import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { LocationFormDialogComponent } from './components/location-form-dialog/location-form-dialog.component';
import { LocationRowComponent } from './components/location-row/location-row.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LocationData } from './models/location.model';
import { PageChangeDirection, PageMeta } from './models/pagination.model';
import { LocationStateAction, LocationStore } from './store/location.store';

@Component({
  selector: 'app-root',
  templateUrl: './locations-app.container.html',
  styleUrls: ['./locations-app.container.scss'],
  standalone: true,
  imports: [CommonModule, PaginationComponent, LocationRowComponent],
})
export class LocationsAppContainer implements OnInit, OnDestroy {
  locations$!: Observable<LocationData[]>;
  pageMeta$!: Observable<PageMeta>;
  subscriptions = new Subscription();
  loading = true;

  constructor(
    private readonly _locationStore: LocationStore,
    private readonly _dialog: DialogService,
    private readonly _toast: ToastrService,
  ) {}

  ngOnInit(): void {
    this.locations$ = this._locationStore.currentPageLocations$;
    this.pageMeta$ = this._locationStore.pageMeta$;

    this._locationStore.loadLocations();
    this.subscriptions.add(this._setupLocationStateActionSubscription());
  }

  onPageChange(direction: PageChangeDirection): void {
    switch (direction) {
      case PageChangeDirection.NEXT:
        this._locationStore.loadNextPageOfLocations();
        break;
      case PageChangeDirection.PREVIOUS:
        this._locationStore.loadPrevPageOfLocations();
        break;
    }
  }

  openLocationFormDialog(location?: LocationData): void {
    this.subscriptions.add(
      this._dialog
        .open(LocationFormDialogComponent, { data: location })
        .afterClosed$.subscribe((locationSubmission) => {
          if (locationSubmission) {
            if (!locationSubmission.id) {
              this._locationStore.addNewLocation(locationSubmission);
            } else {
              this._locationStore.editLocationById(locationSubmission);
            }
          }
        }),
    );
  }

  onDeleteLocation(id: number): void {
    this._locationStore.deleteLocationById(id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private _setupLocationStateActionSubscription(): Subscription {
    return this._locationStore.state$.subscribe((state) => {
      switch (state.action) {
        case LocationStateAction.LOCATIONS_LOADED:
          this.loading = false;
          break;
        case LocationStateAction.LOCATION_ADDED:
          this._toast.success('New location added successfully', 'Success');
          break;
        case LocationStateAction.LOCATION_UPDATED:
          this._toast.success('Location updated successfully', 'Success');
          break;
        case LocationStateAction.LOCATION_DELETED:
          this._toast.success('Location deleted successfully', 'Success');
          break;
        case LocationStateAction.HAS_ERROR:
          this._toast.error('Action failed, please try again', 'Error');
      }
    });
  }
}
