import { Injectable } from '@angular/core';
import { Numbers } from 'web3';
import { Web3ModalService } from '@services/web3modal.service';
import { environment } from '@env/environment';
import { Web3Service } from './web3.service';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private subscriptionContract!: any;

  constructor(
    private web3ModalService: Web3ModalService,
    private web3Service: Web3Service
  ) {}

  initSubscriptionContract(address: string) {
    this.subscriptionContract = this.web3Service.getMethods(
      environment.ABI_SUBSCRIPTION,
      address
    );
  }

  async getPrice(): Promise<Numbers> {
    return this.subscriptionContract.price().call();
  }

  async getListToken() {
    return this.subscriptionContract.listToken().call();
  }

  async doSubscription() {
    const value = await this.getPrice();
    const tx = {
      from: this.web3ModalService.getAddress(),
      gas: 3000000,
      value,
    };
    return this.subscriptionContract.subscribe().send(tx);
  }

  async getEtherSubscriptionPrice() {
    const price = await this.getPrice();
    return this.web3Service.getEtherConversion(price);
  }
}
