import {Injectable} from "@angular/core";
import {AddressService} from "@services/address/address.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import * as AddressActions from "./address.actions";
import {Country} from "@models/country.model";

@Injectable()
export class AddressEffects {
  constructor(
    private actions$: Actions, private addressService: AddressService) {
  }

  readonly allCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.getAllCountries),
      switchMap((action) =>
        this.addressService.allCountries().pipe(map((countries: Country[]) => {
            return AddressActions.getAllCountriesSuccess(countries);
          }), catchError((error: any) => of(AddressActions.getAllCountriesFailure(error)))
        ))
    ));
  readonly addCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.addCity),
      switchMap((action) =>
        this.addressService.addCity(action.city).pipe(
          map((cities) => {
            return AddressActions.getAllCitiesByCountry(action.city.countryId.toString());
          }), catchError((error: any) => of(AddressActions.addCityFailure(error)))
        ))
    ));
  readonly getAllCitiesByCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.getAllCitiesByCountry),
      switchMap((action) =>
        this.addressService.citiesByCountryId(action.countryId).pipe(map((cities) => {
            return AddressActions.getAllCitiesByCountrySuccess(action.countryId, cities);
          }), catchError((error: any) => of(AddressActions.getAllCitiesByCountryFailure(error)))
        ))
    ));
}
