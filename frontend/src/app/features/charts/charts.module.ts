import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './container/charts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ChartsComponent,
    LineChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ]
})
export class ChartsModule {}
