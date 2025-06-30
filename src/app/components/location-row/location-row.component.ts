import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LocationData } from '../../models/location.model';

@Component({
    selector: 'location-row',
    templateUrl: 'location-row.component.html',
    styleUrls: ['location-row.component.scss'],
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationRowComponent {
  @Input()
  location!: LocationData;

  @Output()
  editLocation = new EventEmitter<LocationData>();

  @Output()
  deleteLocation = new EventEmitter<number>();

  onEditLocation(): void {
    this.editLocation.emit(this.location);
  }

  onDeleteLocation(id: number): void {
    this.deleteLocation.emit(id);
  }
}
