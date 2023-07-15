import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ViewsComponent} from "./views.component";

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
      }
    ]
  }];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ViewsRoutingModule {
}
