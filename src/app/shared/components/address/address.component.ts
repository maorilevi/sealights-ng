import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import {AddressFacadeService} from "../../../store/address/address-facade.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {BehaviorSubject, Observable, Subject, takeUntil, tap} from "rxjs";
import {City} from "@models/city.model";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {AddCityComponent} from "../../dialogs/add-city/add-city.component";
import {MatOption} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  imports: [
    AsyncPipe,
    NgForOf,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    AddCityComponent,
    NgIf,
    MatIconModule,
    MatMenuModule
  ],
  standalone: true
})
export class AddressComponent implements OnDestroy, AfterViewInit {
  @Input() addressForm!: FormGroup;
  @Output() removeAddress: EventEmitter<boolean> = new EventEmitter<boolean>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public countries$ = this.addressFacadeService.getAllCountries$().pipe(takeUntil(this.destroy$));
  public currentCities$!: Observable<City[]>;
  public currentCountryName$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private readonly addressFacadeService: AddressFacadeService, private dialog: MatDialog) {
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onAddNewCityClicked() {
    this.dialog.open(AddCityComponent, {
      width: '250px',
      data: {
        country: this.currentCountryName$.value,
        countryId: this.cityControl?.value
      }
    })
  }

  public get addCityButtonDisabled(): boolean {
    return this.countryControl?.value === null;
  }

  public onCountrySelected($event: MatSelectChange): void {
    this.currentCountryName$.next(($event.source.selected as MatOption).viewValue);
  }

  public onRemoveAddressClicked(): void {
    this.removeAddress.emit(true);
  }

  public ngAfterViewInit(): void {
    this.initCountryOnChange();
    this.triggerFirstSelectFromExisting();
  }

  private initCountryOnChange(): void {
    this.countryControl?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.currentCities$ = this.addressFacadeService.getCitiesByCountryId$(value).pipe(takeUntil(this.destroy$), tap((cities) => {
      }));
    });
  }

  private triggerFirstSelectFromExisting(): void {
    if (this.addressForm && this.countryControl?.value && this.cityControl?.value) {
      this.countryControl?.setValue(this.countryControl?.value);
    }
  }

  public get nameControl(): FormControl | null {
    if (!this.addressForm) return null;
    return this.addressForm.get('name') as FormControl;
  }

  public get countryControl(): FormControl | null {
    if (!this.addressForm) return null;
    return this.addressForm.get('countrId') as FormControl;
  }

  public get cityControl(): FormControl | null {
    if (!this.addressForm) return null;
    return this.addressForm.get('cityId') as FormControl;
  }

  public get streetControl(): FormControl | null {
    if (!this.addressForm) return null;
    return this.addressForm.get('street') as FormControl;
  }

}
