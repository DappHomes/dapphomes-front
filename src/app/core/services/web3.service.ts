import { Injectable } from '@angular/core';
import Web3, { Address, Numbers } from 'web3';
import { Web3ModalService } from '@services/web3modal.service';
import { isAddress as isValidAddress } from 'web3-validator';

@Injectable({ providedIn: 'root' })
export class Web3Service {
  private contract!: any;

  constructor(private web3ModalService: Web3ModalService) {
    this.initWeb3();
  }

  isAddress(address: string): boolean {
    return isValidAddress(address);
  }

  getMethods(abi: any, address: Address) {
    return this.initContract(abi, address).methods;
  }

  getEtherConversion(value: Numbers) {
    return this.contract.utils.fromWei(value, 'ether');
  }

  getWeiConversion(value: Numbers) {
    return this.contract.utils.toWei(value, 'ether');
  }

  async getSigner() {
    const accounts = await this.contract.eth.getAccounts();
    return accounts[0];
  }

  private initWeb3() {
    const provider = this.web3ModalService.getWalletProvider();
    this.contract = new Web3(provider);
  }

  private initContract(abi = [], address: Address) {
    return new this.contract.eth.Contract(abi, address);
  }
}
