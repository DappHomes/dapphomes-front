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

@Injectable({ providedIn: 'root' })
export class PinataService {
  async decryptMessage(token: string) {
    const lastPinnedFiles = await this.getLastPinnedFiles(token);
    const response = Buffer.from(await lastPinnedFiles.arrayBuffer());
    return this.decryptFromBytes(response);
  }

  private async getLastPinnedFiles(token: string) {
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    };
    const result = await fetch(environment.PINATA_PIN_LIST_URL, options);
    const data = await result.json();
    const { ipfs_pin_hash } = data.rows[0];
    return await fetch(`${environment.IPFS_BASE_URL}${ipfs_pin_hash}`);
  }

  private async decryptFromBytes(encryptedBytes: Uint8Array) {
    const browserProvider = new ethers.providers.Web3Provider(
      (window as any).ethereum,
      'any'
    );

    const network = await browserProvider.getNetwork();
    if (network.chainId !== 80002) {
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

    return fromBytes(decryptedBytes);
  }
}
