import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "@models/person.model";
import {environment} from "@env/environment";

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  constructor(private http: HttpClient) { }

  all(): Observable<Person[]> {
    return this.http.get<Person[]>(`${environment.apiUrl}persons`);
  }
  create(person: Person): Observable<Person> {
    return this.http.post<Person>(`${environment.apiUrl}person`, person);
  }
  update(person: Person): Observable<Person> {
    return this.http.put<Person>(`${environment.apiUrl}persons`, person);
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}persons/${id}`);
  }
}
