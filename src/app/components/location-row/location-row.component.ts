import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, input, output, Output } from '@angular/core';
import { LocationData } from '../../models/location.model';

@Component({
    selector: 'location-row',
    templateUrl: 'location-row.component.html',
    styleUrls: ['location-row.component.scss'],
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationRowComponent {
  location = input.required<LocationData>();

  editLocation = output<LocationData>();

  deleteLocation = output<number>();

  onEditLocation(): void {
    this.editLocation.emit(this.location());
  }

  onDeleteLocation(id: number): void {
    this.deleteLocation.emit(id);
  }
}
