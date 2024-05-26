import { ethers } from 'ethers';

export const decodeUint8Array = (message: Uint8Array) =>
  new TextDecoder().decode(message);
export const getWeb3Provider = () =>
  new ethers.providers.Web3Provider((window as any).ethereum);

export interface Marketplace {
  price: string;
  duration: string;
  token: string;
}
