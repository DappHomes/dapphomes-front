import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  ThresholdMessageKit,
  decrypt,
  domains,
  getPorterUri,
  fromBytes,
} from '@nucypher/taco';
import { ethers } from 'ethers';
import { Web3ModalService } from './web3modal.service';

@Injectable({ providedIn: 'root' })
export class PinataService {
  constructor(private web3ModalService: Web3ModalService) {}

  async decryptMessage(token: string) {
    const lastPinnedFiles = await this.getLastPinnedFiles(token);
    const response = await lastPinnedFiles.json();
    console.log(response);
    return this.decryptFromBytes(Buffer.from(response.cypher, 'hex'));
  }

  private async getLastPinnedFiles(token: string) {
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    };
    const result = await fetch(environment.PINATA_PIN_LIST_URL, options);
    const data = await result.json();
    console.log(data);
    const { ipfs_pin_hash } = data.rows[0];
    return fetch(`${environment.IPFS_BASE_URL}${ipfs_pin_hash}`);
  }

  private async decryptFromBytes(encryptedBytes: Uint8Array) {
    const browserProvider = new ethers.providers.Web3Provider(
      (window as any).ethereum,
      'any'
    );

    const selectedChainId = this.web3ModalService.getChainId();
    const { chainId: amoyChanId } = this.getAmoyChain();
    if (selectedChainId !== amoyChanId) {
      console.log('Not in Amoy network. Lets change...');
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13882' }],
      });
    }
    await browserProvider.send('eth_requestAccounts', []);

    const messageKit = ThresholdMessageKit.fromBytes(encryptedBytes);

    const decryptedBytes = await decrypt(
      browserProvider,
      domains.TESTNET,
      messageKit,
      getPorterUri(domains.TESTNET),
      browserProvider.getSigner()
    );

    console.log(`+ decrypted bytes ${fromBytes(decryptedBytes)}`)

    return fromBytes(decryptedBytes);
  }

  private getAmoyChain() {
    return environment.web3ModalConfig.chains[0];
  }
}
