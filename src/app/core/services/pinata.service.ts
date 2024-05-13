import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ThresholdMessageKit, decrypt, domains } from '@nucypher/taco';
import { ethers } from 'ethers';

@Injectable({ providedIn: 'root' })
export class PinataService {
  async getData() {
    const options = { method: 'GET', headers: { Authorization: `Bearer ${environment.PINATA_PIN_LIST_TOKEN}` } };
    const result = await fetch(environment.PINATA_PIN_LIST_URL, options);
    const data = await result.json();
    const lastPinnedFile = data.rows[0].ipfs_pin_hash;
    const pifsResult = await fetch(environment.IPFS_BASE_URL + lastPinnedFile);
    const resp = Buffer.from(await pifsResult.arrayBuffer());
    this.decryptFromBytes(resp).then((response) => console.log('Decrypted response:', response));
  }

  private async decryptFromBytes(encryptedBytes: Uint8Array) {
    const web3Provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const messageKit = ThresholdMessageKit.fromBytes(encryptedBytes);

    return decrypt(
      web3Provider,
      domains.TESTNET,
      messageKit,
    );
  }
}
