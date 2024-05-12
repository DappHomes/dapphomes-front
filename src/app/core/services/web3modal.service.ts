import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Web3Modal, createWeb3Modal } from '@web3modal/ethers5';

@Injectable({providedIn: 'root'})
export class Web3ModalService {
  private web3Modal: Web3Modal;
  
  constructor() {
    this.web3Modal = createWeb3Modal(environment.web3ModalConfig);
  }

  getWalletProvider() {
    return this.web3Modal.getWalletProvider();
  }

  getAddress() {
    return this.web3Modal.getAddress();
  }

  subscribeState(callback: (state: any) => void) {
    return this.web3Modal.subscribeState(callback);
  }

  getState() {
    return this.web3Modal.getState();
  }
}