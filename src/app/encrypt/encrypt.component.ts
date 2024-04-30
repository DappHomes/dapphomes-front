import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { initialize, encrypt, conditions, domains, ThresholdMessageKit } from '@nucypher/taco';
import { getWeb3Provider } from '../utils/utils';

@Component({
  selector: 'encrypt',
  templateUrl: 'encrypt.component.html'
})

export class EncryptComponent implements OnInit {
  @Output() messageKit = new EventEmitter<ThresholdMessageKit>;
  
  constructor() { }

  ngOnInit() {
    this.encrypt().then(messageKit => this.messageKit.emit(messageKit));
  }

  private async encrypt() {
    await initialize();
    
    const web3Provider = getWeb3Provider();
    const signer = await web3Provider.getSigner();

    const ownsETH = new conditions.base.rpc.RpcCondition({
      method: 'eth_getBalance',
      parameters: ['0xE690b6bCC0616Dc5294fF84ff4e00335cA52C388'],
      chain: 80002,
      returnValueTest: {
        comparator: '==',
        value: 0,
      },
    });

    const message = "My secret message from Angular";

    const messageKit = await encrypt(
      web3Provider,
      domains.TESTNET,
      message,
      ownsETH,
      0,
      signer
    );

    return messageKit;
  }
}