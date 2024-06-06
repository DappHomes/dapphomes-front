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
    const datasetsTemp: any[] = [];
    const datasetsHumidity: any[] = [];

    console.log(this.sensorsData);

    datasetsTemp.push({
      label: 'Temperature',
      backgroundColor: transparentize(CHART_COLORS.red, 0.5),
      borderColor: CHART_COLORS.red,
      fill: false,
      data: this.sensorsData.map(
        ({
          readings: {
            temperature: { value },
          },
        }) => value
      ),
    });

    datasetsHumidity.push({
      label: 'Humidity',
      backgroundColor: transparentize(CHART_COLORS.blue, 0.5),
      borderColor: CHART_COLORS.blue,
      fill: false,
      data: this.sensorsData.map(
        ({
          readings: {
            humidity: { value },
          },
        }) => value
      ),
    });

    const data = {
      labels: this.sensorsData.map((data) =>
        format(new Date(data.timestamp * 1000), 'MMMM D, YYYY h:mm a', 'es')
      ),
      datasets: [...datasetsTemp, ...datasetsHumidity],
    };

    const options = {
      plugins: {
        title: {
          text: this.sensorsData[0].location,
          display: true,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
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
