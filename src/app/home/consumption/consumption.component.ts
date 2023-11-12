import { Component, OnInit } from '@angular/core';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit{

  options!: EChartsOption 

  ngOnInit() {
    const xAxisData = ['Jan', 'Feb', 'Mar', 'April', 'May', 'July'];
    const data1 = [404, 234, 253,340,403,352];

    this.options = {
      legend: {
        data: ['Joe' ],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'kw/h',
          type: 'bar',
          data: data1,
          animationDelay: idx => idx * 10,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5,
    };
  }

}
