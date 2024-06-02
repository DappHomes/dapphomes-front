import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PinataService } from '@services/pinata.service';
import { SubscriptionService } from '@services/subscription.service';
import { ERRORS } from '@utils/messages';
import { Address } from 'web3';
import { MESSAGES } from '../../utils/messages';
import { Web3Service } from '../../core/services/web3.service';
import { FactoryService } from '@services/factory.service';

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
  rawData = null;

  readonly DASHBOARD_MSG = MESSAGES.DASHBOARD;

  constructor(
    private web3Service: Web3Service,
    private pinataService: PinataService,
    private subscriptionService: SubscriptionService,
    private factoryService: FactoryService,
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

  addressChange(address: Address) {
    this.selectedAddress = address;
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
        this.isConnectingDisplayed = false;
        this.rawData = JSON.parse(response);
      })
      .catch((error) => {
        console.error(error);
        if (error.message.includes(ERRORS.DECRYPTION_FAILED)) {
          this.router.navigate(['/not-subscribed']);
        }
      });
  }
}
