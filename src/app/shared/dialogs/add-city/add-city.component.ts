import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AddressFacadeService} from "../../../store/address/address-facade.service";

class DialogData {
}

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCityComponent implements OnInit {
  newCityForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  })
  constructor(
    private addressFacadeService: AddressFacadeService,
    public dialogRef: MatDialogRef<AddCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {country: string, countryId: string}) { }

  ngOnInit(): void {
  }
  get title(): string {
    return `Add City ${this.data?.country ?? ''}`;
  }

  onSave() {
    const newCity = {
      ...this.newCityForm.getRawValue(),
      countryId: this.data?.countryId
    };
    this.addressFacadeService.addCity(newCity);
    this.dialogRef.close();
  }
}
