import {Person} from "@models/person.model";
import {createReducer, on} from "@ngrx/store";
import {
  createPerson,
  createPersonFailure,
  createPersonSuccess, deletePerson, deletePersonFailure, deletePersonSuccess,
  getPersons,
  getPersonsFailure,
  getPersonsSuccess, updatePerson, updatePersonFailure, updatePersonSuccess
} from "./persons.actions";

export interface PersonsState {
  persons: Map<string, Person>;
  isLoading: boolean;
  hasLoaded: boolean;
  error: any;
}

export const initialPersonsState: PersonsState = {
  persons: new Map<string, Person>(),
  isLoading: false,
  hasLoaded: false,
  error: null
}
const initBirthDate = (person: Person): string | null => {
  return person?.birthdate && person?.birthdate !== 'NA' ? person.birthdate : null;
}
export const reducer = createReducer(
  initialPersonsState,
  on(getPersons, (state) => ({...state, isLoading: true})),
  on(getPersonsSuccess, (state, {persons}) => ({
    ...state,
    persons: new Map(persons.map(person => [person.id.toString(), {
      ...person,
      addressCount: person.addresses.length,
      birthdate: initBirthDate(person)
    }])),
    isLoading: false,
    hasLoaded: true
  })),
  on(getPersonsFailure, (state, {error}) => ({...state, error, isLoading: false, hasLoaded: true})),
  on(createPerson, (state) => ({...state, isLoading: true})),
  on(createPersonSuccess, (state, {person}) => ({
    ...state,
    persons: new Map([...state.persons, [person.id, person]]),
    isLoading: false,
    hasLoaded: true
  })),
  on(createPersonFailure, (state, {error}) => ({...state, error, isLoading: false, hasLoaded: true})),
  on(updatePerson, (state) => ({...state, isLoading: true})),
  on(updatePersonSuccess, (state, {person}) => ({
    ...state,
    persons: new Map([...state.persons, [person.id.toString(), person]])
  })),
  on(updatePersonFailure, (state, {error}) => ({...state, error, isLoading: false, hasLoaded: true})),
  on(deletePerson, (state) => ({...state, isLoading: true})),
  on(deletePersonSuccess, (state, {id}) => {
    state.persons.delete(id);
    return {
      ...state
    }
  }),
  on(deletePersonFailure, (state, {error}) => ({...state, error, isLoading: false, hasLoaded: true}))
)
