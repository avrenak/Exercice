import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { Site } from '../../../interfaces/charts.interface';
import { ApiActions } from '../../../store/actions';
import { ApiSelectors } from '../../../store/selectors';
import { SITES_AVAILABLES, CHARTS_CONFIG, CHARTS_INTERVALS, ChartsConfig } from '../../../config/charts.config';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnDestroy {

  private timer: any;

  chartsIntervals = CHARTS_INTERVALS;
  chartsConf = CHARTS_CONFIG;
  availableSites = SITES_AVAILABLES;

  maxInterval = this.selectMaxInterval(this.chartsConf);
  actualSite: Site;

  $data = this.store.select(ApiSelectors.selectCurrentSite);

  // Form declaration
  selectSite = new FormControl(this.availableSites[0].value);
  siteSelection = new FormGroup({
    select: this.selectSite
  });
  activateButtons = false;
  precedentSelection: string = this.availableSites[0].value;

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {

    this.getTimeStampDispatch();

    // auto updater on interval of 5 seconds
    this.timer = setInterval(() => {
      this.getTimeStampDispatch();
    }, 5000);

  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  getTimeStampDispatch() {
    this.store.dispatch(ApiActions.getTimeStampRequest({site: this.precedentSelection, interval: this.maxInterval}));
  }

  //#region Site selector
  onSelectionChange() {
    this.activateButtons = true;
  }

  cancelSelection() {
    this.selectSite.setValue(this.precedentSelection);
    this.activateButtons = false;
  }

  updateSelection() {
    this.precedentSelection = this.siteSelection.get('select').value;
    this.activateButtons = false;
    this.getTimeStampDispatch();
  }
  //#endregion

  //#region drag n drop of charts
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chartsConf, event.previousIndex, event.currentIndex);
  }
  //#endregion

  //#region additional calculations on provided data
  getAverageTraffic(data: [number, number][]) {
    return (data.map(e => e[1]).reduce((a, b) => a+b) / (data.length-1) / 1000000).toFixed(2) + ' Mo';
  }

  getMaxTraffic(data: [number, number][]) {
    return (Math.max(...data.map(e => e[1])) / 1000000).toFixed(2) + ' Mo';
  }
  //#endregion

  //#region data interval handling (Bonus)
  selectMaxInterval (chartsConf: ChartsConfig[]) {
    return Math.max(...chartsConf.map(e => e.interval));
  }

  changeChartIntervalConfig(event: number, id: number) {
    this.chartsConf = [...this.chartsConf.map(e => {
      if (e.id === id) {
        e.interval = event;
      }
      return e;
    })];
    this.maxInterval = this.selectMaxInterval(this.chartsConf);
    this.getTimeStampDispatch();
  }
  //#endregion

}
