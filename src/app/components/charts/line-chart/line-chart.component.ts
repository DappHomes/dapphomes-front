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
      readings: { temperature: {value: temp}, pressure: {value: pressure}, humidity: {value: humidity} },
      location,
    } = this.sensorsData || {};

    const data = {
      labels: [
        'Temp',
        'Pressure',
        'Humidity',
      ],
      datasets: [
        {
          label: `Place ${location}`,
          data: [temp, pressure, humidity],
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
