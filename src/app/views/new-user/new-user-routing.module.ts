import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {NewUserComponent} from "./new-user.component";
@NgModule({
    imports: [
      RouterModule.forChild([
        { path: '', component: NewUserComponent }
      ])],
    exports: [RouterModule]
})
export class NewUserRoutingModule {
}
