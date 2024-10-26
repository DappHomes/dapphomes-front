import { Component, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, ChartOptions, registerables } from 'chart.js';
import { CHART_COLORS, namedColor, transparentize } from '../utils/utils';
import 'chartjs-adapter-luxon';

interface SensorData {
  sensor_id: string;
  location: string;
  data: { timestamp: number; temp: number; pressure: number; humidity: number }[];
}

@Component({
  selector: 'time-scale-type',
  templateUrl: './time-scale.component.html',
  styleUrls: ['./time-scale.component.scss'],
})
export class TimeScaleComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() sensorsData!: any[];
  sensorsDataGroupedById: SensorData[] = [];

  tempChart!: Chart<'line', { x: Date; y: number }[], unknown>;
  pressureChart!: Chart<'line', { x: Date; y: number }[], unknown>;
  humidityChart!: Chart<'line', { x: Date; y: number }[], unknown>;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.groupSensorsDataById();
  }

  ngAfterViewInit(): void {
    this.createCharts();
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }

  private groupSensorsDataById(): void {
    const sensorDataMap: { [key: string]: SensorData } = {};

    this.sensorsData.forEach((data) => {
      const {
        timestamp,
        location,
        sensor_id,
        readings: {
          temperature: { value: temp },
          pressure: { value: pressure },
          humidity: { value: humidity },
        },
      } = data || {};

      if (!sensorDataMap[sensor_id]) {
        sensorDataMap[sensor_id] = {
          sensor_id,
          location,
          data: [],
        };
      }

      sensorDataMap[sensor_id].data.push({ timestamp, temp, pressure, humidity });
    });

    this.sensorsDataGroupedById = Object.values(sensorDataMap);
  }

  private createCharts() {
    this.destroyCharts();

    const tempDatasets = this.sensorsDataGroupedById.map((sensorData, index) => ({
      label: sensorData.location,
      backgroundColor: transparentize(namedColor(index), 0.5),
      borderColor: namedColor(index),
      fill: false,
      data: sensorData.data.map(d => ({ x: new Date(d.timestamp * 1000), y: d.temp })),
    }));

    const pressureDatasets = this.sensorsDataGroupedById.map((sensorData, index) => ({
      label: sensorData.location,
      backgroundColor: transparentize(namedColor(index), 0.5),
      borderColor: namedColor(index),
      fill: false,
      data: sensorData.data.map(d => ({ x: new Date(d.timestamp * 1000), y: d.pressure })),
    }));

    const humidityDatasets = this.sensorsDataGroupedById.map((sensorData, index) => ({
      label: sensorData.location,
      backgroundColor: transparentize(namedColor(index), 0.5),
      borderColor: namedColor(index),
      fill: false,
      data: sensorData.data.map(d => ({ x: new Date(d.timestamp * 1000), y: d.humidity })),
    }));

    const commonOptions: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          color: '#ffffff',
        },
        legend: {
          labels: {
            color: '#ffffff',
          }
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'minute',
          },
          ticks: {
            autoSkip: true,
            stepSize: 5,
            maxRotation: 0,
            minRotation: 0,
            color: '#ffffff',
            callback: (value: string | number) => {
              const date = new Date(value);
              return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
            },
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },
        y: {
          title: {
            display: true,
            color: '#ffffff',
          },
          ticks: {
            color: '#ffffff',
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },
      },
    };

    const xScaleOptions = {
      ...commonOptions.scales?.x,
      min: Math.min(...this.sensorsDataGroupedById.flatMap(sensorData => sensorData.data.map(d => d.timestamp * 1000))),
      max: Math.max(...this.sensorsDataGroupedById.flatMap(sensorData => sensorData.data.map(d => d.timestamp * 1000))),
    };

    this.tempChart = new Chart('tempChart', {
      type: 'line',
      data: { datasets: tempDatasets },
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            ...(commonOptions.plugins?.title),
            text: 'Temperature over Time',
          },
        },
        scales: {
          ...commonOptions.scales,
          x: xScaleOptions,
          y: {
            ...commonOptions.scales?.y,
            title: {
              ...(commonOptions.scales?.y?.title),
              text: 'Temperature (C)',
            },
          },
        },
      },
    });

    this.pressureChart = new Chart('pressureChart', {
      type: 'line',
      data: { datasets: pressureDatasets },
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            ...(commonOptions.plugins?.title),
            text: 'Pressure over Time',
          },
        },
        scales: {
          ...commonOptions.scales,
          x: xScaleOptions,
          y: {
            ...commonOptions.scales?.y,
            title: {
              ...(commonOptions.scales?.y?.title),
              text: 'Pressure (hPa)',
            },
          },
        },
      },
    });

    this.humidityChart = new Chart('humidityChart', {
      type: 'line',
      data: { datasets: humidityDatasets },
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            ...(commonOptions.plugins?.title),
            text: 'Humidity over Time',
          },
        },
        scales: {
          ...commonOptions.scales,
          x: xScaleOptions,
          y: {
            ...commonOptions.scales?.y,
            title: {
              ...(commonOptions.scales?.y?.title),
              text: 'Humidity (%)',
            },
          },
        },
      },
    });
  }

  private destroyCharts() {
    if (this.tempChart) {
      this.tempChart.destroy();
    }
    if (this.pressureChart) {
      this.pressureChart.destroy();
    }
    if (this.humidityChart) {
      this.humidityChart.destroy();
    }
  }
}
