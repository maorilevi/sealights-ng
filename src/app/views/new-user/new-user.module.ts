import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewUserComponent} from './new-user.component';
import {NewUserRoutingModule} from "./new-user-routing.module";
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {AddressComponent} from "@components/address/address.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {AddressV2Component} from "@components/address-v2/address-v2.component";


@NgModule({
  declarations: [
    NewUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NewUserRoutingModule,
    MatInputModule,
    AddressComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    AddressV2Component
  ]
})
export class NewUserModule {
}
