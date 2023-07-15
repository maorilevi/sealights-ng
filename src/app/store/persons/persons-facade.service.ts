import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {PersonsState} from "./persons.reducer";
import {distinctUntilChanged, Observable, take, tap} from "rxjs";
import {Person} from "@models/person.model";
import {selectPersonsState} from "./persons.selectors";
import {map} from "rxjs/operators";
import {createPerson, deletePerson, getPersons, updatePerson} from "./persons.actions";

@Injectable({providedIn: "root"})
export class PersonsFacadeService {
  constructor(private store: Store<PersonsState>) {
  }

  public getAllPersons$(): Observable<Person[]> {
    return this.store.pipe(
      select(selectPersonsState),
      tap((state: PersonsState) => this.dispatchGetPersonsIfNotLoaded(state)),
      distinctUntilChanged(),
      map((state: PersonsState) => {
        return Array.from(state?.persons?.values() ?? []);
      })
    )
  }

  public createPerson(person: Person): void {
    this.store.pipe(
      select(selectPersonsState),
      take(1),
      map((state: PersonsState) => {
        this.store.dispatch(createPerson(person))
      })
    ).subscribe()
  }
  public getPersonById$(currentPersonId: string): Observable<Person> {
    return this.store.pipe(
      select(selectPersonsState),
      tap((state: PersonsState) => this.dispatchGetPersonsIfNotLoaded(state)),
      map((state: PersonsState) => {
        return state.persons.get(currentPersonId) as Person;
      }));
  }

  public updatePerson(user: any): void {
    this.store.pipe(
      select(selectPersonsState),
      take(1),
      map((state: PersonsState) => {
        this.store.dispatch(updatePerson(user))
      })
    ).subscribe()
  }
  public deletePerson(id: string): void {
    this.store.pipe(
      select(selectPersonsState),
      take(1),
      map((state: PersonsState) => {
        this.store.dispatch(deletePerson(id))
      })
    ).subscribe()
  }
  private dispatchGetPersonsIfNotLoaded(state: PersonsState): void {
    if (this.isFetchPersonsNeeded(state)) {
      this.store.dispatch(getPersons());
    }
  }

  private isFetchPersonsNeeded(state: PersonsState): boolean {
    return !state?.isLoading && !state?.hasLoaded;
  }


}
