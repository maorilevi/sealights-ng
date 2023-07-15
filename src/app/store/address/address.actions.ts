import {createAction} from "@ngrx/store";
import {Country} from "@models/country.model";
import {City} from "@models/city.model";

export const GET_ALL_COUNTRIES = '[COUNTRIES] GET_ALL_COUNTRIES';
export const GET_ALL_COUNTRIES_SUCCESS = '[COUNTRIES] GET_ALL_COUNTRIES_SUCCESS';
export const GET_ALL_COUNTRIES_FAILURE = '[COUNTRIES] GET_ALL_COUNTRIES_FAILURE';

export const GET_ALL_CITIES_BY_COUNTRY = '[CITIES] GET_ALL_CITIES_BY_COUNTRY';
export const GET_ALL_CITIES_BY_COUNTRY_SUCCESS = '[CITIES] GET_ALL_CITIES_BY_COUNTRY_SUCCESS';
export const GET_ALL_CITIES_BY_COUNTRY_FAILURE = '[CITIES] GET_ALL_CITIES_BY_COUNTRY_FAILURE';

export const ADD_CITY = '[CITIES] ADD_CITY';
export const ADD_CITY_SUCCESS = '[CITIES] ADD_CITY_SUCCESS';
export const ADD_CITY_FAILURE = '[CITIES] ADD_CITY_FAILURE';


export const getAllCountries = createAction(GET_ALL_COUNTRIES);
export const getAllCountriesSuccess = createAction(GET_ALL_COUNTRIES_SUCCESS, (countries: Country[]) => ({countries}));
export const getAllCountriesFailure = createAction(GET_ALL_COUNTRIES_FAILURE, (error: any) => ({error}));

export const getAllCitiesByCountry = createAction(GET_ALL_CITIES_BY_COUNTRY, (countryId: string) => ({countryId}));
export const getAllCitiesByCountrySuccess = createAction(GET_ALL_CITIES_BY_COUNTRY_SUCCESS, (countryId: string, cities: City[]) => ({countryId, cities}));
export const getAllCitiesByCountryFailure = createAction(GET_ALL_CITIES_BY_COUNTRY_FAILURE, (error: any) => ({error}));


export const addCity = createAction(ADD_CITY, (city: City) => ({city}));

export const addCityFailure = createAction(ADD_CITY_FAILURE, (error: any) => ({error}));
