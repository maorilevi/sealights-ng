import {createFeatureSelector} from "@ngrx/store";
import {AddressState} from "./address.reducer";

export const featureName = 'address';
export const selectAddressState = createFeatureSelector<AddressState>(featureName);
