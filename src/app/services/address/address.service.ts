import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {City} from "../../models/city.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Country} from "../../models/country.model";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }
  allCities(): Observable<City[]> {
    return this.http.get<City[]>(`${environment.apiUrl}cities`);
  }
  citiesByCountryId(id: string): Observable<City[]> {
    return this.http.get<City[]>(`${environment.apiUrl}cities/${id}`);
  }
  addCity(city: City): Observable<City> {
    return this.http.post<City>(`${environment.apiUrl}city`, city);
  }
  allCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.apiUrl}countries`);
  }
}
