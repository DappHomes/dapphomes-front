import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { CHART_COLORS, transparentize } from '../utils/utils';
import { format } from '@formkit/tempo';

@Component({
  selector: 'time-scale-type',
  templateUrl: './time-scale.component.html',
  styleUrls: ['./time-scale.component.scss'],
})
export class TimeScaleComponent implements OnInit {
  @Input() sensorsData!: any[];

  chart!: Chart;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createChart();
  }

  private createChart() {
    const datasets: any[] = [];
    const colorKeys = Object.keys(CHART_COLORS);

    this.sensorsData.slice(0, 7).forEach((data, index) => {
      const {
        timestamp,
        readings: {
          temperature: { value: temp },
          humidity: { value: humidity },
        },
      } = data || {};

      datasets.push({
        label: format(new Date(timestamp * 1000), 'MMMM D, YYYY h:mm a', 'es'),
        backgroundColor: transparentize(colorKeys[index], 0.5),
        borderColor: colorKeys[index],
        fill: false,
        data: [temp, humidity],
      });
    });

    const data = {
      labels: ['Temp', 'Humidity'],
      datasets,
    };

    const options = {
      plugins: {
        title: {
          text: this.sensorsData[0].location,
          display: true,
        },
      },
      scales: {
        y: {
          suggestedMin: 25,
          suggestedMax: 50,
          title: {
            display: true,
            text: 'Values',
          },
        },
      },
    } as ChartOptions;

    this.chart = new Chart('chart', {
      type: 'line' as ChartType,
      data,
      options,
    });
  }
}
