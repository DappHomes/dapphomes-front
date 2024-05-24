import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PinataService } from '@services/pinata.service';
import { Web3Service } from '@services/web3.service';
import { ERRORS } from '@utils/messages';
import { Address } from 'web3';
import { Chart, ChartType, registerables } from 'chart.js';
import { MESSAGES } from '../../utils/messages';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isDashboardVisible = false;
  marketplaceAddresses: Address[] = [];
  selectedAddress!: Address;
  isConnectingDisplayed = false;
  isAddress = false;
  rawData: any;
  chart!: Chart;

  readonly DASHBOARD_MSG = MESSAGES.DASHBOARD;

  constructor(
    private pinataService: PinataService,
    private web3Service: Web3Service,
    private router: Router
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.isDashboardVisible = true;
    this.web3Service.getMarketplaces().then((addresses) => {
      this.marketplaceAddresses.push(...addresses);
    });
  }

  submitAddress() {
    this.isAddress = this.web3Service.isAddress(this.selectedAddress);
    if (this.isAddress) {
      this.isConnectingDisplayed = true;
      this.web3Service.initSubscriptionContract(this.selectedAddress);

      this.decryptMessage()
        .then((response) => {
          this.isConnectingDisplayed = false;
          this.rawData = JSON.parse(response);
          this.createChart();
        })
        .catch((error) => {
          if (error.message.includes(ERRORS.DECRYPTION_FAILED)) {
            this.router.navigate(['/not-subscribed']);
          }
        });
    }
  }

  addressChange(address: Address) {
    this.selectedAddress = address;
  }

  private async decryptMessage() {
    const tokenList = await this.web3Service.getListToken();
    return this.pinataService.decryptMessage(tokenList);
  }

  private createChart() {
    const {
      main: { temp, feels_like, temp_min, temp_max, humidity },
      wind: { speed },
      name,
    } = this.rawData;
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
