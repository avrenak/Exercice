import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-error-widget',
  templateUrl: './error-widget.component.html',
  styleUrls: ['./error-widget.component.scss']
})
export class ErrorWidgetComponent {

  @Input() error: HttpErrorResponse;

}
