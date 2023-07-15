import {RouterModule} from "@angular/router";
import {UsersComponent} from "./users.component";
import {NgModule} from "@angular/core";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
      }, {
        path: 'new',
        loadChildren: () => import('../new-user/new-user.module').then(m => m.NewUserModule),
        resolve: {
          isEditMode: () => false
        }
      }, {
        path: ':id',
        loadChildren: () => import('../new-user/new-user.module').then(m => m.NewUserModule),
        resolve: {
          isEditMode: () => true
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
