import { commonEnvironment } from './environment.common';

const ethereum = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const chains = [
  ethereum,
]

export const environment = {
  ...commonEnvironment,
  chains,
  projectId: import.meta.env.NG_APP_PROJECT_ID
};