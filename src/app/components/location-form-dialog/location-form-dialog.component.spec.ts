import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';
import { mockLocation } from '../../mocks/location.mock';
import { LocationFormDialogComponent } from './location-form-dialog.component';

describe('DialogComponent', () => {
  let component: LocationFormDialogComponent;
  let fixture: ComponentFixture<LocationFormDialogComponent>;
  let dialogRef: DialogRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: DialogRef,
          useValue: {
            data: { ...mockLocation },
            close: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationFormDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(DialogRef);
  });

  it('should populate the form with the location data.', () => {
    // GIVEN
    const expectedFormOutput = {
      lat: -21.35188,
      lon: -46.4970116,
      address_line_1: '21696 Independence Court',
      city: 'Muzambinho',
      country: 'Brazil',
      property_value: '$6442876.70',
      business_interruption_value: '$4981944.59',
    };

    // THEN
    expect(component.formGroup.getRawValue()).toEqual(expectedFormOutput);
  });

  it('should set isEditing to true if location data is provided.', () => {
    expect(component.isEditing).toBeTruthy();
  });

  it('should close the dialog when the onCloseDialog method is called', async () => {
    // GIVEN;
    jest.spyOn(dialogRef, 'close');

    // WHEN
    component.onCloseDialog();

    // THEN
    await fixture.whenStable().then(() => {
      expect(dialogRef.close).toHaveBeenCalled();
    });
  });

  it('should close the dialog when the onSaveLocation method is called', async () => {
    // GIVEN;
    jest.spyOn(dialogRef, 'close');

    // WHEN
    component.onSaveLocation();

    // THEN
    await fixture.whenStable().then(() => {
      expect(dialogRef.close).toHaveBeenCalledWith(mockLocation);
    });
  });
});
