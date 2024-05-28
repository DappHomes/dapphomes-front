import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Web3Service } from './web3.service';

@Injectable({ providedIn: 'root' })
export class FactoryService {
  private factoryContract!: any;

  constructor(private web3Service: Web3Service) {}

  initFactoryContract() {
    this.factoryContract = this.web3Service.getMethods(
      environment.ABI_FACTORY,
      environment.FACTORY_ADDRESS
    );
  }

  async createMarketplace(
    price: string,
    duration: string,
    token: string
  ): Promise<any> {
    return this.factoryContract.createMarketplace(price, duration, token)
      .send({
        from: await this.web3Service.getSigner()
      });
  }
}
