import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PinataService } from '@services/pinata.service';
import { SubscriptionService } from '@services/subscription.service';
import { ERRORS } from '@utils/messages';
import { MESSAGES } from '../../utils/messages';
import { Web3Service } from '../../core/services/web3.service';
import { FactoryService } from '@services/factory.service';
import { RawDataComponent } from '@components/raw-data/raw-data.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isDashboardVisible = false;
  marketplaceAddresses: string[] = [];
  selectedAddress!: string;
  isConnectingDisplayed = false;
  isAddress = false;
  sensorsData: any[] = [];

  readonly DASHBOARD_MSG = MESSAGES.DASHBOARD;

  constructor(
    private subscriptionService: SubscriptionService,
    private factoryService: FactoryService,
    private pinataService: PinataService,
    private web3Service: Web3Service,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isDashboardVisible = true;
    this.setMarketplaces();
  }

  submitAddress() {
    this.isAddress = this.web3Service.isAddress(this.selectedAddress);
    if (this.isAddress) {
      this.isConnectingDisplayed = true;
      this.subscriptionService.initSubscriptionContract(this.selectedAddress);
      this.setSensorsData();
    }
  }

  addressChange(address: string) {
    this.selectedAddress = address;
  }

  openRawDataModal() {
    this.dialog.open(RawDataComponent, {
      width: '1200px',
      height: '1200px',
      data: { rawData: [], selectedAddress: this.selectedAddress },
    });
  }

  private async decryptMessage() {
    const tokenList = await this.subscriptionService.getListToken();
    return this.pinataService.decryptMessage(tokenList);
  }

  private setMarketplaces() {
    this.factoryService.initFactoryContract();
    this.factoryService.getMarketplaces().then((addresses) => {
      this.marketplaceAddresses.push(...addresses);
    });
  }

  private setSensorsData() {
    this.decryptMessage()
      .then((response) => {
        const sensorsData: any[] = [];
        response.forEach((response) => {
          sensorsData.push(JSON.parse(response));
        });
        this.isConnectingDisplayed = false;
        this.sensorsData = sensorsData;
      })
      .catch((error) => {
        console.error(error);
        if (error.message.includes(ERRORS.DECRYPTION_FAILED)) {
          this.router.navigate(['/not-subscribed']);
        }
      });
  }
}
