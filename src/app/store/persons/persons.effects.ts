import {Injectable} from "@angular/core";
import {PersonsService} from "@services/persons/persons.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as PersonsAction from './persons.actions';
import {of, switchMap} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Person} from "@models/person.model";

@Injectable({providedIn: "root"})
export class PersonsEffects {
  constructor(private actions$: Actions, private readonly personsService: PersonsService) {
  }

  readonly getAllPersons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonsAction.getPersons),
      switchMap((action) =>
        this.personsService.all().pipe(map((persons: Person[]) => {
          return PersonsAction.getPersonsSuccess(persons);
        }), catchError(error => of(PersonsAction.getPersonsFailure(error))))
      )
    )
  )
  readonly addPeron$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonsAction.createPerson),
      switchMap((action) =>
        this.personsService.create(action.person).pipe(map((person: Person) => {
          return PersonsAction.getPersons();
        }), catchError(error => of(PersonsAction.createPersonFailure(error))))
      ))
  );
  readonly updatePerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonsAction.updatePerson),
      switchMap((action) =>
        this.personsService.update(action.person).pipe(map((person) => {
          return PersonsAction.updatePersonSuccess(person);
        }), catchError(error => of(PersonsAction.updatePersonFailure(error))))
      ))
  );
  readonly deletePerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonsAction.deletePerson),
      switchMap((action) =>
        this.personsService.delete(action.id).pipe(map((person) => {
          return PersonsAction.deletePersonSuccess(action.id);
        }), catchError(error => of(PersonsAction.deletePersonFailure(error))))
      ))
  );
}
