import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';

@Component({
  selector: 'line-chart-type',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @Input() sensorsData: any;

  chart!: Chart;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createChart();
  }

  private createChart() {
    const {
      main: { temp, feels_like, temp_min, temp_max, humidity },
      wind: { speed },
      name,
    } = this.sensorsData || {};

    const data = {
      labels: [
        'Temp',
        'Feels like',
        'Temp min',
        'Temp max',
        'Humidity',
        'Wind Speed',
      ],
      datasets: [
        {
          label: `Place ${name}`,
          data: [temp, feels_like, temp_min, temp_max, humidity, speed],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          suggestedMin: 0,
          suggestedMax: 60,
        },
        y: {
          suggestedMin: 0,
          suggestedMax: 60,
        },
      },
    };

    this.chart = new Chart('chart', {
      type: 'line' as ChartType,
      data,
      options,
    });
  }
}
