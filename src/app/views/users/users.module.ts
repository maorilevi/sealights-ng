import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {MatTableModule} from '@angular/material/table';
import {UsersRoutingModule} from "./users-routing.module";
import {EmptyStateComponent} from "@components/empty-state/empty-state.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    EmptyStateComponent,
    MatTableModule,
    UsersRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class UsersModule {
}
