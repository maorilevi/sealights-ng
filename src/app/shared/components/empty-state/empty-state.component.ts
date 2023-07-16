import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLinkWithHref} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  imports: [CommonModule, RouterLinkWithHref],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() action: { title: string; link: string } | undefined;

}
