import { Injectable } from '@angular/core';
import { Address } from 'web3';
import { environment } from '@env/environment';
import { Web3Service } from './web3.service';

@Injectable({ providedIn: 'root' })
export class MarketplaceService {
  private marketplaceContract!: any;

  constructor(private web3Service: Web3Service) {
    this.initMarketplaceContract();
  }

  initMarketplaceContract() {
    this.marketplaceContract = this.web3Service.getMethods(
      environment.ABI_MARKETPLACE,
      environment.MARKETPLACE_ADDRESS
    );
  }

  async getMarketplaces(): Promise<Address[]> {
    return this.marketplaceContract.getMarketplaces().call();
  }
}
