import {createFeatureSelector} from "@ngrx/store";
import {PersonsState} from "./persons.reducer";

export const featureName = 'persons';
export const selectPersonsState = createFeatureSelector<PersonsState>(featureName);
