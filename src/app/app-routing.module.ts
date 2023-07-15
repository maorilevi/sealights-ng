import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/users',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./views/views.module').then(m => m.ViewsModule)
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
