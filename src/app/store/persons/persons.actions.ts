import {createAction} from "@ngrx/store";
import {Person} from "@models/person.model";

export const GET_PERSONS = '[Persons] Get Persons';
export const GET_PERSONS_SUCCESS = '[Persons] Get Persons Success';
export const GET_PERSONS_FAILURE = '[Persons] Get Persons Failure';

export const CREATE_PERSON = '[Persons] Create Person';
export const CREATE_PERSON_SUCCESS = '[Persons] Create Person Success';
export const CREATE_PERSON_FAILURE = '[Persons] Create Person Failure';

export const UPDATE_PERSON = '[Persons] Update Person';
export const UPDATE_PERSON_SUCCESS = '[Persons] Update Person Success';
export const UPDATE_PERSON_FAILURE = '[Persons] Update Person Failure';

export const DELETE_PERSON = '[Persons] Delete Person';
export const DELETE_PERSON_SUCCESS = '[Persons] Delete Person Success';
export const DELETE_PERSON_FAILURE = '[Persons] Delete Person Failure';


export const getPersons = createAction(GET_PERSONS);
export const getPersonsSuccess = createAction(GET_PERSONS_SUCCESS, (persons: Person[]) => ({persons}));
export const getPersonsFailure = createAction(GET_PERSONS_FAILURE, (error: any) => ({error}));

export const createPerson = createAction(CREATE_PERSON, (person: Person) => ({person}));
export const createPersonSuccess = createAction(CREATE_PERSON_SUCCESS, (person: Person) => ({person}));
export const createPersonFailure = createAction(CREATE_PERSON_FAILURE, (error: any) => ({error}));

export const updatePerson = createAction(UPDATE_PERSON, (person: Person) => ({person}));
export const updatePersonSuccess = createAction(UPDATE_PERSON_SUCCESS, (person: Person) => ({person}));
export const updatePersonFailure = createAction(UPDATE_PERSON_FAILURE, (error: any) => ({error}));

export const deletePerson = createAction(DELETE_PERSON, (id: string) => ({id}));
export const deletePersonSuccess = createAction(DELETE_PERSON_SUCCESS, (id: string) => ({id}));
export const deletePersonFailure = createAction(DELETE_PERSON_FAILURE, (error: any) => ({error}));
