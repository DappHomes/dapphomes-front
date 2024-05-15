import { Injectable } from '@angular/core';
import Web3, { Numbers } from 'web3';
import { Web3ModalService } from '@services/web3modal.service';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class Web3Service {
  private web3!: Web3;

  private contract!: any;

  constructor(private web3ModalService: Web3ModalService) {
    this.initWeb3(web3ModalService);
    this.initContract();
  }

  getEtherConversion(value: Numbers) {
    return this.web3.utils.fromWei(value, 'ether');
  }

  async getPrice(): Promise<Numbers> {
    return this.contract.methods.price().call();
  }

  async doSubscription() {
    const value = await this.getPrice();
    const tx = {
      from: this.web3ModalService.getAddress(),
      gas: 3000000,
      value,
    };
    return this.contract.methods.subscribe().send(tx);
  }

  async getEtherSubscriptionPrice() {
    const price = await this.getPrice();
    return this.getEtherConversion(price);
  }

  private initWeb3(web3ModalService: Web3ModalService) {
    const provider = web3ModalService.getWalletProvider();
    this.web3 = new Web3(provider);
  }

  private initContract() {
    this.contract = new this.web3.eth.Contract(environment.ABI, environment.CONTRACT_ADDRESS);
  }
}
