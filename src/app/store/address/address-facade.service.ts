import {Injectable} from "@angular/core";
import {Observable, take, tap} from "rxjs";
import {Country} from "@models/country.model";
import {AddressState} from "./address.reducer";
import {select, Store} from "@ngrx/store";
import {selectAddressState} from "./address.selectors";
import {map} from "rxjs/operators";
import {addCity, getAllCountries} from "./address.actions";
import {City} from "@models/city.model";

@Injectable({
  providedIn: 'root'
})
export class AddressFacadeService {

  constructor(private store: Store<AddressState>) {
  }

  public getAllCountries$(): Observable<Country[]> {
    return this.store.pipe(
      select(selectAddressState),
      tap((state: AddressState) => this.dispatchGetCountriesIfNotLoaded(state)),
      map((state: AddressState) => {
        const countriesAsState = state?.countries;
        const countries = Array.from(countriesAsState?.values()).map(countriesAsState => countriesAsState.country);
        return countries as Country[];
      })
    );
  }
  public addCity(city: City): void {
    this.store.pipe(
      select(selectAddressState),
      take(1),
      tap((state: AddressState) => this.dispatchGetCountriesIfNotLoaded(state)),
      map((state: AddressState) => this.store.dispatch(addCity(city))
    )).subscribe();
  }
  public getCitiesByCountryId$(id: string): Observable<City[]> {
    return this.store.pipe(
      select(selectAddressState),
      tap((state: AddressState) => this.dispatchGetCountriesIfNotLoaded(state)),
      map((state: AddressState) => {
        const citiesAsState = state?.countries.get(id.toString())?.country?.cities
        return citiesAsState ?? [];
      })
    );
  }
  private dispatchGetCountriesIfNotLoaded(state: AddressState): void {
    if (this.isFetchCountryNeeded(state)) {
      this.store.dispatch(getAllCountries());
    }
  }

  private isFetchCountryNeeded(state: AddressState): boolean {
    return !state?.isLoading && !state?.hasLoaded;
  }

}
