import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { CHARTS_INTERVALS } from '../../../config/charts.config';

@Component({
  selector: 'app-selector-widget',
  templateUrl: './selector-widget.component.html',
  styleUrls: ['./selector-widget.component.scss']
})
export class SelectorWidgetComponent implements OnInit {

  @Input() defaultInterval: number;

  @Output() intervalChange = new EventEmitter<number>();

  chartsIntervals = CHARTS_INTERVALS;

  // Form declaration
  selectInterval = new FormControl();
  intervalSelection = new FormGroup({
    select: this.selectInterval
  });

  ngOnInit() {
    this.selectInterval.setValue(this.defaultInterval);
  }

  onSelectionChange(event: MatSelectChange) {
    this.intervalChange.emit(event.value);
  }

}
