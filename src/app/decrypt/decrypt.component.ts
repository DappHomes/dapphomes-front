import { Component, Input, OnInit } from '@angular/core';
import { decrypt, domains, getPorterUri, ThresholdMessageKit } from '@nucypher/taco';
import { decodeUint8Array, getWeb3Provider } from '../utils/utils';

@Component({
  selector: 'decrypt',
  templateUrl: 'decrypt.component.html'
})

export class DecryptComponent implements OnInit {
  @Input() messageKit!: ThresholdMessageKit;

  decryptedMessage!: string;

  constructor() { }

  ngOnInit() {
    this.decrypt().then(decryptedMessage => this.decryptedMessage = decryptedMessage);
  }

  private async decrypt() {
    const web3Provider = getWeb3Provider();
    const signer = await web3Provider.getSigner()

    const decryptedMessage = await decrypt(
      web3Provider,
      domains.TESTNET,
      this.messageKit,
      getPorterUri(domains.TESTNET),
      signer
    );

    return decodeUint8Array(decryptedMessage);
  }
}