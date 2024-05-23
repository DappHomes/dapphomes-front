import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PinataService } from '@services/pinata.service';
import { Web3Service } from '@services/web3.service';
import { ERRORS } from '@utils/messages';
import { Address } from 'web3';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  isDashboardVisible = false;
  marketplaceAddresses: Address[] = [];
  selectedAddress!: Address;
  isValidAddress = false;
  listToken: string = '';
  rawData: string = '';

  constructor(
    private pinataService: PinataService,
    private web3Service: Web3Service,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isDashboardVisible = true;
    this.web3Service.getMarketplaces().then((addresses) => {
      this.marketplaceAddresses.push(...addresses);
    });
  }

  submitAddress() {
    this.isValidAddress = this.web3Service.checkAddress(this.selectedAddress);
    if (this.isValidAddress) {
      this.web3Service.initSubscriptionContract(this.selectedAddress);

      // 2. get pinata token
      this.web3Service.getListToken().then((value: string) => {
        this.listToken = value;

        // 3. try to decrypt data
        this.pinataService
          .getData(this.listToken)
          .then((response) => {
            this.isDashboardVisible = true;
            this.rawData = JSON.parse(response);
          })
          .catch((error) => {
            if (error.message.includes(ERRORS.DECRYPTION_FAILED)) {
              this.router.navigate(['/not-subscribed']);
            }
          });
      });
    }
  }

  addressChange(address: Address) {
    this.selectedAddress = address;
  }
}
