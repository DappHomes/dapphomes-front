import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Web3Modal, createWeb3Modal } from '@web3modal/ethers5';

@Injectable({providedIn: 'root'})
export class Web3ModalService {
  web3Modal: Web3Modal;

  constructor() {
    this.web3Modal = createWeb3Modal(environment.web3ModalConfig);
  }
}