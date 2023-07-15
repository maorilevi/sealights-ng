import * as address from './address/address.reducer';
import * as persons from './persons/persons.reducer';
import {ActionReducerMap} from "@ngrx/store";
export interface AppReducer {
  address: address.AddressState;
  persons: persons.PersonsState;
}
export const appReducers: ActionReducerMap<AppReducer> = {
  address: address.reducer,
  persons: persons.reducer
}
