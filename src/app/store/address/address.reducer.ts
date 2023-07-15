import {Country} from "@models/country.model";
import {createReducer, on} from "@ngrx/store";
import * as AddressActions from './address.actions';

export interface CountryState {
  country: Country;
  isLoading: boolean;
  hasLoaded: boolean;
  error: any;
}

export interface AddressState {
  countries: Map<string, CountryState>;
  isLoading: boolean;
  hasLoaded: boolean;
  error: any;
}

export const initialAddressState: AddressState = {
  countries: new Map<string, CountryState>(),
  isLoading: false,
  hasLoaded: false,
  error: null
}
export const reducer = createReducer(
  initialAddressState,
  on(AddressActions.getAllCountries, (state, action) => {
    return {
      ...state,
      isLoading: true,
      hasLoaded: false,
      error: null
    }
  }),
  on(AddressActions.getAllCountriesSuccess, (state, action) => {
    action.countries.forEach((country: Country) => {
      state.countries.set(country.id.toString(), {
        country,
        isLoading: false,
        hasLoaded: false,
        error: null
      });
    })
    return {
      ...state,
      isLoading: false,
      hasLoaded: true,
      error: null
    }
  }),
  on(AddressActions.getAllCountriesFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      hasLoaded: false,
      error: action.error
    }
  }),
  on(AddressActions.getAllCitiesByCountry, (state, action) => {
    const countryState = state.countries.get(action.countryId);
    if (countryState) {
      countryState.isLoading = true;
      countryState.hasLoaded = false;
      countryState.error = null;
    }
    return {
      ...state,
      isLoading: true,
      hasLoaded: false,
      error: null
    }
  }),
  on(AddressActions.getAllCitiesByCountrySuccess, (state, action) => {
    if (state.countries.has(action.countryId)) {
      const countryState = state.countries.get(action.countryId);
      if (!!countryState?.country && !!countryState?.country?.cities) {
        state.countries.set(action.countryId, {
          ...countryState, country: {
            ...countryState.country,
            cities: action.cities
          }
        });
      }
    }
    return {
      ...state
    }
  })
);

