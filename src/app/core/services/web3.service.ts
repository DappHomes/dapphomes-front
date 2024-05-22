import { Injectable } from '@angular/core';
import Web3, { Address, Numbers } from 'web3';
import { validator } from 'web3-validator';
import { Web3ModalService } from '@services/web3modal.service';
import { environment } from '@env/environment';

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
      address,
    );
  }

  initMarketplaceContract() {
    this.marketplaceContract = new this.web3.eth.Contract(
      environment.ABI_MARKETPLACE,
      '0xd659cbC22d4e22f0ed2234F7E87920EC06891DeC', // Move this
    );
  }

  checkAddress(address: string): boolean {
    try {
      validator.validate(['address'], [address]);
      return true;
    } catch (err) {
      return false;
    }
  }

  getEtherConversion(value: Numbers) {
    return this.web3.utils.fromWei(value, 'ether');
  }

  async getPrice(): Promise<Numbers> {
    return this.subscriptionContract.methods.price().call();
  }

  async listToken(): Promise<string> {
    return this.subscriptionContract.methods.listToken().call();
  }

  async getListToken() {
    // Check if it's the same as listToken.
    const token = await this.subscriptionContract.methods.listToken().call();
    return token;
  }

  async getMarketplaces(): Promise<Address[]> {
    return this.marketplaceContract.methods.getMarketplaces().call();
  }

  async doSubscription() {
    const value = await this.getPrice();
    const tx = {
      from: this.web3ModalService.getAddress(),
      gas: 3000000,
      value,
    };
    return this.subscriptionContract.methods.subscribe().send(tx);
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
