import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Web3Service } from './web3.service';
import { Uint256 } from 'web3';

@Injectable({ providedIn: 'root' })
export class FactoryService {
  private factoryContract!: any;

  constructor(private web3Service: Web3Service) {}

  initSubscriptionContract() {
    this.factoryContract = this.web3Service.getMethods(
      environment.ABI_FACTORY,
      environment.FACTORY_ADDRESS
    );
  }

  async createMarketplace(
    price: Uint256,
    duration: Uint256,
    token: string
  ): Promise<any> {
    return this.factoryContract
      .createMarketplace(price, duration, token)
      .call();
  }
}
