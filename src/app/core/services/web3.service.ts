import { Injectable } from '@angular/core';
import Web3, { Address, Numbers } from 'web3';
import { Web3ModalService } from '@services/web3modal.service';
import { environment } from '@env/environment';
import { isAddress as isValidAddress } from 'web3-validator';

@Injectable({ providedIn: 'root' })
export class Web3Service {
  private web3!: Web3;
  private subscriptionContract!: any;
  private marketplaceContract!: any;

  constructor(private web3ModalService: Web3ModalService) {
    this.initWeb3(web3ModalService);
    this.initMarketplaceContract();
  }

  initSubscriptionContract(address: string) {
    this.subscriptionContract = new this.web3.eth.Contract(
      environment.ABI_SUBSCRIPTION,
      address
    ).methods;
  }

  initMarketplaceContract() {
    this.marketplaceContract = new this.web3.eth.Contract(
      environment.ABI_MARKETPLACE,
      environment.MARKETPLACE_AMOY_ADDRESS
    ).methods;
  }

  isAddress(address: string): boolean {
    return isValidAddress(address);
  }

  getEtherConversion(value: Numbers) {
    return this.web3.utils.fromWei(value, 'ether');
  }

  async getPrice(): Promise<Numbers> {
    return this.subscriptionContract.price().call();
  }

  async getListToken() {
    return this.subscriptionContract.listToken().call();
  }

  async getMarketplaces(): Promise<Address[]> {
    return this.marketplaceContract.getMarketplaces().call();
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
    return this.getEtherConversion(price);
  }

  private initWeb3(web3ModalService: Web3ModalService) {
    const provider = web3ModalService.getWalletProvider();
    this.web3 = new Web3(provider);
  }
}
