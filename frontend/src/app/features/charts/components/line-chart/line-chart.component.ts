import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartsConfig } from '../../../../config/charts.config';
import { Site } from '../../../../interfaces/charts.interface';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnDestroy {

  @Input() chartData: Site;

  @Input() config: ChartsConfig;

  options: any;
  updateOptions: any;

  private timer: any;

  constructor() { }

  ngOnInit(): void {

    // initialize chart options:
    this.options = {
      title: {
        text: this.config.title
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          const date = new Date(params.value[0]);
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + '<br>' + (params.value[1]/1000000).toFixed(2) + ' Mo';
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        name: 'Traffic (Mo)',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: function (value: number) {
            return value/1000000 + ' Mo';
        }
        }
      },
      series: []
    };

    // Update dynamic data:
    this.timer = setInterval(() => {
      this.updateData();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  updateData() {
    this.updateOptions = {
      series: [{
        name: 'Mocking Data',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: this.calibrateData(this.chartData.trafficOut),
        color: this.config.color
      }]
    };
  }

  calibrateData(traffic: [number, number][]) {
    const lastTimeStamp =  traffic[traffic.length-1][0];
    const newTraffic = traffic.slice(traffic.findIndex(e => e[0] === lastTimeStamp - this.config.interval));
    return newTraffic.map(element => {
      const date = element[0]*1000;
      const octet = element[1];
      return [date, octet];
    }
    )
  }
}
