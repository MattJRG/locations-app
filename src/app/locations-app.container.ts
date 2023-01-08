import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { LocationFormDialogComponent } from './components/location-form-dialog/location-form-dialog.component';
import { LocationData } from './models/location.model';
import { PageChangeDirection, PageMeta } from './models/pagination.model';
import * as LocationActions from './store/location/location.actions';
import { LocationState, LocationStateAction } from './store/location/location.reducer';
import {
  selectCurrentPageLocations,
  selectLocationStateAction,
  selectPageMeta,
} from './store/location/location.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './locations-app.container.html',
  styleUrls: ['./locations-app.container.scss'],
})
export class LocationsAppContainer implements OnInit, OnDestroy {
  locations$!: Observable<LocationData[]>;
  pageMeta$!: Observable<PageMeta>;
  subscriptions = new Subscription();
  loading = true;

  constructor(
    private readonly _locationStore: Store<LocationState>,
    private readonly _dialog: DialogService,
    private readonly _toast: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.locations$ = this._locationStore.select(selectCurrentPageLocations);
    this.pageMeta$ = this._locationStore.select(selectPageMeta);

    this._locationStore.dispatch(LocationActions.loadLocations());
    this.subscriptions.add(this._setupLocationStateActionSubscription());
  }

  onPageChange(direction: PageChangeDirection): void {
    switch (direction) {
      case PageChangeDirection.NEXT:
        this._locationStore.dispatch(LocationActions.loadNextPageOfLocations());
        break;
      case PageChangeDirection.PREVIOUS:
        this._locationStore.dispatch(LocationActions.loadPrevPageOfLocations());
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
            this._locationStore.dispatch(
              LocationActions.addNewLocation({ location: locationSubmission }),
            );
          } else {
            this._locationStore.dispatch(
              LocationActions.editLocationById({ location: locationSubmission }),
            );
          }
        }
      }),
    );
  }

  onDeleteLocation(id: number): void {
    this._locationStore.dispatch(LocationActions.deleteLocationById({ id }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private _setupLocationStateActionSubscription(): Subscription {
    return this._locationStore.select(selectLocationStateAction).subscribe((action) => {
      switch (action) {
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
      // Reset the state action to allow multiple actions of the same type to show toast
      this._locationStore.dispatch(LocationActions.resetLocationStateAction());
    });
  }
}
