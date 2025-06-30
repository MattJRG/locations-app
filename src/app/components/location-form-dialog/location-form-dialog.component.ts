import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';
import { LocationData, LocationForm } from '../../models/location.model';

@Component({
    templateUrl: 'location-form-dialog.component.html',
    styleUrls: ['location-form-dialog.component.scss'],
    imports: [CommonModule, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationFormDialogComponent {
  formGroup!: FormGroup<LocationForm>;
  isEditing!: boolean;

  constructor(
    public ref: DialogRef<LocationData, LocationData>,
    private readonly _fb: FormBuilder,
  ) {
    this.isEditing = !!this.ref.data?.id;
    if (this.ref.data) {
      this.formGroup = this._buildLocationForm(this.ref.data);
    } else {
      this.formGroup = this._buildLocationForm();
    }
  }

  onCloseDialog(): void {
    this.ref.close();
  }

  onSaveLocation(): void {
    if (!this.formGroup.valid) {
      this.formGroup.markAsDirty();
    }
    const locationSubmission = {
      ...this.formGroup.getRawValue(),
      id: this.ref.data?.id,
    };
    this.ref.close(locationSubmission);
  }

  private _buildLocationForm(location?: LocationData): FormGroup {
    return this._fb.group({
      lat: [location?.lat || null, Validators.required],
      lon: [location?.lon || null, Validators.required],
      address_line_1: [location?.address_line_1 || null, Validators.required],
      city: [location?.city || null, Validators.required],
      country: [location?.country || null, Validators.required],
      property_value: [location?.property_value || null, Validators.required],
      business_interruption_value: [
        location?.business_interruption_value || null,
        Validators.required,
      ],
    });
  }
}
