import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  OnInit,
  Output
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from "@angular/forms";
import {Address} from "@models/address.model";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatOption, MatOptionModule} from "@angular/material/core";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {AddressFacadeService} from "@store/address/address-facade.service";
import {MatDialog} from "@angular/material/dialog";
import {BehaviorSubject, combineLatest, Observable, Subject, takeUntil, tap} from "rxjs";
import {City} from "@models/city.model";
import {AddCityComponent} from "@dialogs/add-city/add-city.component";

@Component({
  selector: 'app-address-v2',
  templateUrl: './address-v2.component.html',
  styleUrls: ['./address-v2.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressV2Component),
      multi: true
    }
  ],
  imports: [
    AsyncPipe,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressV2Component implements ControlValueAccessor, OnInit, AfterViewInit {
  @Output() removeAddress: EventEmitter<boolean> = new EventEmitter<boolean>();
  private value$: BehaviorSubject<Address | null> = new BehaviorSubject<Address | null>(null);
  public readonly countryControl = new FormControl();
  public readonly cityControl = new FormControl();
  public readonly streetControl = new FormControl();
  public readonly nameControl = new FormControl();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public countries$ = this.addressFacadeService.getAllCountries$().pipe(takeUntil(this.destroy$));
  public currentCities$!: Observable<City[]>;
  public currentCountryName$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(
    private readonly addressFacadeService: AddressFacadeService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    combineLatest([this.countryControl.valueChanges, this.cityControl.valueChanges, this.streetControl.valueChanges, this.nameControl.valueChanges]).pipe(takeUntil(this.destroy$)).subscribe(([country, city, street, name]) => {
      this.value$.next({
        uuid: this.value$.value?.uuid as string,
        countrId: country,
        cityId: city,
        street: street,
        name: name
      });
    });
  }

  public onCountrySelected($event: MatSelectChange): void {
    this.currentCountryName$.next(($event.source.selected as MatOption).viewValue);
  }
  public get addCityButtonDisabled(): boolean {
    return this.countryControl?.value === null;
  }
  public onRemoveAddressClicked(): void {
    this.removeAddress.emit(true);
  }
  public onAddNewCityClicked() {
    this.dialog.open(AddCityComponent, {
      width: '250px',
      data: {
        country: this.currentCountryName$.value,
        countryId: this.countryControl?.value
      }
    })
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
    if (this.value$.value && this.countryControl?.value) {
      this.countryControl?.setValue(this.countryControl?.value);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.onChange(console.log('registerOnChange'));
  }

  registerOnTouched(fn: any): void {
    console.log('registerOnTouched');
  }



  setDisabledState(isDisabled: boolean): void {
    console.log('setDisabledState');
  }

  writeValue(obj: Address): void {
    this.value$.next(obj);
    this.countryControl.setValue(obj.countrId);
    this.cityControl.setValue(obj.cityId);
    this.streetControl.setValue(obj.street);
    this.nameControl.setValue(obj.name);
  }

}
