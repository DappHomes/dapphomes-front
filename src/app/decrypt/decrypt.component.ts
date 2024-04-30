import { Component, Input, OnInit } from '@angular/core';
import { initialize, decrypt, domains, getPorterUri, ThresholdMessageKit } from '@nucypher/taco';
import { ethers } from "ethers";

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
    const web3Provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = await web3Provider.getSigner()

    const decryptedMessage = await decrypt(
      web3Provider,
      domains.TESTNET,
      this.messageKit,
      getPorterUri(domains.TESTNET),
      signer
    );

    return new TextDecoder().decode(decryptedMessage);
  }
}