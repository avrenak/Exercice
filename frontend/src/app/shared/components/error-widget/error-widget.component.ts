import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-widget',
  templateUrl: './error-widget.component.html',
  styleUrls: ['./error-widget.component.scss']
})
export class ErrorWidgetComponent {

  @Input() error: HttpErrorResponse;

}
