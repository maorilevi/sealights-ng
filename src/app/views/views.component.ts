import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ALL_USERS_LINK} from "@utils/routs.links";

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewsComponent {

  protected readonly ALL_USERS_LINK = ALL_USERS_LINK;
}
