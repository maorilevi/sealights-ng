import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {AddressEffects} from "./store/address/address.effects";
import * as fromApp from "./store/app.reducer";
import {PersonsEffects} from "./store/persons/persons.effects";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducers),
    EffectsModule.forRoot([AddressEffects, PersonsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
