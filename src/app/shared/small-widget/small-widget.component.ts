import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-widget',
  templateUrl: './small-widget.component.html',
  styleUrls: ['./small-widget.component.scss']
})
export class SmallWidgetComponent {
  @Input() title!: string;
  @Input() iconName!: string;
  @Input() subtitle!: string;
}
