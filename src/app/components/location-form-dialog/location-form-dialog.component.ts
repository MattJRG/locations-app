import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';
import { LocationData, LocationForm } from '../../models/location.model';

@Component({
    templateUrl: 'location-form-dialog.component.html',
    styleUrls: ['location-form-dialog.component.scss'],
    imports: [ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationFormDialogComponent {
  private readonly _fb = inject(FormBuilder);
  public readonly ref = inject(DialogRef);

  isEditing = !!this.ref.data?.id;
  formGroup: FormGroup<LocationForm> = this._buildLocationForm(this.ref.data);

  onCloseDialog(): void {
    this.ref.close();
  }

  onSaveLocation(): void {
    if (!this.formGroup.valid) {
      this.formGroup.markAsDirty();
      return;
    }

    const locationSubmission = {
      ...this.formGroup.getRawValue(),
      id: this.ref.data?.id,
    };

    this.ref.close(locationSubmission);
  }

  private _buildLocationForm(location?: LocationData): FormGroup<LocationForm> {
    return this._fb.nonNullable.group({
      lat: [location?.lat ?? 0, Validators.required],
      lon: [location?.lon ?? 0, Validators.required],
      address_line_1: [location?.address_line_1 ?? '', Validators.required],
      city: [location?.city ?? '', Validators.required],
      country: [location?.country ?? '', Validators.required],
      property_value: [location?.property_value ?? 0, Validators.required],
      business_interruption_value: [location?.business_interruption_value ?? 0, Validators.required],
    }) as FormGroup<LocationForm>;
  }
}
