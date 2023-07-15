import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
